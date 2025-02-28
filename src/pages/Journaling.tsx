
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
          {isSubscribed && (
            <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              Premium Feature
            </span>
          )}
        </header>

        {!session ? (
          <div className="text-center py-12 bg-sage-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Sign in to begin your journaling practice</h2>
            <Button onClick={() => navigate("/auth")} className="bg-sage-600 hover:bg-sage-700">
              Sign In
            </Button>
          </div>
        ) : !isSubscribed ? (
          <div className="text-center py-12 bg-purple-50 rounded-lg border border-purple-100">
            <h2 className="text-xl font-medium mb-4 text-purple-900">
              Upgrade to Premium
            </h2>
            <p className="text-purple-700 mb-6 max-w-md mx-auto">
              The 30-Day Mindful Journaling program is a premium feature designed to help you develop a consistent journaling practice.
            </p>
            <Button 
              onClick={() => setShowPaywall(true)} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Unlock Premium Features
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
