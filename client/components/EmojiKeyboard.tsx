import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

interface EmojiKeyboardProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const emojiCategories = {
  faces: ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  gestures: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👋", "🤚"],
  objects: ["❤️", "💙", "💚", "💛", "🧡", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖"],
  nature: ["🌟", "⭐", "🌙", "☀️", "⛅", "🌈", "🔥", "💧", "🌸", "🌺", "🌻", "🌷", "🌹", "���", "🌾", "🍀"]
};

export default function EmojiKeyboard({ onEmojiSelect, className = "" }: EmojiKeyboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof emojiCategories>("faces");

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        className={`w-10 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 ${className}`}
      >
        <Smile className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Emoji picker panel */}
      <div className="absolute bottom-12 left-0 w-80 bg-app-bg border border-app-border rounded-lg shadow-lg z-50">
        {/* Header with categories */}
        <div className="flex border-b border-app-border">
          {Object.keys(emojiCategories).map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof emojiCategories)}
              size="sm"
              className={`flex-1 h-10 rounded-none border-0 ${
                activeCategory === category 
                  ? 'bg-app-primary text-app-primary-dark' 
                  : 'bg-transparent text-app-text hover:bg-app-border/20'
              }`}
            >
              {category === 'faces' && '😀'}
              {category === 'gestures' && '👍'}
              {category === 'objects' && '❤️'}
              {category === 'nature' && '🌟'}
            </Button>
          ))}
        </div>

        {/* Emoji grid */}
        <div className="p-3">
          <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
            {emojiCategories[activeCategory].map((emoji, index) => (
              <Button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                size="sm"
                className="w-8 h-8 p-0 text-lg bg-transparent hover:bg-app-border/20 border-0"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>

        {/* Close button */}
        <div className="p-2 border-t border-app-border">
          <Button
            onClick={() => setIsOpen(false)}
            size="sm"
            className="w-full bg-app-border text-app-text hover:bg-app-muted/20"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
