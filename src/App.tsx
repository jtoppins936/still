
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { PaywallProvider, usePaywall } from "@/components/PaywallProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { JournalEntry, type JournalEntryProps } from "@/components/JournalEntry";
import { useAuth } from "@/components/AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const { isSubscribed } = usePaywall();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isSubscribed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Wrapper component to handle passing props to JournalEntry based on route params
const JournalEntryWrapper = () => {
  const { type } = useParams<{ type: string }>();
  
  // Map route parameters to component props
  const getJournalProps = (type: string | undefined): JournalEntryProps => {
    const typeMap: Record<string, JournalEntryProps> = {
      "nature-walk": {
        type: "NATURE_WALK",
        title: "Nature Walk Journal"
      },
      "reading-reflection": {
        type: "READING_REFLECTION",
        title: "Reading Reflection"
      },
      "gratitude": {
        type: "GRATITUDE",
        title: "Gratitude Practice"
      },
      "art-expression": {
        type: "ART_EXPRESSION",
        title: "Art and Expression"
      },
      "tea-ceremony": {
        type: "TEA_CEREMONY",
        title: "Tea Ceremony"
      },
      "sacred-music": {
        type: "SACRED_MUSIC",
        title: "Sacred Music"
      },
      "meditation": {
        type: "MEDITATION",
        title: "Meditation Session"
      }
    };

    return typeMap[type || ""] || { type: "GENERAL", title: "Journal Entry" };
  };

  const journalProps = getJournalProps(type);

  return <JournalEntry {...journalProps} />;
};

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
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/journal/:type" 
                element={
                  <ProtectedRoute>
                    <JournalEntryWrapper />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PaywallProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
