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
import OrganiserEventForm from "./pages/OrganiserEventForm";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
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
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["user"]}>
                    <Dashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route path="/carbon-tracker" element={<RoleRoute roles={["user"]}><CarbonTracker /></RoleRoute>} />
            <Route path="/rewards" element={<RoleRoute roles={["user"]}><Rewards /></RoleRoute>} />
            <Route path="/eco-map" element={<RoleRoute roles={["user"]}><EcoMap /></RoleRoute>} />
            <Route path="/learn-quiz" element={<RoleRoute roles={["user"]}><LearnQuiz /></RoleRoute>} />
            <Route path="/events" element={<RoleRoute roles={["user"]}><Events /></RoleRoute>} />
            <Route
              path="/organiser"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={["organiser"]}>
                    <OrganiserEventForm />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
           <Route path="/dashboard/about-us" element={<AboutUsPage />} />
             <Route path="/dashboard/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
