import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";

/** Sends logged-out visitors to /login, then back here afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  return <>{children}</>;
}
