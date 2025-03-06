
import { JournalingProgram } from "@/components/journaling/JournalingProgram";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";

const Journaling = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Mindful Journaling</h1>
          <p className="text-gray-600">
            Deepen your mindfulness practice through guided daily journaling
          </p>
          <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
            Premium Feature
          </span>
        </header>

        {!session ? (
          <div className="text-center py-12 bg-sage-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Sign in to begin your journaling practice</h2>
            <Button onClick={() => navigate("/auth")} className="bg-sage-600 hover:bg-sage-700">
              Sign In
            </Button>
          </div>
        ) : !isSubscribed ? (
          <div className="text-center py-12 bg-sage-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Unlock Mindful Journaling with a Premium Subscription</h2>
            <p className="mb-6 text-gray-600">
              Mindful Journaling is a premium feature that helps you develop mindfulness through writing.
            </p>
            <Button onClick={() => setShowPaywall(true)} className="bg-sage-600 hover:bg-sage-700">
              Unlock Premium
            </Button>
          </div>
        ) : (
          <JournalingProgram />
        )}
      </div>
      
      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </div>
  );
};

export default Journaling;
