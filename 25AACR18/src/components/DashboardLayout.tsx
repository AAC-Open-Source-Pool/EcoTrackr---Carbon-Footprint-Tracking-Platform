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
import { authFetch, clearToken } from "@/lib/auth";
import { getPoints, POINTS_EVENT } from "@/lib/carbon";


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
  const [ecoPoints, setEcoPoints] = useState<number>(0);
  const [role, setRole] = useState<"user" | "organiser">("user");
  const [userId, setUserId] = useState<string>("");
  const [organisation, setOrganisation] = useState<string>("");
  const [organisedCount, setOrganisedCount] = useState<number>(0);

  // Types for sidebar menu items
  type BaseItem = {
    icon: React.ElementType;
    label: string;
    key?: string;
  };
  type NavItem = BaseItem & { path: string };
  type ActionItem = BaseItem & { action: "logout"; key: string };
  type MenuItem = NavItem | ActionItem;

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch("http://localhost:5000/api/profile");
        const data = await res.json();
        setDisplayName(data.username || data.email || "");
        if (data._id) setUserId(String(data._id));
        if (data.organisation || data.organization || data.company) {
          setOrganisation(data.organisation || data.organization || data.company);
        }
        if (data.profilePicture) setAvatarUrl(data.profilePicture);
      } catch {
        // ignore; unauthenticated pages may use this layout
      }
      // read role
      try {
        const r = localStorage.getItem("auth:role");
        if (r === "organiser") setRole("organiser");
      } catch {}
    })();
  }, []);

  // Initialize and subscribe to Eco Points changes
  useEffect(() => {
    // Initial load
    try {
      setEcoPoints(getPoints());
    } catch {}
    // Subscribe to updates
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { points?: number } | undefined;
      if (detail && typeof detail.points === "number") {
        setEcoPoints(detail.points);
      } else {
        // Fallback: re-read
        try {
          setEcoPoints(getPoints());
        } catch {}
      }
    };
    window.addEventListener(POINTS_EVENT, handler as EventListener);
    return () => {
      window.removeEventListener(POINTS_EVENT, handler as EventListener);
    };
  }, []);

  const menuItems: MenuItem[] = role === "organiser"
    ? [
        { icon: Calendar, label: "Create Event", path: "/organiser" },
        { icon: User, label: "Profile & Settings", path: "/profile" },
        { icon: LogOut, label: "Logout", action: "logout", key: "logout" },
      ]
    : [
        { icon: Home, label: "Dashboard", path: "/dashboard" },
        { icon: BarChart3, label: "Carbon Tracker", path: "/carbon-tracker" },
        { icon: Award, label: "Rewards", path: "/rewards" },
        { icon: MapPin, label: "EcoMap", path: "/eco-map" },
        { icon: BookOpen, label: "Learn & Quizzes", path: "/learn-quiz" },
        { icon: Calendar, label: "Events & NGO Collab", path: "/events" },
        { icon: User, label: "Community", path: "/dashboard/community" },
        { icon: User, label: "About Us", path: "/dashboard/about-us" },
        { icon: User, label: "Profile & Settings", path: "/profile" },
        { icon: LogOut, label: "Logout", action: "logout", key: "logout" },
      ];

  const handleLogout = () => {
    // Clear token and navigate to home/login
    try {
      clearToken();
    } catch {}
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark"
          ? "text-white bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950"
          : "text-gray-900 bg-gradient-to-br from-emerald-50 via-green-50 to-green-100"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl flex flex-col rounded-r-2xl`}
      >
        {/* Logo */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className={`flex items-center ${isSidebarOpen ? "space-x-2" : "justify-center"}`}>
            <Leaf className="h-8 w-8 text-green-600" />
            {isSidebarOpen && <span className="text-xl font-bold">EcoTrack</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, idx) => {
              const isActive = "path" in item && location.pathname.startsWith(item.path);
              const key = ("path" in item ? item.path : item.key) || idx; // Ensure unique key
              return (
                <li key={key}>
                  {"action" in item && item.action === "logout" ? (
                    <button
                      onClick={handleLogout}
                      title={item.label}
                      className={`${
                        isSidebarOpen
                          ? "w-full text-left flex items-center space-x-3"
                          : "w-full flex items-center justify-center"
                      } px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900`}
                    >
                      <item.icon className="h-5 w-5" />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </button>
                  ) : (
                    <Link
                      to={(item as NavItem).path}
                      title={item.label}
                      className={`${
                        isSidebarOpen
                          ? "flex items-center space-x-3 justify-start"
                          : "flex items-center justify-center"
                      } px-3 py-2 rounded-lg transition-all border ${
                        isActive
                          ? "bg-emerald-600/15 text-emerald-800 dark:text-white border-emerald-500/30 shadow-inner"
                          : "text-gray-700 dark:text-gray-200 border-transparent hover:bg-white/40 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/10 hover:shadow"
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
        <header className="bg-white/50 dark:bg-white/10 backdrop-blur-xl shadow-md border-b border-white/60 dark:border-white/10 px-6 py-4">
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
                {role === "user" && (
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-white">Eco Warrior</Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-white">Level 3</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Eco Points & Theme Toggle */}
            <div className="flex items-center space-x-4">
              {role === "user" ? (
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Eco Points</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">{ecoPoints.toLocaleString()}</p>
                </div>
              ) : (
                <div className="text-right">
                  {organisation && (
                    <div className="text-sm text-gray-700 dark:text-gray-200">Organisation: <span className="font-semibold">{organisation}</span></div>
                  )}
                  <div className="text-sm text-gray-700 dark:text-gray-200">Events Organised: <span className="font-semibold">{organisedCount}</span></div>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="min-h-[calc(100vh-6rem)] bg-gradient-to-br from-emerald-50 via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950 p-2 sm:p-4 md:p-6 rounded-xl">
            <div className="max-w-6xl mx-auto space-y-6">
              {children}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;

