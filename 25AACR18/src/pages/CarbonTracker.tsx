
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Lightbulb, Car, Utensils, BarChart3 } from "lucide-react";

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

  const commuteFactors = {
    car: 0.21, // kg CO2 per km
    bus: 0.08,
    train: 0.06,
    bike: 0,
    walk: 0
  };

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

  const maxEmission = Math.max(breakdown.commute, breakdown.electricity, breakdown.diet);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Carbon Tracker</h1>
            <p className="text-gray-600">Calculate and monitor your daily carbon footprint</p>
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
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
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
                  <SelectContent>
                    <SelectItem value="meat">Meat-based</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateEmissions} className="w-full bg-green-600 hover:bg-green-700">
                Calculate Emissions
              </Button>
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
