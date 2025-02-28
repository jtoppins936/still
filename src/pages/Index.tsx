
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

      {/* Clean Navigation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleMindfulnessClick}
            className="group p-6 bg-sage-50 rounded-lg transition-all duration-300 hover:bg-sage-100 w-full sm:w-80"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center group-hover:bg-sage-300 transition-colors">
                <svg
                  className="w-6 h-6 text-sage-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-medium text-gray-900">Mindfulness Program</h3>
                <p className="text-sm text-gray-600">
                  Start your 30-day mindfulness journey
                </p>
              </div>
            </div>
          </button>
          
          <button
            onClick={handleJournalingClick}
            className="group p-6 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100 w-full sm:w-80"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center group-hover:bg-purple-300 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-medium text-gray-900">Journaling Program</h3>
                <p className="text-sm text-gray-600">
                  Begin your 30-day writing practice
                </p>
              </div>
            </div>
          </button>
        </div>
      </section>

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
