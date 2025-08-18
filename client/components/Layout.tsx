import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <header className="flex items-center justify-between p-4 border-b border-app-border">
        {/* Left side - Back button */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 text-app-text border border-app-border hover:bg-app-border/20">
              <div className="flex items-center justify-center w-4 h-4 p-2 border border-app-border rounded-lg bg-app-bg">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Back
            </Button>
          </Link>
          
          {/* Separator */}
          <div className="w-px h-4 bg-app-border" />
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm">
            <span className="text-app-text">Master Dog Walking</span>
            <ChevronRight className="w-4 h-4 text-app-muted" />
            <span className="text-app-muted">My Journey</span>
          </nav>
        </div>
        
        {/* Right side - Get Started button */}
        <Button className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 px-4 py-2">
          Get Started
        </Button>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
