import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('mov-loading-seen');
    
    if (!hasSeenLoading) {
      setShowLoading(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('mov-loading-seen', 'true');
    setShowLoading(false);
    setIsInitialized(true);
  };

  if (showLoading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingAnimation onComplete={handleLoadingComplete} />
      </div>
    );
  }

  if (!isInitialized) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
