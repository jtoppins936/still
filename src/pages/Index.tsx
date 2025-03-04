
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";
import { DailyChallenges } from "@/components/DailyChallenges";
import { SabbathPlanner } from "@/components/SabbathPlanner";
import { DeclutterSection } from "@/components/DeclutterSection";
import { AuthButtons } from "@/components/index/AuthButtons";
import { HeroSection } from "@/components/index/HeroSection";
import { BenefitsSection } from "@/components/index/BenefitsSection";
import { CTASection } from "@/components/index/CTASection";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { session } = useAuth();
  const { isSubscribed } = usePaywall();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBeginJourney = () => {
    if (!session) {
      navigate("/auth");
      return;
    }
    
    if (!isSubscribed) {
      setShowPaywall(true);
      return;
    }

    navigate("/profile");
  };

  const handleProfileClick = () => {
    if (!isSubscribed) {
      setShowPaywall(true);
      return;
    }
    navigate("/profile");
  };

  // These functions are still needed for the navigation elsewhere in the app
  const handleMindfulnessClick = () => {
    navigate("/mindfulness");
  };
  
  const handleJournalingClick = () => {
    navigate("/journaling");
  };

  return (
    <div className="min-h-screen">
      <div className="pt-8 pb-4 flex justify-center">
        <img 
          src="/lovable-uploads/d96c4875-c3cb-496c-a2c6-efcd3450efcc.png" 
          alt="STILL Logo" 
          className="h-48 w-auto"
        />
      </div>
      <AuthButtons onProfileClick={handleProfileClick} />
      <HeroSection mounted={mounted} onBeginJourney={handleBeginJourney} />

      {/* Remove the Clean Navigation Section with the two program links */}

      {/* Daily Challenge Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm bg-sand-100 text-sand-700 rounded-full mb-6">
            Daily Practice
          </span>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-gray-900">
            Today's Invitation to Slowness
          </h2>
          <DailyChallenges />
        </div>
      </section>

      {/* Declutter Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full mb-6">
              Mindful Reduction
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">
              Daily Declutter Challenge
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Choose one thing to let go of today, whether it's a physical item or a commitment that no longer serves you.
            </p>
          </div>
          <DeclutterSection />
        </div>
      </section>

      {/* Sabbath Planner Section */}
      <section className="py-24 px-4 bg-sage-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full mb-6">
              Weekly Rest
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Your Digital Sabbath
            </h2>
          </div>
          <SabbathPlanner />
        </div>
      </section>

      <BenefitsSection />
      <CTASection onBeginJourney={handleBeginJourney} />

      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default Index;
