import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Home,
  BarChart3,
  Award,
  MapPin,
  BookOpen,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ui/themeContext"; // Ensure this is correctly implemented
import { authFetch } from "@/lib/auth";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [displayName, setDisplayName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch("http://localhost:5000/api/profile");
        const data = await res.json();
        setDisplayName(data.username || data.email || "");
        if (data.profilePicture) setAvatarUrl(data.profilePicture);
      } catch {
        // ignore; unauthenticated pages may use this layout
      }
    })();
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Carbon Tracker", path: "/carbon-tracker" },
    { icon: Award, label: "Rewards", path: "/rewards" },
    { icon: MapPin, label: "EcoMap", path: "/eco-map" },
    { icon: BookOpen, label: "Learn & Quizzes", path: "/learn-quiz" },
    { icon: Calendar, label: "Events & NGO Collab", path: "/events" },
    { icon: User, label: "Community", path: "/dashboard/community" },
    { icon: User, label: "About Us", path: "/dashboard/about-us" },
    { icon: User, label: "Profile & Settings", path: "/profile" },
    { icon: LogOut, label: "Logout", action: "logout" as const },
  ];

  const handleLogout = () => {
    // Add token removal logic if needed
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            {isSidebarOpen && <span className="text-xl font-bold">EcoTrack</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  {item.action === "logout" ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      <item.icon className="h-5 w-5" />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </button>
                  ) : (
                    <Link
                      to={item.path as string}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  {avatarUrl && <img src={avatarUrl} alt="" className="h-full w-full object-cover" />}
                </div>
                <h1 className="text-2xl font-semibold">Welcome back{displayName ? `, ${displayName}` : ""}!</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-white">Eco Warrior</Badge>
                  <Badge variant="outline" className="dark:border-gray-500 dark:text-white">Level 3</Badge>
                </div>
              </div>
            </div>

            {/* Eco Points & Theme Toggle */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">Eco Points</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">1,247</p>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;

