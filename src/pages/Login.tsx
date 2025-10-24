import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setToken, setUserRole, setUserData } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: GoogleResponse) => void }) => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

interface GoogleResponse {
  credential: string;
  clientId?: string;
}

type UserRoleType = 'user' | 'organizer' | 'ngo';

interface UserData {
  id: string;
  email: string;
  name?: string;
  role: UserRoleType | 'default';
}
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRoleType>("user");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "22049997057-p6qg64mo1iufr7m8vnhsb5qa9tvg9fq8.apps.googleusercontent.com";

  const handleGoogleResponse = useCallback(async (response: GoogleResponse) => {
    setIsLoading(true);
    try {
      if (!response.credential) {
        throw new Error('No credential in Google response');
      }

      // Authenticate with your backend
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credential: response.credential,
          role: role
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Authentication failed');
      }

      const data = await res.json();
      // Set authentication data
      setToken(data.token);
      setUserRole(data.role || role);
      setUserData({ ...(data.user || {}), role: data.role || role });

      // Redirect based on the role returned by the server or the selected role
      const redirectRole = data.role || role;
      let redirectPath = '/dashboard'; // Default for users

      switch (redirectRole) {
        case 'ngo':
          redirectPath = '/ngo/dashboard';
          break;
        case 'organizer':
          redirectPath = '/organiser/dashboard';
          break;
        default:
          redirectPath = '/dashboard';
      }

      navigate(redirectPath);
      
    } catch (error) {
      console.error('Google login error:', error);
      alert(`Google login failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE, navigate, role]);

  const showFallbackButton = useCallback(() => {
    const googleBtn = document.getElementById("google-login-btn");
    if (googleBtn) {
      googleBtn.innerHTML = '';
      const fallback = document.createElement('button');
      fallback.type = 'button';
      fallback.className = 'w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none';
      fallback.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5781 9.20508C17.5781 8.56641 17.5208 7.95274 17.4167 7.36328H9V10.8451H13.9062C13.7604 11.9701 13.1528 12.9232 12.1823 13.5592V15.8195H14.901C16.6181 14.2527 17.5781 11.9459 17.5781 9.20508Z" fill="#4285F4"/>
          <path d="M9 18C11.4302 18 13.4896 17.1946 14.901 15.8195L12.1823 13.5592C11.4236 14.0992 10.4403 14.4205 9 14.4205C6.65903 14.4205 4.67014 12.8374 3.96528 10.71H0.149414V13.0418C1.60851 15.9833 4.96007 18 9 18Z" fill="#34A853"/>
          <path d="M3.96528 10.71C3.80556 10.17 3.71528 9.59325 3.71528 9C3.71528 8.40675 3.80556 7.83 3.96528 7.29V4.95825H0.149414C-0.0498047 5.66212 -0.166626 6.40275 -0.166626 7.16662C-0.166626 7.9305 -0.0498047 8.67112 0.149414 9.375L3.96528 10.71Z" fill="#FBBC05"/>
          <path d="M9 3.57955C10.4948 3.57955 11.8236 4.08398 12.8889 5.06719L15.0118 2.94422C13.4861 1.53047 11.4306 0.666626 9 0.666626C4.96007 0.666626 1.60851 2.68331 0.149414 5.62478L3.96528 7.29C4.67014 5.16259 6.65903 3.57955 9 3.57955Z" fill="#EA4335"/>
        </svg>
        <span>Continue with Google (Fallback)</span>
      `;
      fallback.onclick = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=profile email&access_type=offline`;
      };
      googleBtn.appendChild(fallback);
      console.warn('Google fallback button rendered.');
    }
  }, [GOOGLE_CLIENT_ID]);

  const initializeGoogleSignIn = useCallback(() => {
    try {
      // Remove any existing Google script to avoid duplicates
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) existingScript.remove();

      if (!window.google || !window.google.accounts) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setTimeout(() => initializeGoogleSignIn(), 500);
        };
        script.onerror = () => {
          console.error('Failed to load Google Sign-In script');
          showFallbackButton();
        };
        document.head.appendChild(script);
        return;
      }

      if (!GOOGLE_CLIENT_ID) {
        throw new Error('Google Client ID is not configured');
      }

      const googleBtn = document.getElementById('google-login-btn');
      if (googleBtn) {
        googleBtn.innerHTML = '';
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
          });
          window.google.accounts.id.renderButton(googleBtn, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: 300,
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          });
          console.log('Google button rendered.');
        } catch (error) {
          console.error('Error rendering Google button:', error);
          showFallbackButton();
        }
      } else {
        console.error('google-login-btn element not found');
        showFallbackButton();
      }
    } catch (error) {
      console.error('Unexpected error in Google Sign-In initialization:', error);
      showFallbackButton();
    }
  }, [GOOGLE_CLIENT_ID, handleGoogleResponse, showFallbackButton]);


  // Initialize Google Sign-In when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeGoogleSignIn();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up any Google Sign-In elements
      const googleButton = document.getElementById('google-login-btn');
      if (googleButton) {
        googleButton.innerHTML = '';
      }
    };
  }, [initializeGoogleSignIn]);

  // Normal login handler

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Direct API call instead of using useAuth login to get better control over role handling
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role, // Send the selected role to the backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error('Authentication failed: No token received');
      }

  // Set authentication data
  setToken(data.token);
  // Persist the user data first so setUserRole can update it reliably
  const resolvedRole = data.role || role;
  setUserData({ ...data.user, role: resolvedRole });
  setUserRole(resolvedRole);

      // Redirect based on the role returned by the server or the selected role
      const redirectRole = data.role || role;
      let redirectPath = '/dashboard'; // Default for users

      switch (redirectRole) {
        case 'ngo':
          redirectPath = '/ngo/dashboard';
          break;
        case 'organizer':
          redirectPath = '/organiser/dashboard';
          break;
        default:
          redirectPath = '/dashboard';
      }

      console.log("Login success:", { token: data.token, role: data.role, redirectPath });

      navigate(redirectPath);

    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-login-image flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 leaf-outline" />
            <span className="text-2xl font-bold text-emerald-50">EcoTrackr</span>
          </div>
          <CardTitle className="text-emerald-50">Welcome Back</CardTitle>
          <CardDescription className="text-emerald-100/80">Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <Label className="text-emerald-50">Sign in as</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={role === "user" ? "default" : "outline"}
                  className={role === "user" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setRole("user")}
                >
                  User
                </Button>
                <Button
                  type="button"
                  variant={role === "organizer" ? "default" : "outline"}
                  className={role === "organizer" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  onClick={() => setRole("organizer")}
                >
                  Event Organizer
                </Button>
                <Button
                  type="button"
                  variant={role === "ngo" ? "default" : "outline"}
                  className={role === "ngo" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setRole("ngo")}
                >
                  NGO
                </Button>
              </div>
            </div>

            <Label className="text-emerald-50">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label className="text-emerald-50">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>


          {/* Google Login Button - let Google render here */}
          <div id="google-login-btn" className="w-full flex items-center justify-center my-2"></div>

          <div className="mt-6 text-center">
            <p className="text-sm text-emerald-100/80">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-400 hover:text-green-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
