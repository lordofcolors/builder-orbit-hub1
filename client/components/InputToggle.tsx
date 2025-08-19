import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Keyboard, Smile } from "lucide-react";

interface InputToggleProps {
  onMessageSend: (message: string) => void;
  onReaction: (emoji: string) => void;
}

const reactionEmojis = ["😀", "👍", "❤️", "🎉"];

export default function InputToggle({
  onMessageSend,
  onReaction,
}: InputToggleProps) {
  const [mode, setMode] = useState<"keyboard" | "emoji">("keyboard");
  const [isInputExpanded, setIsInputExpanded] = useState(true);
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

  const toggleMode = () => {
    if (mode === "keyboard") {
      setMode("emoji");
      setIsInputExpanded(true);
    } else {
      setMode("keyboard");
      setIsInputExpanded(true);
    }
  };

  const toggleInput = () => {
    setIsInputExpanded(!isInputExpanded);
  };

  return (
    <div className="flex justify-center mb-6 px-4">
      <div className="w-full max-w-[600px]">
        {/* Toggle Button */}
        <div className="flex justify-center mb-3">
          <Button
            onClick={toggleMode}
            size="sm"
            className="bg-app-border text-app-text hover:bg-app-border/80 px-4 py-2 rounded-full"
          >
            {mode === "keyboard" ? (
              <>
                <Smile className="w-4 h-4 mr-2" />
                Switch to Reactions
              </>
            ) : (
              <>
                <Keyboard className="w-4 h-4 mr-2" />
                Switch to Keyboard
              </>
            )}
          </Button>
        </div>

        {/* Input Area */}
        {isInputExpanded && (
          <div className="transition-all duration-300">
            {mode === "keyboard" ? (
              // Keyboard Mode
              <div className="flex gap-3">
                <Button
                  onClick={toggleInput}
                  size="sm"
                  className="w-10 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20 flex-shrink-0"
                >
                  <Keyboard className="w-4 h-4" />
                </Button>

                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type something here"
                  className="flex-1 bg-app-bg border-app-border text-app-text placeholder:text-app-muted h-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />

                <Button
                  onClick={handleSendMessage}
                  className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 h-10 px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              // Emoji Reaction Mode
              <div className="flex flex-col items-center">
                <div className="flex gap-4 p-4 bg-app-bg border border-app-border rounded-lg">
                  {reactionEmojis.map((emoji, index) => (
                    <Button
                      key={index}
                      onClick={() => handleReaction(emoji)}
                      size="lg"
                      className="w-14 h-14 p-0 text-2xl bg-app-bg border border-app-border hover:bg-app-border/20 hover:scale-110 transition-transform rounded-full"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-app-muted mt-2">
                  Tap to react to the assistant's message
                </p>
              </div>
            )}
          </div>
        )}

        {/* Collapsed State */}
        {!isInputExpanded && (
          <div className="flex justify-center">
            <Button
              onClick={toggleInput}
              size="sm"
              className="bg-app-border text-app-text hover:bg-app-border/80 px-6 py-2 rounded-full"
            >
              {mode === "keyboard" ? (
                <>
                  <Keyboard className="w-4 h-4 mr-2" />
                  Show Keyboard
                </>
              ) : (
                <>
                  <Smile className="w-4 h-4 mr-2" />
                  Show Reactions
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
