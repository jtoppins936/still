
import { GratitudePracticeProgram } from "@/components/gratitude-practice/GratitudePracticeProgram";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";

const GratitudePractice = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Gratitude Practice Journal</h1>
          <p className="text-gray-600">
            Cultivate an attitude of gratitude through 30 days of guided reflection
          </p>
          {isSubscribed && (
            <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              Premium Feature
            </span>
          )}
        </header>

        {!session ? (
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Sign in to begin your gratitude practice</h2>
            <Button onClick={() => navigate("/auth")} className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </div>
        ) : !isSubscribed ? (
          <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-xl font-medium mb-4 text-blue-900">
              Upgrade to Premium
            </h2>
            <p className="text-blue-700 mb-6 max-w-md mx-auto">
              The 30-Day Gratitude Practice Journal is a premium feature designed to help you develop a deeper appreciation for the gifts in your daily life.
            </p>
            <Button 
              onClick={() => setShowPaywall(true)} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Unlock Premium Features
            </Button>
          </div>
        ) : (
          <GratitudePracticeProgram />
        )}
      </div>
      
      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </div>
  );
};

export default GratitudePractice;
