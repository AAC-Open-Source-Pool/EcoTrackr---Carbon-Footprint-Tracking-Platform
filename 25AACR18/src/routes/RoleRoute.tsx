import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/auth";

type RoleRouteProps = {
  children: JSX.Element;
  roles: Array<"user" | "organiser">;
};

const RoleRoute = ({ children, roles }: RoleRouteProps) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  let role: "user" | "organiser" = "user";
  try {
    const stored = localStorage.getItem("auth:role");
    if (stored === "organiser") role = "organiser";
  } catch {}

  if (!roles.includes(role)) {
    // Redirect organiser to organiser page, user to dashboard by default
    return <Navigate to={role === "organiser" ? "/organiser" : "/dashboard"} replace />;
  }
  return children;
};

export default RoleRoute;
