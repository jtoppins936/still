
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { PaywallProvider } from "@/components/PaywallProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { JournalEntry } from "./components/JournalEntry";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PaywallProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/journal/nature-walk" element={<JournalEntry type="NATURE_WALK" title="Nature Walk Journal" />} />
              <Route path="/journal/reading-reflection" element={<JournalEntry type="READING_REFLECTION" title="Reading Reflection" />} />
              <Route path="/journal/gratitude" element={<JournalEntry type="GRATITUDE" title="Gratitude Practice" />} />
              <Route path="/journal/art-expression" element={<JournalEntry type="ART_EXPRESSION" title="Art and Expression" />} />
              <Route path="/journal/tea-ceremony" element={<JournalEntry type="TEA_CEREMONY" title="Tea Ceremony" />} />
              <Route path="/journal/sacred-music" element={<JournalEntry type="SACRED_MUSIC" title="Sacred Music" />} />
              <Route path="/journal/meditation" element={<JournalEntry type="MEDITATION" title="Meditation Session" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PaywallProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
