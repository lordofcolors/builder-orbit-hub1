import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Keyboard } from "lucide-react";

interface EmojiInputToggleProps {
  onMessageSend: (message: string) => void;
  onReaction: (emoji: string) => void;
}

const reactionEmojis = ["😀", "👍", "❤️", "🎉"];

export default function EmojiInputToggle({ onMessageSend, onReaction }: EmojiInputToggleProps) {
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
    <div className="flex justify-center mb-6 px-4">
      <div className="w-full max-w-[600px]">
        <div className="transition-all duration-300">
          {!isEmojiMode ? (
            // Input Mode: [Emoji Button] [Input Field] [Send Button]
            <div className="flex gap-3 items-center">
              <Button
                onClick={toggleToEmoji}
                size="sm"
                className="w-12 h-10 p-0 bg-app-bg border border-app-border hover:bg-app-border/20 flex-shrink-0"
              >
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F4a3e8d96011a4b9184f85c3a556c6cd9?format=webp&width=800" 
                  alt="Emoji reactions"
                  className="w-6 h-6 object-contain"
                />
              </Button>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type something here"
                className="flex-1 bg-app-bg border-app-border text-app-text placeholder:text-app-muted h-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              
              <Button 
                onClick={handleSendMessage}
                className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 h-10 px-4 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            // Emoji Mode: [😀] [👍] [❤️] [🎉] [Keyboard Button]
            <div className="flex items-center justify-between">
              <div className="flex gap-6 flex-1 justify-center">
                {reactionEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    onClick={() => handleReaction(emoji)}
                    size="lg"
                    className="w-16 h-16 p-0 text-3xl bg-app-bg border border-app-border hover:bg-app-border/20 hover:scale-110 transition-all duration-200 rounded-full"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
              
              <Button
                onClick={toggleToInput}
                size="sm"
                className="w-12 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 flex-shrink-0 ml-6"
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
