import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BRAND } from "@/data/brianos";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <img src={BRAND.logoBlack} alt={BRAND.name} className="h-14 w-auto mx-auto mb-8" />
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Nothing on the fire here.</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Back to {BRAND.name}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
