import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmojiInputToggle from "@/components/EmojiInputToggle";
import { X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const userImages = {
  you: "https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F10c3ed330bcf4e15bf2a52fe283ec99f?format=webp&width=800",
  user2: "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&w=1600",
  user3: "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg?auto=compress&cs=tinysrgb&w=1600",
  user4: "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg?auto=compress&cs=tinysrgb&w=1600"
};

const userLabels = {
  you: "You",
  user2: "User 2",
  user3: "User 3", 
  user4: "User 4"
};

export default function Fullscreen() {
  const [searchParams] = useSearchParams();
  const userParam = searchParams.get('user') as keyof typeof userImages || 'you';
  
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
          src={userImages[userParam]}
          alt={`Full screen video - ${userLabels[userParam]}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay with controls */}
      <div className="absolute inset-0 bg-black/20">
        {/* User label */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
            <span className="text-lg font-medium">{userLabels[userParam]}</span>
          </div>
        </div>

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

        {/* Bottom input area - only show for "You" */}
        {userParam === 'you' && (
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <EmojiInputToggle
                onMessageSend={handleMessageSend}
                onReaction={handleReaction}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
