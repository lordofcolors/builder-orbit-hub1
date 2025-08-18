import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiKeyboard from "@/components/EmojiKeyboard";
import {
  Monitor,
  X,
  Camera,
  Minus,
  Plus,
  Maximize,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

interface TranscriptMessage {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: string;
}

export default function Conversation() {
  const [transcriptExpanded, setTranscriptExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    {
      id: "1",
      type: "agent",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis lectus, tristique at dolor et, luctus sagittis erat. Vivamus eu tempor massa.",
      timestamp: "10:30 AM"
    },
    {
      id: "2", 
      type: "user",
      content: "Type something here",
      timestamp: "10:31 AM"
    }
  ]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: TranscriptMessage = {
        id: Date.now().toString(),
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTranscript([...transcript, newMessage]);
      setInputMessage("");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
  };

  return (
    <div className="flex flex-col h-screen bg-app-bg">
      {/* Agent Avatar */}
      <div className="flex justify-center py-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-lg opacity-60 animate-pulse"></div>
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold text-app-primary-dark">a</span>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div className="flex justify-center mb-6 px-4">
        <div className="relative">
          <div className="w-80 h-48 sm:w-[400px] sm:h-[225px] bg-gray-800 rounded-lg overflow-hidden border border-app-border">
            {/* Placeholder for actual video */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center text-app-muted">
                <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Live Video Feed</p>
              </div>
            </div>
          </div>

          {/* Maximize button */}
          <Link to="/fullscreen">
            <Button
              size="sm"
              className="absolute top-2 right-2 w-8 h-8 p-0 bg-black/50 text-white hover:bg-black/70 rounded"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Transcript Area */}
      <div className="flex justify-center mb-6 px-4">
        <div className={`w-full max-w-[600px] border border-app-border rounded-lg bg-app-bg p-4 sm:p-6 transition-all duration-300 ${
          transcriptExpanded ? 'h-60 sm:h-80' : 'h-16 sm:h-20'
        }`}>
          {transcriptExpanded ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {transcript.map((message) => (
                  <div key={message.id} className="text-sm">
                    <span className={message.type === 'agent' ? 'text-app-agent' : 'text-app-user'}>
                      {message.type === 'agent' ? 'A: ' : 'You: '}
                    </span>
                    <span className={message.type === 'agent' ? 'text-app-agent' : 'text-app-user'}>
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center h-full">
              <span className="text-app-agent text-sm">
                A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis lectus, tristique at dolor et, luctus sagittis erat. Vivamus eu tempor massa.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex justify-center mb-6 px-4">
        <div className="flex gap-2 w-full max-w-[600px]">
          {/* Expand/Collapse Button */}
          <Button
            onClick={() => setTranscriptExpanded(!transcriptExpanded)}
            size="sm"
            className="w-8 h-10 p-0 bg-app-bg border border-app-border text-app-text hover:bg-app-border/20"
          >
            {transcriptExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>

          {/* Emoji Keyboard */}
          <EmojiKeyboard onEmojiSelect={handleEmojiSelect} />

          {/* Input Field */}
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type something here"
            className="flex-1 bg-app-bg border-app-border text-app-text placeholder:text-app-muted"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />

          {/* Send Button */}
          <Button
            onClick={sendMessage}
            className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 pb-8 px-4">
        <div className="text-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2"
          >
            <Monitor className="w-4 h-4 sm:w-6 sm:h-6" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Share Screen</p>
        </div>

        <div className="text-center">
          <Link to="/session-end">
            <Button
              size="lg"
              className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-red-600 text-white hover:bg-red-700 border border-red-600 mb-2"
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
          </Link>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Disconnect</p>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2"
          >
            <Camera className="w-4 h-4 sm:w-6 sm:h-6" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Stop Camera</p>
        </div>
      </div>
    </div>
  );
}
