import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiInputToggle from "@/components/EmojiInputToggle";
import VideoFeed from "@/components/VideoFeed";
import { useVideoMode } from "@/components/Layout";
import {
  Monitor,
  X,
  Camera,
  Minus,
  Plus,
  Maximize,
  Send,
  Mic,
  MicOff,
} from "lucide-react";
import { Link } from "react-router-dom";

interface TranscriptMessage {
  id: string;
  type: "agent" | "user";
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
  const [isAgentMuted, setIsAgentMuted] = useState(false);
  const [isUserMuted, setIsUserMuted] = useState(false);
  const { videoMode } = useVideoMode();
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    {
      id: "1",
      type: "agent",
      content:
        "Welcome to your learning session! I'm here to help you master dog walking techniques.",
      timestamp: "10:30:15 AM",
    },
    {
      id: "2",
      type: "user",
      content: "Thank you! I'm excited to learn about proper leash handling.",
      timestamp: "10:30:45 AM",
    },
    {
      id: "3",
      type: "agent",
      content:
        "Great! Let's start with the basics. The key to effective dog walking is maintaining consistent communication with your dog through the leash.",
      timestamp: "10:31:02 AM",
    },
    {
      id: "4",
      type: "user",
      content: "How do I know if I'm holding the leash correctly?",
      timestamp: "10:31:30 AM",
    },
    {
      id: "5",
      type: "agent",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis lectus, tristique at dolor et, luctus sagittis erat. Vivamus eu tempor massa.",
      timestamp: "10:31:45 AM",
    },
  ]);

  const handleMessageSend = (message: string) => {
    const newMessage: TranscriptMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTranscript([...transcript, newMessage]);
  };

  const handleReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: Date.now().toString(),
      emoji: emoji,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setReactions([...reactions, newReaction]);
  };

  // Special layout for 4-user mode
  if (videoMode === "quad") {
    return (
      <div className="h-screen bg-app-bg flex overflow-hidden">
        {/* Left side - Avatar, Videos and controls */}
        <div className="w-2/3 flex flex-col bg-app-bg">
          {/* Agent Avatar */}
          <div className="flex justify-center py-1 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-lg opacity-60 animate-pulse"></div>
              <div className="relative w-28 h-28 rounded-full overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F13a19102fc4945c783f457401a61da3a?format=webp&width=800"
                  alt="Voice Agent Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Agent Mute Toggle */}
              <Button
                onClick={() => setIsAgentMuted(!isAgentMuted)}
                size="sm"
                className="absolute top-0 -right-1 w-6 h-6 p-0 bg-app-bg/80 text-app-agent hover:bg-app-bg/90 rounded-full border border-app-border"
              >
                {isAgentMuted ? (
                  <MicOff className="w-2 h-2" />
                ) : (
                  <Mic className="w-2 h-2" />
                )}
              </Button>
            </div>
          </div>

          {/* Video Feed */}
          <div className="flex items-center justify-center py-3">
            <VideoFeed
              mode={videoMode}
              transcriptExpanded={false}
              isUserMuted={isUserMuted}
              setIsUserMuted={setIsUserMuted}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-6 py-4 px-4 flex-shrink-0 bg-app-bg">
            <div className="flex flex-col items-center">
              <Button
                size="lg"
                className="w-10 h-10 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-1 p-0 flex items-center justify-center"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
                Share Screen
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Link to="/session-end">
                <Button
                  size="lg"
                  className="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 border border-red-600 mb-1 p-0 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
                Disconnect
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Button
                size="lg"
                className="w-10 h-10 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-1 p-0 flex items-center justify-center"
              >
                <Camera className="w-4 h-4" />
              </Button>
              <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
                Stop Camera
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Chat */}
        <div className="w-1/3 border-l border-app-border flex flex-col bg-app-bg h-full">
          {/* Chat header */}
          <div className="p-3 border-b border-app-border flex-shrink-0 bg-app-bg">
            <h3 className="text-lg font-medium text-app-text">Live Chat</h3>
          </div>

          {/* Chat messages - Fixed height to ensure input is always visible */}
          <div className="h-[34rem] overflow-y-auto p-3 space-y-3 bg-app-bg">
            {transcript.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "agent" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "agent" ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${
                      message.type === "agent"
                        ? "bg-app-border text-app-agent"
                        : "bg-app-primary text-app-bg"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div
                    className={`text-xs text-app-muted font-mono mt-1 ${
                      message.type === "agent" ? "text-left" : "text-right"
                    }`}
                  >
                    {message.timestamp.split(" ")[0]}
                  </div>
                </div>
              </div>
            ))}

            {/* Show recent reactions */}
            {reactions.length > 0 && (
              <div className="flex justify-end">
                <div className="max-w-[85%] text-right">
                  <div className="bg-app-primary text-app-bg rounded-lg p-2">
                    <div className="flex gap-1 justify-end">
                      {reactions.slice(-3).map((reaction) => (
                        <span key={reaction.id} className="text-lg">
                          {reaction.emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-app-muted font-mono mt-1 text-right">
                    {reactions[reactions.length - 1]?.timestamp.split(" ")[0]}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-app-border flex-shrink-0 bg-app-bg">
            <EmojiInputToggle
              onMessageSend={handleMessageSend}
              onReaction={handleReaction}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default layout for single and dual modes
  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      {/* Agent Avatar */}
      <div className="flex justify-center py-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-lg opacity-60 animate-pulse"></div>
          <div
            className={`relative rounded-full overflow-hidden transition-all duration-300 ${
              transcriptExpanded ? "w-20 h-20" : "w-24 h-24 sm:w-28 sm:h-28"
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F13a19102fc4945c783f457401a61da3a?format=webp&width=800"
              alt="Voice Agent Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Agent Mute Toggle */}
          <Button
            onClick={() => setIsAgentMuted(!isAgentMuted)}
            size="sm"
            className="absolute top-0 -right-1 w-6 h-6 p-0 bg-app-bg/80 text-app-agent hover:bg-app-bg/90 rounded-full border border-app-border"
          >
            {isAgentMuted ? (
              <MicOff className="w-2 h-2" />
            ) : (
              <Mic className="w-2 h-2" />
            )}
          </Button>
        </div>
      </div>

      {/* Video Feed */}
      <VideoFeed
        mode={videoMode}
        transcriptExpanded={transcriptExpanded}
        isUserMuted={isUserMuted}
        setIsUserMuted={setIsUserMuted}
      />

      {/* Transcript Area */}
      <div className="flex justify-center mb-4 px-4">
        <div
          className={`w-full max-w-[600px] border border-app-border rounded-lg bg-app-bg transition-all duration-300 relative cursor-pointer ${
            transcriptExpanded ? "h-64 sm:h-80" : "h-16 sm:h-20"
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
                  <h3 className="text-sm font-medium text-app-text">
                    Live Transcript
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {transcript.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "agent"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.type === "agent" ? "text-left" : "text-right"
                        }`}
                      >
                        <div className="text-sm mb-1">
                          <span
                            className={`font-medium ${
                              message.type === "agent"
                                ? "text-app-agent"
                                : "text-app-primary"
                            }`}
                          >
                            {message.type === "agent" ? "Assistant:" : "You:"}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            message.type === "agent"
                              ? "text-app-agent"
                              : "text-app-primary"
                          }`}
                        >
                          {message.content}
                        </p>
                        <div
                          className={`text-xs text-app-muted font-mono mt-1 ${
                            message.type === "agent"
                              ? "text-left"
                              : "text-right"
                          }`}
                        >
                          {message.timestamp.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Show recent reactions */}
                  {reactions.length > 0 && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] text-right">
                        <div className="text-sm mb-1">
                          <span className="font-medium text-app-primary">
                            Your Reaction:
                          </span>
                        </div>
                        <div className="flex gap-1 justify-end">
                          {reactions.slice(-3).map((reaction) => (
                            <span key={reaction.id} className="text-lg">
                              {reaction.emoji}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-app-muted font-mono mt-1 text-right">
                          {
                            reactions[reactions.length - 1]?.timestamp.split(
                              " ",
                            )[0]
                          }
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
                    A:{" "}
                    {transcript[transcript.length - 1]?.content ||
                      "Start conversation..."}
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
      <div className="flex justify-center gap-4 sm:gap-8 py-2 px-4 bg-app-bg">
        <div className="flex flex-col items-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2 p-0 flex items-center justify-center"
          >
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
            Share Screen
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/session-end">
            <Button
              size="lg"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white hover:bg-red-700 border border-red-600 mb-2 p-0 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
            Disconnect
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Button
            size="lg"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-2 p-0 flex items-center justify-center"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-xs uppercase tracking-wider text-app-text font-medium text-center">
            Stop Camera
          </p>
        </div>
      </div>
    </div>
  );
}
