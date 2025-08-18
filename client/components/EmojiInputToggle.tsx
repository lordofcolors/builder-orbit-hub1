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
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    setTimeout(() => {
      setIsEmojiMode(true);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

  const toggleToInput = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsEmojiMode(false);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

  return (
    <div className="flex justify-center mb-6 px-4">
      <div className="w-full max-w-[600px]">
        <div className="relative h-16 overflow-hidden">
          {!isEmojiMode ? (
            // Input Mode: [Emoji Button] [Input Field] [Send Button]
            <div className={`flex gap-3 items-center absolute inset-0 transition-all duration-700 ease-in-out ${
              isAnimating ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'
            }`}>
              <Button
                onClick={toggleToEmoji}
                size="sm"
                className="w-12 h-10 p-0 bg-app-bg border border-app-border hover:bg-app-border/20 flex-shrink-0 transition-all duration-300"
              >
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2Ff8da714f740c49d1a3800b261a7df4c9?format=webp&width=800" 
                  alt="Emoji reactions"
                  className="w-6 h-6 object-contain"
                />
              </Button>
              
              <div className={`flex-1 transition-all duration-600 ease-in-out ${
                isAnimating ? 'transform scale-x-0 opacity-0' : 'transform scale-x-100 opacity-100'
              }`}>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type something here"
                  className="w-full bg-app-bg border-app-border text-app-text placeholder:text-app-muted h-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                className={`bg-app-primary text-app-primary-dark hover:bg-app-primary/90 h-10 px-4 flex-shrink-0 transition-all duration-600 ease-in-out ${
                  isAnimating ? 'transform translate-x-8 scale-75 opacity-0' : 'transform translate-x-0 scale-100 opacity-100'
                }`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            // Emoji Mode: [😀] [👍] [❤️] [🎉] [Keyboard Button]
            <div className={`flex items-center justify-between absolute inset-0 transition-all duration-700 ease-in-out ${
              isAnimating ? 'transform -translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'
            }`}>
              <div className="flex gap-4 flex-1 justify-start pl-2">
                {reactionEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    onClick={() => handleReaction(emoji)}
                    size="lg"
                    className={`w-14 h-14 p-0 text-2xl bg-app-bg border border-app-border hover:bg-app-border/20 hover:scale-110 transition-all duration-400 rounded-full ${
                      isAnimating ? 'transform translate-x-0 opacity-0' : 'transform translate-x-0 opacity-100'
                    }`}
                    style={{
                      transitionDelay: isAnimating ? '0ms' : `${index * 100}ms`,
                      transform: isAnimating ? 'translateX(-100px) scale(0.8)' : 'translateX(0) scale(1)'
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
              
              <Button
                onClick={toggleToInput}
                size="sm"
                className={`w-12 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 flex-shrink-0 transition-all duration-600 ease-in-out ${
                  isAnimating ? 'transform scale-110 opacity-80' : 'transform scale-100 opacity-100'
                }`}
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
