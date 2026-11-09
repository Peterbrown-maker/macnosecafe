import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BRAND } from "@/data/makhanani";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white px-4">
      <div className="text-center">
        <img src={BRAND.logo} alt={BRAND.fullName} className="h-20 w-auto mx-auto mb-8 rounded" />
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-white/70">Nothing in the pot here.</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Back to {BRAND.name}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
