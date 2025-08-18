import { Button } from "@/components/ui/button";
import { Mic, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export default function PreCall() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app-bg p-8">
      {/* Agent Avatar */}
      <div className="mb-16">
        <div className="relative">
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-xl opacity-50 animate-pulse"></div>
          
          {/* Agent avatar */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 flex items-center justify-center">
            <span className="text-6xl font-bold text-app-primary-dark">a</span>
          </div>
        </div>
      </div>
      
      {/* Preview Window */}
      <div className="mb-8 relative">
        <div className="w-96 h-56 bg-gray-800 rounded-lg overflow-hidden border-2 border-app-border relative">
          {/* Placeholder for video feed */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-center text-app-muted">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Camera Preview</p>
            </div>
          </div>
          
          {/* Mute indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-black/50 rounded-full text-xs text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Camera Preview</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-8">
        <div className="text-center">
          <Link to="/conversation">
            <Button 
              size="lg" 
              className="w-16 h-16 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-3"
            >
              <Mic className="w-8 h-8" />
            </Button>
          </Link>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Connect</p>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="w-16 h-16 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-3"
          >
            <Camera className="w-8 h-8" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Personalize</p>
        </div>
      </div>
    </div>
  );
}
