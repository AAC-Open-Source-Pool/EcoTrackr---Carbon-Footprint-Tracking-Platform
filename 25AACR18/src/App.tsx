import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/themeContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CarbonTracker from "./pages/CarbonTracker";
import Rewards from "./pages/Rewards";
import EcoMap from "./pages/EcoMap";
import LearnQuiz from "./pages/LearnQuiz";
import Events from "./pages/Events";
import CommunityPage from "./pages/CommunityPage";
import AboutUsPage from "./pages/AboutUsPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Survey from "./pages/Survey";
import NotFound from "./pages/NotFound";
<script src="https://accounts.google.com/gsi/client" async defer></script>

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/survey" element={<Survey />} />
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/carbon-tracker" element={<CarbonTracker />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/eco-map" element={<EcoMap />} />
            <Route path="/learn-quiz" element={<LearnQuiz />} />
            <Route path="/events" element={<Events />} />
           <Route path="/dashboard/about-us" element={<AboutUsPage />} />
             <Route path="/dashboard/community" element={<CommunityPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
