import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

/* global google */
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleResponse {
  credential: string;
  clientId?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

// ✅ Handle Google login response
const handleGoogleResponse = async (response: GoogleResponse) => {
  try {
    const res = await fetch("http://localhost:5000/api/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }), // ✅ FIXED
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Google login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error with Google login");
  }
};


  // ✅ Google login setup
  useEffect(() => {
    // Create script element dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize Google Sign-In after script loads
    script.onload = () => {
      const googleBtn = document.getElementById("google-login-btn");
      if (googleBtn && window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "22049997057-p6qg64mo1iufr7m8vnhsb5qa9tvg9fq8.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(googleBtn, {
          theme: "outline",
          size: "large",
          width: "100%",
        });

        window.google.accounts.id.prompt(); // optional popup
      }
    };

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Normal login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">EcoTrackr</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <div id="google-login-btn" className="w-full flex justify-center"></div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 hover:text-green-700"
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
