import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiInputToggle from "@/components/EmojiInputToggle";
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

interface Reaction {
  id: string;
  emoji: string;
  timestamp: string;
}

export default function Conversation() {
  const [transcriptExpanded, setTranscriptExpanded] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    {
      id: "1",
      type: "agent",
      content: "Welcome to your learning session! I'm here to help you master dog walking techniques.",
      timestamp: "10:30:15 AM"
    },
    {
      id: "2",
      type: "user",
      content: "Thank you! I'm excited to learn about proper leash handling.",
      timestamp: "10:30:45 AM"
    },
    {
      id: "3",
      type: "agent",
      content: "Great! Let's start with the basics. The key to effective dog walking is maintaining consistent communication with your dog through the leash.",
      timestamp: "10:31:02 AM"
    },
    {
      id: "4",
      type: "user",
      content: "How do I know if I'm holding the leash correctly?",
      timestamp: "10:31:30 AM"
    },
    {
      id: "5",
      type: "agent",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis lectus, tristique at dolor et, luctus sagittis erat. Vivamus eu tempor massa.",
      timestamp: "10:31:45 AM"
    }
  ]);

  const handleMessageSend = (message: string) => {
    const newMessage: TranscriptMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTranscript([...transcript, newMessage]);
  };

  const handleReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: Date.now().toString(),
      emoji: emoji,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setReactions([...reactions, newReaction]);
  };

  return (
    <div className="flex flex-col h-screen bg-app-bg">
      {/* Agent Avatar */}
      <div className="flex justify-center py-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-lg opacity-60 animate-pulse"></div>
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F13a19102fc4945c783f457401a61da3a?format=webp&width=800"
              alt="Voice Agent Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div className="flex justify-center mb-6 px-4">
        <div className="relative">
          <div className="w-80 h-48 sm:w-[400px] sm:h-[225px] bg-gray-800 rounded-lg overflow-hidden border border-app-border">
            {/* Live video feed */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F10c3ed330bcf4e15bf2a52fe283ec99f?format=webp&width=800"
              alt="Live Video Feed"
              className="w-full h-full object-cover"
            />
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
        <div className={`w-full max-w-[600px] border border-app-border rounded-lg bg-app-bg transition-all duration-300 relative cursor-pointer ${
          transcriptExpanded ? 'h-80' : 'h-16 sm:h-20'
        }`}
        onClick={() => setTranscriptExpanded(!transcriptExpanded)}
        >
          {/* Expand/Collapse indicator */}
          <div className="absolute top-3 right-3 z-10">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setTranscriptExpanded(!transcriptExpanded);
              }}
              className="w-6 h-6 p-0 bg-app-border/50 text-app-text hover:bg-app-border rounded-full"
            >
              {transcriptExpanded ? (
                <Minus className="w-3 h-3" />
              ) : (
                <Plus className="w-3 h-3" />
              )}
            </Button>
          </div>

          <div className="p-4 sm:p-6 h-full">
            {transcriptExpanded ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-app-text">Live Transcript</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {transcript.map((message) => (
                    <div key={message.id} className="flex gap-2">
                      <div className="text-xs text-app-muted font-mono w-16 flex-shrink-0 pt-1">
                        {message.timestamp.split(' ')[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className={`font-medium ${
                            message.type === 'agent' ? 'text-app-agent' : 'text-app-user'
                          }`}>
                            {message.type === 'agent' ? 'Assistant:' : 'You:'}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${
                          message.type === 'agent' ? 'text-app-agent' : 'text-app-text'
                        }`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Show recent reactions */}
                  {reactions.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      <div className="text-xs text-app-muted font-mono w-16 flex-shrink-0 pt-1">
                        {reactions[reactions.length - 1]?.timestamp.split(' ')[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-app-user">Your Reaction:</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {reactions.slice(-3).map((reaction) => (
                            <span key={reaction.id} className="text-lg">{reaction.emoji}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center h-full pr-8">
                <div className="flex-1">
                  <span className="text-app-agent text-sm">
                    A: {transcript[transcript.length - 1]?.content || 'Start conversation...'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emoji Input Toggle Area */}
      <EmojiInputToggle
        onMessageSend={handleMessageSend}
        onReaction={handleReaction}
      />

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 pb-8 px-4 bg-app-bg">
        <div className="text-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2 p-0 flex items-center justify-center"
          >
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Share Screen</p>
        </div>

        <div className="text-center">
          <Link to="/session-end">
            <Button
              size="lg"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white hover:bg-red-700 border border-red-600 mb-2 p-0 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Disconnect</p>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2 p-0 flex items-center justify-center"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium">Stop Camera</p>
        </div>
      </div>
    </div>
  );
}
