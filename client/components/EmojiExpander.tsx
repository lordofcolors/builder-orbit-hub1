import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

interface EmojiExpanderProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const quickEmojis = ["😀", "👍", "❤️", "🎉"];

export default function EmojiExpander({ onEmojiSelect, className = "" }: EmojiExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsExpanded(false);
  };

  return (
    <div className={`relative ${className}`}>
      {!isExpanded ? (
        // Single emoji button
        <Button
          onClick={() => setIsExpanded(true)}
          size="sm"
          className="w-10 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20"
        >
          <Smile className="w-4 h-4" />
        </Button>
      ) : (
        // Expanded 4 emoji buttons
        <div className="flex gap-1">
          {quickEmojis.map((emoji, index) => (
            <Button
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              size="sm"
              className="w-10 h-10 p-0 text-lg bg-app-bg border border-app-border hover:bg-app-border/20"
            >
              {emoji}
            </Button>
          ))}
          {/* Close button */}
          <Button
            onClick={() => setIsExpanded(false)}
            size="sm"
            className="w-10 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
}
