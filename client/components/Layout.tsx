import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import VideoModeDropdown, { VideoMode } from "@/components/VideoModeDropdown";
import { createContext, useContext, useState } from "react";

// Video Mode Context
const VideoModeContext = createContext<{
  videoMode: VideoMode;
  setVideoMode: (mode: VideoMode) => void;
}>({ videoMode: "single", setVideoMode: () => {} });

export const useVideoMode = () => useContext(VideoModeContext);

interface LayoutProps {
  children: React.ReactNode;
}

export function VideoModeProvider({ children }: { children: React.ReactNode }) {
  const [videoMode, setVideoMode] = useState<VideoMode>("single");

  return (
    <VideoModeContext.Provider value={{ videoMode, setVideoMode }}>
      {children}
    </VideoModeContext.Provider>
  );
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { videoMode, setVideoMode } = useVideoMode();

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <header className="flex items-center justify-between p-4 border-b border-app-border">
        {/* Left side - Back button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 sm:px-4 py-2 text-app-text border border-app-border hover:bg-app-border/20"
            >
              <div className="flex items-center justify-center w-4 h-4 p-2 border border-app-border rounded-lg bg-app-bg">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>

          {/* Separator */}
          <div className="w-px h-4 bg-app-border hidden sm:block" />

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-app-text">Master Dog Walking</span>
            <ChevronRight className="w-4 h-4 text-app-muted" />
            <span className="text-app-muted">My Journey</span>
          </nav>
        </div>

        {/* Right side - Video Mode Dropdown + Get Started button */}
        <div className="flex items-center gap-3">
          <VideoModeDropdown
            currentMode={videoMode}
            onModeChange={setVideoMode}
          />
          <Button className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 px-3 sm:px-4 py-2 text-sm">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
