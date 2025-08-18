import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Fullscreen() {
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("");
    }
  };

  return (
    <div className="h-screen bg-app-bg relative overflow-hidden">
      {/* Full screen video background */}
      <div className="absolute inset-0">
        <img 
          src="/api/placeholder/1920/1080" 
          alt="Full screen video"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay with controls */}
      <div className="absolute inset-0 bg-black/20">
        {/* Exit fullscreen button */}
        <div className="absolute top-4 right-4">
          <Link to="/conversation">
            <Button 
              size="sm" 
              className="w-10 h-10 p-0 bg-black/50 text-white hover:bg-black/70 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        
        {/* Bottom input area */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-center">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type something here"
                className="flex-1 bg-black/50 border-app-border text-white placeholder:text-gray-300 h-16 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button 
                onClick={sendMessage}
                className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 h-16 px-8"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
