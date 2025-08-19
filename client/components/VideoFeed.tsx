import { Button } from "@/components/ui/button";
import { Maximize, Mic, MicOff } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoMode } from "./VideoModeDropdown";

interface VideoFeedProps {
  mode: VideoMode;
  transcriptExpanded: boolean;
  isUserMuted: boolean;
  setIsUserMuted: (muted: boolean) => void;
}

const stockVideoUrl = "https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F10c3ed330bcf4e15bf2a52fe283ec99f?format=webp&width=800";
const avatarUrl = "https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F13a19102fc4945c783f457401a61da3a?format=webp&width=800";

export default function VideoFeed({ mode, transcriptExpanded, isUserMuted, setIsUserMuted }: VideoFeedProps) {
  if (mode === "single") {
    return (
      <div className="flex justify-center mb-4 px-4">
        <div className="relative">
          <div className={`bg-gray-800 rounded-lg overflow-hidden border border-app-border transition-all duration-300 ${
            transcriptExpanded ? 'w-56 h-32 sm:w-64 sm:h-36' : 'w-72 h-40 sm:w-80 sm:h-48 md:w-[400px] md:h-[225px]'
          }`}>
            <img 
              src={stockVideoUrl} 
              alt="Live Video Feed"
              className="w-full h-full object-cover"
            />
          </div>
          
          <Link to="/fullscreen">
            <Button
              size="sm"
              className="absolute top-2 right-2 w-7 h-7 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
            >
              <Maximize className="w-3 h-3" />
            </Button>
          </Link>
          
          <Button
            onClick={() => setIsUserMuted(!isUserMuted)}
            size="sm"
            className="absolute bottom-2 right-2 w-7 h-7 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
          >
            {isUserMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "dual") {
    return (
      <div className="flex justify-center mb-4 px-4">
        <div className="flex gap-3">
          {/* User 1 */}
          <div className="relative">
            <div className={`bg-gray-800 rounded-lg overflow-hidden border border-app-border transition-all duration-300 ${
              transcriptExpanded ? 'w-24 h-18 sm:w-28 sm:h-20' : 'w-32 h-24 sm:w-40 sm:h-28'
            }`}>
              <img 
                src={stockVideoUrl} 
                alt="User 1 Video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">You</div>
          </div>
          
          {/* User 2 */}
          <div className="relative">
            <div className={`bg-gray-800 rounded-lg overflow-hidden border border-app-border transition-all duration-300 ${
              transcriptExpanded ? 'w-24 h-18 sm:w-28 sm:h-20' : 'w-32 h-24 sm:w-40 sm:h-28'
            }`}>
              <img 
                src={avatarUrl} 
                alt="User 2 Video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 2</div>
          </div>
          
          {/* Controls on the right side */}
          <div className="flex flex-col gap-1 ml-2">
            <Link to="/fullscreen">
              <Button
                size="sm"
                className="w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
              >
                <Maximize className="w-3 h-3" />
              </Button>
            </Link>
            
            <Button
              onClick={() => setIsUserMuted(!isUserMuted)}
              size="sm"
              className="w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
            >
              {isUserMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "quad") {
    return (
      <div className="flex justify-center mb-4 px-4">
        <div className="relative">
          <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
            transcriptExpanded ? 'w-40 h-32' : 'w-60 h-48 sm:w-80 sm:h-60'
          }`}>
            {/* User 1 (You) */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={stockVideoUrl} 
                alt="User 1 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">You</div>
            </div>
            
            {/* User 2 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={avatarUrl} 
                alt="User 2 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 2</div>
            </div>
            
            {/* User 3 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={avatarUrl} 
                alt="User 3 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 3</div>
            </div>
            
            {/* User 4 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={avatarUrl} 
                alt="User 4 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 4</div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute -top-8 right-0 flex gap-1">
            <Link to="/fullscreen">
              <Button
                size="sm"
                className="w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
              >
                <Maximize className="w-3 h-3" />
              </Button>
            </Link>
            
            <Button
              onClick={() => setIsUserMuted(!isUserMuted)}
              size="sm"
              className="w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
            >
              {isUserMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
