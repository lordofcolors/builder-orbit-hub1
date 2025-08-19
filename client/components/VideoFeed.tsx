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
const user2VideoUrl = "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&w=800";
const user3VideoUrl = "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg?auto=compress&cs=tinysrgb&w=800";
const user4VideoUrl = "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg?auto=compress&cs=tinysrgb&w=800";

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
          
          <Link to="/fullscreen?user=you">
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
        <div className="flex gap-4">
          {/* User 1 (You) */}
          <div className="relative">
            <div className={`bg-gray-800 rounded-lg overflow-hidden border border-app-border transition-all duration-300 ${
              transcriptExpanded ? 'w-36 h-28 sm:w-40 sm:h-32' : 'w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48'
            }`}>
              <img 
                src={stockVideoUrl} 
                alt="User 1 Video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded">You</div>
            
            {/* Controls for You feed only */}
            <Link to="/fullscreen?user=you">
              <Button
                size="sm"
                className="absolute top-2 right-2 w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
              >
                <Maximize className="w-3 h-3" />
              </Button>
            </Link>
            
            <Button
              onClick={() => setIsUserMuted(!isUserMuted)}
              size="sm"
              className="absolute bottom-2 right-2 w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
            >
              {isUserMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            </Button>
          </div>
          
          {/* User 2 */}
          <div className="relative">
            <div className={`bg-gray-800 rounded-lg overflow-hidden border border-app-border transition-all duration-300 ${
              transcriptExpanded ? 'w-36 h-28 sm:w-40 sm:h-32' : 'w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48'
            }`}>
              <img 
                src={user2VideoUrl} 
                alt="User 2 Video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded">User 2</div>
            
            {/* Expand button for User 2 */}
            <Link to="/fullscreen?user=user2">
              <Button
                size="sm"
                className="absolute top-2 right-2 w-6 h-6 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
              >
                <Maximize className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "quad") {
    return (
      <div className="flex justify-center px-4">
        <div className="relative">
          <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${
            transcriptExpanded ? 'w-60 h-48' : 'w-80 h-64 sm:w-96 sm:h-72 md:w-[400px] md:h-80'
          }`}>
            {/* User 1 (You) */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={stockVideoUrl} 
                alt="User 1 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">You</div>
              
              {/* Controls for You feed only */}
              <Link to="/fullscreen?user=you">
                <Button
                  size="sm"
                  className="absolute top-1 right-1 w-5 h-5 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
                >
                  <Maximize className="w-2.5 h-2.5" />
                </Button>
              </Link>
              
              <Button
                onClick={() => setIsUserMuted(!isUserMuted)}
                size="sm"
                className="absolute bottom-1 right-1 w-5 h-5 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
              >
                {isUserMuted ? <MicOff className="w-2.5 h-2.5" /> : <Mic className="w-2.5 h-2.5" />}
              </Button>
            </div>
            
            {/* User 2 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={user2VideoUrl} 
                alt="User 2 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 2</div>
              
              {/* Expand button for User 2 */}
              <Link to="/fullscreen?user=user2">
                <Button
                  size="sm"
                  className="absolute top-1 right-1 w-5 h-5 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
                >
                  <Maximize className="w-2.5 h-2.5" />
                </Button>
              </Link>
            </div>
            
            {/* User 3 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={user3VideoUrl} 
                alt="User 3 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 3</div>
              
              {/* Expand button for User 3 */}
              <Link to="/fullscreen?user=user3">
                <Button
                  size="sm"
                  className="absolute top-1 right-1 w-5 h-5 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
                >
                  <Maximize className="w-2.5 h-2.5" />
                </Button>
              </Link>
            </div>
            
            {/* User 4 */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-app-border">
              <img 
                src={user4VideoUrl} 
                alt="User 4 Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">User 4</div>
              
              {/* Expand button for User 4 */}
              <Link to="/fullscreen?user=user4">
                <Button
                  size="sm"
                  className="absolute top-1 right-1 w-5 h-5 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
                >
                  <Maximize className="w-2.5 h-2.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
