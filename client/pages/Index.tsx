import { Button } from "@/components/ui/button";
import { Mic, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-app-bg p-4 sm:p-8">
        {/* Agent Avatar */}
        <div className="mb-8 sm:mb-16">
          <div className="relative">
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-app-primary to-cyan-400 blur-xl opacity-50 animate-pulse"></div>

            {/* Agent avatar */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F13a19102fc4945c783f457401a61da3a?format=webp&width=800"
                alt="Voice Agent Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Preview Window */}
        <div className="mb-6 sm:mb-8 relative">
          <div className="w-80 h-48 sm:w-96 sm:h-56 bg-gray-800 rounded-lg overflow-hidden border-2 border-app-border relative">
            {/* Video feed preview */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9588cc2e48046eda97120fbe07da119%2F10c3ed330bcf4e15bf2a52fe283ec99f?format=webp&width=800"
              alt="Camera Preview"
              className="w-full h-full object-cover"
            />

            {/* Preview indicator */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-black/50 rounded-full text-xs text-white">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Camera Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 sm:gap-8">
          <div className="text-center">
            <Link to="/conversation">
              <Button
                size="lg"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-3"
              >
                <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
              </Button>
            </Link>
            <p className="text-xs uppercase tracking-wider text-app-text font-medium">
              Connect
            </p>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-app-border text-app-text hover:bg-app-muted/20 border border-app-border mb-3"
            >
              <Camera className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>
            <p className="text-xs uppercase tracking-wider text-app-text font-medium">
              Personalize
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
