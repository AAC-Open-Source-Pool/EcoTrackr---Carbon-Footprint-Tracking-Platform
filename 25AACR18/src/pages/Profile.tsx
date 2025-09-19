import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { User, Award, BarChart3 } from "lucide-react";
import { authFetch } from "@/lib/auth";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    joinDate: "",
  });

  const [formData, setFormData] = useState({ ...profileData });

  const [ecoGoals, setEcoGoals] = useState<any[]>([]);
  const avatarChoices = [
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Leaf",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=River",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Sun",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Forest",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Bamboo",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Ocean",
  ];
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<{ title: string; target?: string; progress?: number; deadline?: string }>({ title: "" });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authFetch("http://localhost:5000/api/profile");
        const data = await res.json();
        setProfileData(data);
        setFormData(data);
        setEcoGoals(data.ecoGoals || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Save profile to backend
  const handleUpdateProfile = async () => {
    try {
      const res = await authFetch(
        "http://localhost:5000/api/profile",
        {
          method: "PUT",
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            location: formData.location,
            bio: formData.bio,
            profilePicture: (formData as any).profilePicture,
          }),
        }
      );
      const data = await res.json();
      setProfileData(data);
      setFormData(data);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
        className: "bg-green-50 border-green-200",
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({
        title: "Update Failed",
        description: "Something went wrong while saving.",
        variant: "destructive",
      });
    }
  };

  const handleAddGoal = async () => {
    try {
      if (!newGoal.title) return;
      const res = await authFetch("http://localhost:5000/api/profile/goals", {
        method: "POST",
        body: JSON.stringify(newGoal),
      });
      const updatedGoals = await res.json();
      setEcoGoals(updatedGoals);
      setNewGoal({ title: "" });
      setShowAddGoal(false);
      toast({
        title: "New Goal Added",
        description: "Your goal was created successfully.",
        className: "bg-green-50 border-green-200",
      });
    } catch (err) {
      console.error("Error adding goal:", err);
      toast({
        title: "Failed to add goal",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="space-y-8 px-4 lg:px-8 py-6">
        {/* HEADER */}
        <div className="flex items-center space-x-3">
          <User className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full rounded-lg bg-gray-100 p-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="history">Activity History</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-6">
            {/* TOP GRID: USER INFO + STATS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* USER INFO */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-4 overflow-hidden">
                    {profileData.profilePicture ? (
                      <img src={profileData.profilePicture} alt="avatar" className="h-24 w-24 object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-green-600" />
                    )}
                  </div>
                  <CardTitle className="text-center">{profileData.username || ""}</CardTitle>
                  <CardDescription className="text-center">{profileData.location || ""}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{profileData.bio || ""}</p>
                  </div>
                </CardContent>
              </Card>

              {/* STATS */}
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>Your Eco Impact</span>
                  </CardTitle>
                  <CardDescription>Summary of your environmental contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(() => {
                    const stats = (profileData as any).stats || {};
                    const totalPoints = stats.totalPoints || 0;
                    const actionCount = stats.actionCount || 0;
                    const eventsAttended = stats.eventsAttended || 0;
                    const quizzesCompleted = stats.quizzesCompleted || 0;
                    const treesSaved = (profileData as any).treesSaved || 0;
                    const co2Reduced = (profileData as any).co2Reduced || 0;
                    return (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-700">{totalPoints}</div>
                          <div className="text-sm text-green-800">Total Points</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-700">{actionCount}</div>
                          <div className="text-sm text-blue-800">Eco Actions</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-700">{eventsAttended}</div>
                          <div className="text-sm text-purple-800">Events Attended</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-yellow-700">{quizzesCompleted}</div>
                          <div className="text-sm text-yellow-800">Quizzes Completed</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-emerald-700">{treesSaved}</div>
                          <div className="text-sm text-emerald-800">Trees Saved</div>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-cyan-700">{co2Reduced}kg</div>
                          <div className="text-sm text-cyan-800">CO₂ Reduced</div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            {/* ECO GOALS (TASKS) */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span>Your Eco Goals</span>
                </CardTitle>
                <CardDescription>Track your progress toward sustainability targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {ecoGoals.length === 0 ? (
                  <p className="text-sm text-gray-600">No goals yet. Add your first one below.</p>
                ) : (
                  ecoGoals.map((goal: any) => (
                    <div key={goal._id || goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          {goal.target && <p className="text-sm text-gray-600">Target: {goal.target}</p>}
                        </div>
                        <span className="text-xs px-2 py-1 rounded border">{goal.deadline || "-"}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 bg-gray-200 rounded w-full overflow-hidden">
                          <div className="h-2 bg-green-600" style={{ width: `${goal.progress || 0}%` }} />
                        </div>
                        <span className="text-sm font-medium w-12">{goal.progress || 0}%</span>
                      </div>
                    </div>
                  ))
                )}

                {!showAddGoal ? (
                  <Button variant="outline" className="w-full border-dashed" onClick={() => setShowAddGoal(true)}>
                    + Add New Goal
                  </Button>
                ) : (
                  <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Title</Label>
                        <Input value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} placeholder="e.g. Reduce Plastic Usage" />
                      </div>
                      <div>
                        <Label>Target</Label>
                        <Input value={newGoal.target || ""} onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })} placeholder="e.g. Avoid single-use plastic" />
                      </div>
                      <div>
                        <Label>Progress (%)</Label>
                        <Input type="number" value={newGoal.progress || 0} onChange={(e) => setNewGoal({ ...newGoal, progress: Number(e.target.value) })} />
                      </div>
                      <div>
                        <Label>Deadline</Label>
                        <Input type="text" value={newGoal.deadline || ""} onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })} placeholder="Month date, year" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddGoal(false)}>Cancel</Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddGoal}>Save Goal</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* EDIT PROFILE */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar Picker */}
                <div className="space-y-2">
                  <Label>Profile Icon</Label>
                  <div className="flex flex-wrap gap-3">
                    {avatarChoices.map((src) => (
                      <button
                        key={src}
                        type="button"
                        className={`h-14 w-14 rounded-full overflow-hidden ring-2 ${formData.profilePicture === src ? "ring-green-600" : "ring-transparent"}`}
                        onClick={() => setFormData({ ...formData, profilePicture: src })}
                        aria-label="Choose avatar"
                      >
                        <img src={src} alt="avatar" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleUpdateProfile} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
