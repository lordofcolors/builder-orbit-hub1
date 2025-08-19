import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface TranscriptEntry {
  id: string;
  type: "agent" | "user";
  content: string;
  timestamp: string;
}

export default function SessionEnd() {
  // Mock transcript data with timestamps
  const fullTranscript: TranscriptEntry[] = [
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
        "Excellent question! Hold the leash with a relaxed grip about 18 inches from the dog's collar. This gives them freedom while maintaining control.",
      timestamp: "10:31:45 AM",
    },
    {
      id: "6",
      type: "user",
      content: "That makes sense. What about when the dog pulls?",
      timestamp: "10:32:15 AM",
    },
    {
      id: "7",
      type: "agent",
      content:
        "When your dog pulls, stop walking immediately. Wait for them to look back at you, then reward with praise and continue. Consistency is key!",
      timestamp: "10:32:30 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-app-bg p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 mb-4">
            <FileText className="w-10 h-10 text-app-primary-dark" />
          </div>
          <h1 className="text-3xl font-bold text-app-text mb-2">
            Session Complete
          </h1>
          <p className="text-app-muted text-lg">
            Master Dog Walking - Session Duration: 15 minutes
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button className="bg-app-primary text-app-primary-dark hover:bg-app-primary/90 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Transcript
          </Button>
          <Link to="/">
            <Button
              variant="outline"
              className="border-app-border text-app-text hover:bg-app-border/20"
            >
              Start New Session
            </Button>
          </Link>
        </div>

        {/* Transcript */}
        <div className="bg-app-bg border border-app-border rounded-lg">
          <div className="p-6 border-b border-app-border">
            <h2 className="text-xl font-semibold text-app-text flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Session Transcript
            </h2>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {fullTranscript.map((entry) => (
                <div key={entry.id} className="flex gap-4">
                  <div className="text-xs text-app-muted font-mono w-20 flex-shrink-0 pt-1">
                    {entry.timestamp}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <span
                        className={`font-semibold text-sm ${
                          entry.type === "agent"
                            ? "text-app-agent"
                            : "text-app-user"
                        }`}
                      >
                        {entry.type === "agent" ? "Assistant:" : "You:"}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        entry.type === "agent"
                          ? "text-app-agent"
                          : "text-app-text"
                      }`}
                    >
                      {entry.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-app-bg border border-app-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-app-primary mb-1">
              15:42
            </div>
            <div className="text-sm text-app-muted">Session Duration</div>
          </div>
          <div className="bg-app-bg border border-app-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-app-primary mb-1">12</div>
            <div className="text-sm text-app-muted">Messages Exchanged</div>
          </div>
          <div className="bg-app-bg border border-app-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-app-primary mb-1">3</div>
            <div className="text-sm text-app-muted">Key Topics Covered</div>
          </div>
        </div>
      </div>
    </div>
  );
}
