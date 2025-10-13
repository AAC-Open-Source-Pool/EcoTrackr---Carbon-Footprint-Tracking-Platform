import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { setToken } from "@/lib/auth";

// ✅ Define form type
interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ✅ Optional type for API response
interface ApiResponse {
  message?: string;
  [key: string]: any;
}

const Signup = () => {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("⚠️ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        setError(data.message || "Error registering user");
        return;
      }

      // Always redirect to login page after successful registration
      setSuccess("✅ Registration successful! Redirecting to login...");
      // Clear any existing auth data
      localStorage.removeItem("token");
      localStorage.removeItem("auth:role");
      localStorage.removeItem("auth:userId");
      // Redirect to login after a short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError("⚠️ Server not reachable");
      } else {
        console.error(err);
        setError("⚠️ An unexpected error occurred");
      }
    } finally {
      setLoading(false);
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
          <CardTitle className="text-emerald-50">Create Account</CardTitle>
          <CardDescription className="text-emerald-100/80">Join us and start tracking sustainably</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-emerald-50">Name</Label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="text-emerald-50">Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="text-emerald-50">Password</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="text-emerald-50">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          <div className="mt-6 text-center">
            <p className="text-sm text-emerald-100/80">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:text-green-300">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
