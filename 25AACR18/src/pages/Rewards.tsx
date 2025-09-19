
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Award, Gift, ShoppingBag, Coffee, Leaf, Star, QrCode } from "lucide-react";

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(1247);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const rewards = [
    {
      id: 1,
      title: "Eco-Friendly Water Bottle",
      description: "Stainless steel water bottle made from recycled materials",
      points: 250,
      category: "lifestyle",
      image: "🧴",
      stock: 15,
      brand: "EcoLife"
    },
    {
      id: 2,
      title: "Organic Cotton Tote Bag",
      description: "Reusable shopping bag made from 100% organic cotton",
      points: 150,
      category: "lifestyle",
      image: "👜",
      stock: 23,
      brand: "GreenBag Co."
    },
    {
      id: 3,
      title: "Solar Phone Charger",
      description: "Portable solar-powered charger for your devices",
      points: 500,
      category: "tech",
      image: "🔋",
      stock: 8,
      brand: "SolarTech"
    },
    {
      id: 4,
      title: "Bamboo Toothbrush Set",
      description: "Set of 4 biodegradable bamboo toothbrushes",
      points: 100,
      category: "health",
      image: "🪥",
      stock: 30,
      brand: "BambooCare"
    },
    {
      id: 5,
      title: "Plant-Based Cookbook",
      description: "100 delicious recipes for sustainable living",
      points: 200,
      category: "lifestyle",
      image: "📚",
      stock: 12,
      brand: "Green Kitchen"
    },
    {
      id: 6,
      title: "Coffee Shop Voucher",
      description: "$10 voucher for partner eco-friendly coffee shops",
      points: 300,
      category: "food",
      image: "☕",
      stock: 50,
      brand: "EcoCafe Network"
    }
  ];

  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      setSelectedReward(reward);
    }
  };

  const categories = [
    { name: "All", icon: Gift },
    { name: "lifestyle", icon: ShoppingBag },
    { name: "tech", icon: Award },
    { name: "health", icon: Leaf },
    { name: "food", icon: Coffee }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRewards = selectedCategory === "All" 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rewards</h1>
              <p className="text-gray-600">Redeem your eco-points for sustainable products</p>
            </div>
          </div>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userPoints}</div>
              <div className="text-sm text-gray-600">Available Points</div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-2 whitespace-nowrap ${
                selectedCategory === category.name 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "hover:bg-green-50 hover:border-green-300"
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="capitalize">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{reward.image}</div>
                  <Badge variant="outline" className="ml-2">
                    {reward.stock} left
                  </Badge>
                </div>
                <CardTitle className="text-lg">{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">By {reward.brand}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{reward.points} points</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className={`w-full ${
                        userPoints >= reward.points 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={userPoints < reward.points}
                    >
                      {userPoints >= reward.points ? "Redeem Now" : "Insufficient Points"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Redeem Reward</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to redeem {reward.title} for {reward.points} points?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                      <div className="text-6xl">{reward.image}</div>
                      <div className="text-center">
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                      </div>
                      <Button 
                        onClick={() => handleRedeem(reward)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Confirm Redemption
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Redemptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Redemptions</CardTitle>
            <CardDescription>Your latest reward redemptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🧴</div>
                  <div>
                    <p className="font-medium">Eco-Friendly Water Bottle</p>
                    <p className="text-sm text-gray-600">Redeemed 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Ready for pickup</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">☕</div>
                  <div>
                    <p className="font-medium">Coffee Shop Voucher</p>
                    <p className="text-sm text-gray-600">Used 1 week ago</p>
                  </div>
                </div>
                <Badge variant="outline">Used</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Dialog */}
        {selectedReward && (
          <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-green-600" />
                  <span>Redemption Successful!</span>
                </DialogTitle>
                <DialogDescription>
                  Your reward has been redeemed successfully.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-4">
                <div className="text-6xl">{selectedReward.image}</div>
                <div className="text-center">
                  <h3 className="font-semibold">{selectedReward.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">Show this QR code at pickup location</p>
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-600" />
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600">
                  Pickup location details will be sent to your email.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Rewards;
