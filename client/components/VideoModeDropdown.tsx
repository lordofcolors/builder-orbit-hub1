import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users, User } from "lucide-react";

export type VideoMode = "single" | "dual" | "quad";

interface VideoModeDropdownProps {
  currentMode: VideoMode;
  onModeChange: (mode: VideoMode) => void;
}

export default function VideoModeDropdown({
  currentMode,
  onModeChange,
}: VideoModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    {
      value: "single" as VideoMode,
      label: "1 on 1",
      icon: <User className="w-4 h-4" />,
      description: "Single user session",
    },
    {
      value: "dual" as VideoMode,
      label: "2 Users",
      icon: <Users className="w-4 h-4" />,
      description: "Split view conversation",
    },
    {
      value: "quad" as VideoMode,
      label: "4 Users",
      icon: <Users className="w-4 h-4" />,
      description: "Group conversation",
    },
  ];

  const currentModeData = modes.find((mode) => mode.value === currentMode);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2 px-3 py-2 text-sm border-app-border text-app-text hover:bg-app-border/20"
      >
        {currentModeData?.icon}
        <span className="hidden sm:inline">{currentModeData?.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-app-bg border border-app-border rounded-lg shadow-lg z-50">
          <div className="p-1">
            {modes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => {
                  onModeChange(mode.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-app-border/20 transition-colors ${
                  currentMode === mode.value
                    ? "bg-app-border/20 text-app-primary"
                    : "text-app-text"
                }`}
              >
                {mode.icon}
                <div className="text-left">
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-xs text-app-muted">
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
