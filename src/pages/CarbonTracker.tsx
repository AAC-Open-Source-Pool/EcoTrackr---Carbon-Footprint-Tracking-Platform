import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Lightbulb, Car, Utensils, BarChart3 } from "lucide-react";
import { getCooldownRemainingMs, getWeeklyData, saveTodayEmissions, getPoints, getEntries } from "@/lib/carbon";

// Function to generate empty weekly data with all values set to 0
const getEmptyWeeklyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => ({
    date: day,
    label: day,
    value: 0
  }));
};

// Function to get day name from date
const getDayName = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const CarbonTracker = () => {
  const [formData, setFormData] = useState({
    commuteType: '',
    commuteDistance: '',
    electricityUsage: '',
    dietType: ''
  });
  
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [breakdown, setBreakdown] = useState({
    commute: 0,
    electricity: 0,
    diet: 0
  });

  // Daily save + weekly chart state
  const [cooldownMs, setCooldownMs] = useState<number>(0);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [points, setPoints] = useState<number>(getPoints());
  const [awardMessage, setAwardMessage] = useState<string>("");
  const [awardPositive, setAwardPositive] = useState<boolean | null>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [lastEmissionDate, setLastEmissionDate] = useState<string | null>(null);
  const [emissionHistory, setEmissionHistory] = useState<any[]>([]);

  const commuteFactors = {
    car: 0.21, // kg CO2 per km
    bus: 0.08,
    train: 0.06,
    motorbike: 0.10,
    bike: 0,
    walk: 0
  };

  const timeString = useMemo(() => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }), [now]);
  const dateString = useMemo(() => now.toLocaleDateString([], { weekday: "short", year: "numeric", month: "short", day: "2-digit" }), [now]);

  const dietFactors = {
    meat: 2.5, // kg CO2 per day
    vegetarian: 1.7,
    vegan: 1.5
  };

  const calculateEmissions = () => {
    const commuteEmissions = (commuteFactors[formData.commuteType as keyof typeof commuteFactors] || 0) * 
                            (parseFloat(formData.commuteDistance) || 0) * 2; // round trip
    
    const electricityEmissions = (parseFloat(formData.electricityUsage) || 0) * 0.5; // kg CO2 per kWh
    
    const dietEmissions = dietFactors[formData.dietType as keyof typeof dietFactors] || 0;

    const newBreakdown = {
      commute: commuteEmissions,
      electricity: electricityEmissions,
      diet: dietEmissions
    };

    setBreakdown(newBreakdown);
    setTotalEmissions(commuteEmissions + electricityEmissions + dietEmissions);
  };

  const tips = {
    commute: [
      "Use public transport to reduce emissions by up to 75%",
      "Try cycling or walking for short distances",
      "Consider carpooling with colleagues"
    ],
    electricity: [
      "Switch to LED bulbs to save 80% energy",
      "Unplug electronics when not in use",
      "Use natural light during the day"
    ],
    diet: [
      "Try Meatless Mondays to reduce diet emissions",
      "Choose local and seasonal produce",
      "Reduce food waste by meal planning"
    ]
  };

  const maxEmission = Math.max(1, breakdown.commute, breakdown.electricity, breakdown.diet); // Ensure at least 1 to prevent division by zero

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await getEntries();
        if (entries && entries.length > 0) {
          setEmissionHistory(entries);
          setLastEmissionDate(entries[entries.length - 1].date);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Initialize weekly data
  useEffect(() => {
    const loadWeeklyData = async () => {
      let weeklyData = await getWeeklyData();
      const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

      const hasBackendValues = Array.isArray(weeklyData) && weeklyData.some(d => typeof d.value === 'number' && d.value > 0);
      if (!hasBackendValues) {
        // fallback to local entries
        try {
          const entries = await getEntries();
          if (entries && entries.length > 0) {
            // build week Monday..Sunday
            const now = new Date();
            const dayOfWeek = now.getDay();
            const monday = new Date(now);
            monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
            monday.setHours(0,0,0,0);

            const weekData: any[] = [];
            for (let i = 0; i < 7; i++) {
              const d = new Date(monday);
              d.setDate(monday.getDate() + i);
              const dateStr = d.toISOString().slice(0,10);
              const entry = entries.find(e => e.date === dateStr);
              weekData.push({ label: labels[i], date: dateStr, value: entry ? entry.value : 0 });
            }
            weeklyData = weekData;
          }
        } catch (err) {
          console.error('Error building weekly data from entries:', err);
        }
      }

      setWeekly(weeklyData);
    };
    loadWeeklyData();
  }, []);

  // Live clock
  useEffect(() => {
    const tid = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tid);
  }, []);

  const formatMs = (ms: number) => {
    if (ms <= 0) return "";
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const handleSaveToday = async () => {
    setAwardMessage("");
    setAwardPositive(null);
    const res = await saveTodayEmissions(totalEmissions);
    if (!res.saved) {
      if (res.reason === "cooldown") {
        setCooldownMs(res.remainingMs || 0);
      }
      return;
    }
    // Refresh UI state
    setCooldownMs(getCooldownRemainingMs(Date.now()));
    // Try backend weekly first, fallback to local entries if backend returns zeros
    let weeklyData = await getWeeklyData();
    const hasValues = Array.isArray(weeklyData) && weeklyData.some(d => typeof d.value === 'number' && d.value > 0);
    if (!hasValues) {
      // build from local entries
      try {
        const entries = await getEntries();
        if (entries && entries.length > 0) {
          const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
          const now = new Date();
          const dayOfWeek = now.getDay();
          const monday = new Date(now);
          monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
          monday.setHours(0,0,0,0);
          const weekData: any[] = [];
          for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const dateStr = d.toISOString().slice(0,10);
            const entry = entries.find(e => e.date === dateStr);
            weekData.push({ label: labels[i], date: dateStr, value: entry ? entry.value : 0 });
          }
          weeklyData = weekData;
        }
      } catch (err) {
        console.error('Error building weekly data from entries after save:', err);
      }
    }
    setWeekly(weeklyData);
    const newPoints = getPoints();
    setPoints(newPoints);
    if (typeof res.pointsAwarded === "number" && res.comparison) {
      if (res.comparison === "improved") {
        setAwardPositive(true);
        setAwardMessage(`Great job! Emissions decreased vs yesterday. +${res.pointsAwarded} points awarded.`);
      } else if (res.comparison === "worsened") {
        setAwardPositive(false);
        setAwardMessage(`Emissions increased vs yesterday. ${res.pointsAwarded} points deducted.`);
      } else if (res.comparison === "same") {
        setAwardPositive(false);
        setAwardMessage(`Emissions unchanged vs yesterday. ${res.pointsAwarded} points deducted.`);
      } else {
        setAwardPositive(null);
        setAwardMessage("Saved today's emissions.");
      }
    } else {
      setAwardPositive(null);
      setAwardMessage("Saved today's emissions.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carbon Tracker</h1>
              <p className="text-gray-600">Calculate and monitor your daily carbon footprint</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{dateString}</div>
            <div className="text-lg font-semibold tracking-wider text-emerald-700">{timeString}</div>
            {cooldownMs > 0 && (
              <div className="text-xs text-gray-500">Next save in {formatMs(cooldownMs)}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Carbon Calculator</CardTitle>
              <CardDescription>Input your daily activities to calculate emissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Commute Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <Label className="text-base font-medium">Commute</Label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="commuteType">Transport Type</Label>
                    <Select value={formData.commuteType} onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, commuteType: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transport" />
                      </SelectTrigger>
                      <SelectContent inPortal={false} position="item-aligned" side="bottom" align="start" sideOffset={4} className="z-50">
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                        <SelectItem value="motorbike">Motorbike</SelectItem>
                        <SelectItem value="bike">Bicycle</SelectItem>
                        <SelectItem value="walk">Walking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="commuteDistance">Distance (km)</Label>
                    <Input
                      id="commuteDistance"
                      type="number"
                      placeholder="e.g. 15"
                      value={formData.commuteDistance}
                      onChange={(e) => setFormData(prev => ({ ...prev, commuteDistance: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Electricity Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <Label className="text-base font-medium">Electricity Usage</Label>
                </div>
                <div>
                  <Label htmlFor="electricityUsage">Daily Usage (kWh)</Label>
                  <Input
                    id="electricityUsage"
                    type="number"
                    placeholder="e.g. 25"
                    value={formData.electricityUsage}
                    onChange={(e) => setFormData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                  />
                </div>
              </div>

              {/* Diet Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-green-600" />
                  <Label className="text-base font-medium">Diet Type</Label>
                </div>
                <Select value={formData.dietType} onValueChange={(value) =>
                  setFormData(prev => ({ ...prev, dietType: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent inPortal={false} position="item-aligned" side="bottom" align="start" sideOffset={4} className="z-50">
                    <SelectItem value="meat">Meat-based</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button onClick={calculateEmissions} className="w-full bg-green-600 hover:bg-green-700">
                  Calculate Emissions
                </Button>
                <Button
                  onClick={handleSaveToday}
                  disabled={totalEmissions <= 0 || cooldownMs > 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cooldownMs > 0 ? `Save available in ${formatMs(cooldownMs)}` : "Save today's emissions"}
                </Button>
              </div>
              {awardMessage && (
                <div
                  className={`text-sm rounded-md p-2 border ${
                    awardPositive === true
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : awardPositive === false
                      ? "text-red-700 bg-red-50 border-red-200"
                      : "text-slate-700 bg-slate-50 border-slate-200"
                  }`}
                >
                  {awardMessage} Current points: <span className="font-semibold">{points}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Emission Results</span>
              </CardTitle>
              <CardDescription>Your daily carbon footprint breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Total Emissions */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg">
                <div className="text-3xl font-bold text-green-900">{totalEmissions.toFixed(2)} kg</div>
                <p className="text-green-700 mt-1">Total CO₂ emissions today</p>
                {totalEmissions > 0 && (
                  <Badge className={`mt-2 ${totalEmissions < 10 ? 'bg-green-100 text-green-800' :
                                   totalEmissions < 20 ? 'bg-yellow-100 text-yellow-800' :
                                   'bg-red-100 text-red-800'}`}>
                    {totalEmissions < 10 ? 'Excellent' : totalEmissions < 20 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                )}
              </div>

              {/* Breakdown Chart */}
              {totalEmissions > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Breakdown by Category</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Commute</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: maxEmission > 0 ? `${(breakdown.commute / maxEmission) * 100}%` : '0%' }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{breakdown.commute.toFixed(1)}kg</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Electricity</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                            style={{ width: maxEmission > 0 ? `${(breakdown.electricity / maxEmission) * 100}%` : '0%' }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{breakdown.electricity.toFixed(1)}kg</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Diet</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all duration-300"
                            style={{ width: maxEmission > 0 ? `${(breakdown.diet / maxEmission) * 100}%` : '0%' }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{breakdown.diet.toFixed(1)}kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Emissions (Mon-Sun) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Weekly Emissions</span>
            </CardTitle>
            <CardDescription>Saved daily totals for the current week (Mon–Sun)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weekly.map(d => (
                <div key={d.date} className="flex items-center space-x-3">
                  <div className="w-10 text-sm text-gray-600">{d.label}</div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (d.value / Math.max(1, Math.max(...weekly.map(w => w.value)))) * 100)}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-medium">{d.value.toFixed(1)}kg</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-700">
              Current points: <span className="font-semibold text-emerald-700">{points}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <Car className="h-5 w-5" />
                <span>Commute Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.commute.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-700">
                <Lightbulb className="h-5 w-5" />
                <span>Energy Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.electricity.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <Utensils className="h-5 w-5" />
                <span>Diet Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.diet.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CarbonTracker;
