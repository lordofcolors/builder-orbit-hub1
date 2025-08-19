import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PreCall from "./pages/PreCall";
import Conversation from "./pages/Conversation";
import Fullscreen from "./pages/Fullscreen";
import SessionEnd from "./pages/SessionEnd";
import NotFound from "./pages/NotFound";
import Layout, { VideoModeProvider } from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VideoModeProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/pre-call"
            element={
              <Layout>
                <PreCall />
              </Layout>
            }
          />
          <Route
            path="/conversation"
            element={
              <Layout>
                <Conversation />
              </Layout>
            }
          />
          <Route path="/fullscreen" element={<Fullscreen />} />
          <Route
            path="/session-end"
            element={
              <Layout>
                <SessionEnd />
              </Layout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VideoModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
