import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Keyboard, X } from "lucide-react";

interface EmojiInputToggleProps {
  onMessageSend: (message: string) => void;
  onReaction: (emoji: string) => void;
}

const reactionEmojis = ["😀", "👍", "❤️", "🎉"];

export default function EmojiInputToggle({
  onMessageSend,
  onReaction,
}: EmojiInputToggleProps) {
  const [isEmojiMode, setIsEmojiMode] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onMessageSend(inputMessage);
      setInputMessage("");
    }
  };

  const handleReaction = (emoji: string) => {
    onReaction(emoji);
  };

  const toggleToEmoji = () => {
    setIsEmojiMode(true);
  };

  const toggleToInput = () => {
    setIsEmojiMode(false);
  };

  return (
    <div className="flex justify-center mb-2 px-4">
      <div className="w-full max-w-[600px]">
        <div className="relative h-12 sm:h-16">
          {!isEmojiMode ? (
            // Input Mode: [Emoji Button] [Input Field] [Send Button]
            <div className="flex gap-3 items-center">
              <Button
                onClick={toggleToEmoji}
                size="sm"
                className="w-12 h-10 p-0 bg-app-bg border border-app-border hover:bg-app-border/20 flex-shrink-0"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2Ff8da714f740c49d1a3800b261a7df4c9?format=webp&width=800"
                  alt="Emoji reactions"
                  className="w-6 h-6 object-contain"
                />
              </Button>

              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type something here"
                  className="w-full bg-app-bg border-app-border text-app-text placeholder:text-app-muted h-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  autoFocus
                />
              </div>

              <Button
                onClick={handleSendMessage}
                className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 h-10 px-4 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            // Emoji Mode: Close button on left, centered emojis, keyboard on right
            <div className="flex items-center justify-between w-full">
              {/* Close button on far left */}
              <Button
                onClick={toggleToInput}
                size="sm"
                className="w-10 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 flex-shrink-0 rounded-full animate-in fade-in slide-in-from-left duration-400 fill-mode-both"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Centered emojis */}
              <div className="flex gap-4 justify-center flex-1">
                {reactionEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    onClick={() => handleReaction(emoji)}
                    size="lg"
                    className="w-12 h-12 p-0 text-xl bg-app-bg border border-app-border hover:bg-app-border/20 hover:scale-110 transition-all duration-500 rounded-full animate-in fade-in slide-in-from-bottom fill-mode-both"
                    style={{
                      animationDelay: `${index * 120}ms`,
                      animationDuration: "480ms",
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>

              {/* Keyboard button expanding from right */}
              <Button
                onClick={toggleToInput}
                size="sm"
                className="w-12 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 flex-shrink-0 animate-in fade-in slide-in-from-right duration-640 fill-mode-both"
              >
                <Keyboard className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
