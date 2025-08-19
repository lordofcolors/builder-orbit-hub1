import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmojiInputToggle from "@/components/EmojiInputToggle";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Fullscreen() {
  const handleMessageSend = (message: string) => {
    // Handle message sending in fullscreen mode
    console.log("Message sent:", message);
  };

  const handleReaction = (emoji: string) => {
    // Handle emoji reaction in fullscreen mode
    console.log("Reaction:", emoji);
  };

  return (
    <div className="h-screen bg-app-bg relative overflow-hidden">
      {/* Full screen video background */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F10c3ed330bcf4e15bf2a52fe283ec99f?format=webp&width=800"
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
            <EmojiInputToggle
              onMessageSend={handleMessageSend}
              onReaction={handleReaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
