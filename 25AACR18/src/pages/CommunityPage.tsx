import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Heart, MessageCircle, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getToken, authFetch } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const CommunityPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  // 🔹 Logged in user display name (fetched on first load for client display only)
  const [displayName, setDisplayName] = useState<string>("");
  const [myUserId, setMyUserId] = useState<string>("");

  // Leaderboard Data
  const leaderboardData = [
    { rank: 1, name: "Sarah Chen", score: 2847, co2Saved: "450 kg", avatar: "/placeholder.svg" },
    { rank: 2, name: "Mike Johnson", score: 2634, co2Saved: "398 kg", avatar: "/placeholder.svg" },
    { rank: 3, name: "Emma Wilson", score: 2521, co2Saved: "367 kg", avatar: "/placeholder.svg" },
    { rank: 4, name: "David Brown", score: 2398, co2Saved: "321 kg", avatar: "/placeholder.svg" },
    { rank: 5, name: "Lisa Garcia", score: 2156, co2Saved: "298 kg", avatar: "/placeholder.svg" },
  ];

  const featuredStories = [
    { image: "/placeholder.svg", title: "Solar Success Story", description: "How the Johnson family reduced their carbon footprint by 70% with solar panels and smart home tech." },
    { image: "/placeholder.svg", title: "Urban Gardening Revolution", description: "Community transforms abandoned lot into thriving urban garden, feeding 50+ families sustainably." },
    { image: "/placeholder.svg", title: "Zero Waste Champion", description: "Local business eliminates 99% of waste through innovative recycling and composting programs." },
  ];

  // 🔹 Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
    // Try to get user name from profile for local display (optional)
    (async () => {
      try {
        const token = getToken();
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setDisplayName(data.username || data.email || "");
          if (data._id) setMyUserId(String(data._id));
        }
      } catch {}
    })();
  }, []);

  // 🔹 Add new post
  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    try {
      setIsPosting(true);
      const res = await authFetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: JSON.stringify({ content: newPost }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to post");
      }
      const created = await res.json();
      setPosts([created, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error("Error adding post:", err);
      toast({ title: "Could not post", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setIsPosting(false);
    }
  };

  // 🔹 Like a post
  const handleLike = async (postId: string) => {
    try {
      const res = await authFetch(`http://localhost:5000/api/posts/${postId}/like`, { method: "POST" });
      const updated = await res.json();
      setPosts(posts.map((p) => (p._id === postId ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const isLikedByMe = (post: any) => {
    if (!myUserId) return false;
    return Array.isArray(post.likedBy) && post.likedBy.some((id: any) => String(id) === String(myUserId));
  };

  // 🔹 Add a comment
  const handleComment = async (postId: string, text: string) => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        text,
        author: displayName || undefined,
      });
      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await authFetch(`http://localhost:5000/api/posts/${postId}`, { method: "DELETE" });
      const data = await res.json();
      if (data?.success) {
        setPosts(posts.filter((p) => p._id !== postId));
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
          <p className="text-muted-foreground">Connect, share, and grow together in our eco-community</p>
        </div>

        {/* Leaderboard Section */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Eco Leaders
            </CardTitle>
            <CardDescription>Top environmental champions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {user.rank}
                    </div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">CO₂ Saved: {user.co2Saved}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{user.score} points</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Community Feed
            </CardTitle>
            <CardDescription>Share your green journey with others</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add new post */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddPost();
                }}
              />
              <Button onClick={handleAddPost} disabled={isPosting}>
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>

            {/* Render posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post._id} className="border-b border-border pb-4 last:border-b-0">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      {post.authorAvatar ? (
                        <AvatarImage src={post.authorAvatar} />
                      ) : (
                        <AvatarFallback>
                          {post.author?.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-3">{post.content}</p>

                  {/* Like Button */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center gap-1 transition-colors ${isLikedByMe(post) ? "text-red-500" : "hover:text-red-500"}`}
                      title="Like"
                    >
                      <Heart className={`h-4 w-4 ${isLikedByMe(post) ? "fill-red-500 text-red-500" : ""}`} />
                      {post.likes}
                    </button>
                    {post.userId && displayName && (
                      // only show delete if this post belongs to current user
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                        hidden={String(post.userId) !== String((posts.find(p => p._id === post._id)?.userId))}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {post.comments.map((c: any, idx: number) => (
                        <div
                          key={idx}
                          className="text-sm text-foreground bg-muted/40 p-2 rounded"
                        >
                          <span className="font-medium">{c.author || "Anonymous"}: </span>
                          {c.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment */}
                  <div className="mt-3 flex gap-2">
                    <Input
                      placeholder="Write a reply..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                          handleComment(post._id, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = (e.currentTarget.previousSibling as HTMLInputElement);
                        if (input.value.trim() !== "") {
                          handleComment(post._id, input.value);
                          input.value = "";
                        }
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Stories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Featured Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredStories.map((story, index) => (
                <div key={index} className="flex gap-3 p-3 border border-border rounded-lg">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">{story.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
