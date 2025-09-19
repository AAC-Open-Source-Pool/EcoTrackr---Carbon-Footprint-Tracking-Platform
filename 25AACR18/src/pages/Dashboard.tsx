
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

const Dashboard = () => {
  const todayStats = {
    pointsEarned: 45,
    actionsTaken: 7,
    goalStreak: 12
  };

  const weeklyData = [
    { day: 'Mon', emissions: 8.2 },
    { day: 'Tue', emissions: 6.5 },
    { day: 'Wed', emissions: 7.1 },
    { day: 'Thu', emissions: 5.8 },
    { day: 'Fri', emissions: 4.9 },
    { day: 'Sat', emissions: 3.2 },
    { day: 'Sun', emissions: 2.8 }
  ];

  const challenges = [
    { title: "Use Public Transport", progress: 75, target: "5 days this week" },
    { title: "Reduce Food Waste", progress: 60, target: "3 meals saved" },
    { title: "Energy Conservation", progress: 90, target: "20% reduction" }
  ];

  const maxEmissions = Math.max(...weeklyData.map(d => d.emissions));

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
              <div className="text-2xl font-bold text-green-900">{todayStats.pointsEarned}</div>
              <p className="text-xs text-green-700 mt-1">+12 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Actions Taken</CardTitle>
              <Leaf className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{todayStats.actionsTaken}</div>
              <p className="text-xs text-blue-700 mt-1">Recycling, carpooling, etc.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Goal Streak</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{todayStats.goalStreak} days</div>
              <p className="text-xs text-purple-700 mt-1">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Carbon Emissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <span>Weekly Carbon Emissions</span>
              </CardTitle>
              <CardDescription>Your daily CO₂ footprint in kg</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300"
                        style={{ width: `${(day.emissions / maxEmissions) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium text-gray-900">{day.emissions}kg</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Great progress! You've reduced emissions by 65% this week.
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
