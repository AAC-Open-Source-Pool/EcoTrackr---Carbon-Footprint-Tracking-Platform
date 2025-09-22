import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Award, 
  TrendingDown, 
  Target, 
  Plus, 
  BookOpen, 
  Calendar,
  BarChart3,
  MapPin
} from "lucide-react";
import { getWeeklyData, getPoints, POINTS_EVENT, getEntries, scopedKey } from "@/lib/carbon";

const Dashboard = () => {
  // Dynamic dashboard stats
  const [pointsToday, setPointsToday] = useState(0);
  const [actionsTaken, setActionsTaken] = useState(0);
  const [goalStreak, setGoalStreak] = useState(0);

  const [weekly, setWeekly] = useState(getWeeklyData());

  const DAY_BASE_KEY = scopedKey("dashboard:points:baseline");

  const startOfDay = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const toISO = (d: Date) => d.toISOString().slice(0,10);

  const ensureBaseline = () => {
    const todayISO = toISO(startOfDay());
    const key = `${DAY_BASE_KEY}:${todayISO}`;
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, String(getPoints()));
    }
    // Cleanup only this user's old baselines
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(`${DAY_BASE_KEY}:`) && !k.endsWith(todayISO)) {
        try { localStorage.removeItem(k); } catch {}
      }
    });
  };

  const getBaseline = () => {
    const key = `${DAY_BASE_KEY}:${toISO(startOfDay())}`;
    const v = parseInt(localStorage.getItem(key) || "0", 10) || 0;
    return v;
  };

  const getQuizCompletedMap = (): Record<string, { score: number; completedAt: number }> => {
    try {
      const raw = localStorage.getItem("quiz:completed");
      const parsed: Record<string, any> = raw ? JSON.parse(raw) : {};
      const normalized: Record<string, { score: number; completedAt: number }> = {};
      Object.keys(parsed || {}).forEach((k) => {
        const v = parsed[k] || {};
        const score = typeof v.score === 'number' ? v.score : 0;
        const ts = typeof v.completedAt === 'number' ? v.completedAt : Date.now();
        if (Number.isFinite(ts) && ts > 0) {
          normalized[k] = { score, completedAt: ts };
        }
      });
      return normalized;
    } catch {
      return {};
    }
  };

  const isSameDay = (a: Date, b: Date) => Number.isFinite(a.getTime()) && a.toDateString() === b.toDateString();

  const computeActionsToday = () => {
    const today = startOfDay();
    // Carbon entry today
    const entries = getEntries();
    const hasCarbonToday = entries.some(e => e.date === toISO(today));
    // Quiz completions today
    const qmap = getQuizCompletedMap();
    const quizToday = Object.values(qmap).filter(r => {
      const d = new Date(r.completedAt);
      return isSameDay(d, today);
    }).length;
    return (hasCarbonToday ? 1 : 0) + quizToday;
  };

  const computeStreak = () => {
    // streak counts consecutive days with any action (carbon entry or quiz completion)
    const entries = getEntries();
    const qmap = getQuizCompletedMap();
    const actionDates = new Set<string>();
    entries.forEach(e => actionDates.add(e.date));
    Object.values(qmap).forEach(r => {
      const d = new Date(r.completedAt);
      if (Number.isFinite(d.getTime())) actionDates.add(toISO(d));
    });
    // Walk back from today
    let streak = 0;
    const d = startOfDay();
    while (true) {
      const iso = toISO(d);
      if (actionDates.has(iso)) {
        streak += 1;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const refreshStats = () => {
    ensureBaseline();
    const baseline = getBaseline();
    const current = getPoints();
    setPointsToday(Math.max(0, current - baseline));
    setActionsTaken(computeActionsToday());
    setGoalStreak(computeStreak());
    setWeekly(getWeeklyData());
  };
  useEffect(() => {
    refreshStats();
    // Listen for points updates and storage changes
    const onPoints = () => refreshStats();
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return refreshStats();
      if (e.key.startsWith("carbon:") || e.key.startsWith("quiz:")) refreshStats();
    };
    window.addEventListener(POINTS_EVENT, onPoints as EventListener);
    window.addEventListener('storage', onStorage);
    const id = setInterval(refreshStats, 60_000); // periodic refresh
    return () => {
      window.removeEventListener(POINTS_EVENT, onPoints as EventListener);
      window.removeEventListener('storage', onStorage);
      clearInterval(id);
    };
  }, []);

  const challenges = [
    { title: "Use Public Transport", progress: 75, target: "5 days this week" },
    { title: "Reduce Food Waste", progress: 60, target: "3 meals saved" },
    { title: "Energy Conservation", progress: 90, target: "20% reduction" }
  ];

  const maxEmissions = Math.max(...weekly.map(d => d.value), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Today's Eco Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Points Earned Today</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{pointsToday}</div>
              <p className="text-xs text-green-700 mt-1">Auto-updates from quizzes and carbon tracker</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Actions Taken</CardTitle>
              <Leaf className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{actionsTaken}</div>
              <p className="text-xs text-blue-700 mt-1">Quizzes completed + Carbon entry saved today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Goal Streak</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{goalStreak} days</div>
              <p className="text-xs text-purple-700 mt-1">Consecutive days with any action</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Carbon Emissions (from Carbon Tracker data) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <span>Weekly Carbon Emissions</span>
              </CardTitle>
              <CardDescription>Your daily CO₂ footprint (Mon–Sun) from saved Carbon Tracker entries</CardDescription>
            </CardHeader>
            <CardContent>
              {maxEmissions === 0 ? (
                <div className="text-sm text-gray-600">No weekly data yet. Save today’s emissions in Carbon Tracker to see this chart.</div>
              ) : (
                <div className="space-y-3">
                  {weekly.map((d) => (
                    <div key={d.date} className="flex items-center space-x-4">
                      <div className="w-8 text-sm font-medium text-gray-600">{d.label}</div>
                      <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${(d.value / maxEmissions) * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm font-medium text-gray-900">{d.value.toFixed(1)}kg</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Tip: Save your emissions daily in Carbon Tracker to keep this chart up to date.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Eco Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Active Challenges</span>
              </CardTitle>
              <CardDescription>Track your progress on current goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">{challenge.title}</h4>
                    <Badge variant="outline">{challenge.progress}%</Badge>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                  <p className="text-xs text-gray-600">{challenge.target}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to your most-used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
              <Link to="/rewards">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300">
                  <Award className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Redeem Points</span>
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Join Events</span>
                </Button>
              </Link>
              <Link to="/learn-quiz">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 hover:bg-orange-50 hover:border-orange-300">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                  <span className="text-sm">Learn Tips</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
