
import { SacredRitualsProgram } from "@/components/sacred-rituals/SacredRitualsProgram";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";

export default function SacredRitualsPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <main className="container py-6 px-4 mx-auto max-w-4xl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">30-Day Sacred Rituals Journey</h1>
          <p className="text-gray-600">
            Daily practices to help you slow down and connect with the present moment
          </p>
          <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
            Testing Mode - Premium Feature Available
          </span>
        </header>

        {!session ? (
          <div className="text-center py-12 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Sign in to begin your sacred rituals journey</h2>
            <Button onClick={() => navigate("/auth")} className="bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </div>
        ) : (
          <SacredRitualsProgram />
        )}
      </div>
      
      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </main>
  );
}
