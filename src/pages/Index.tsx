
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

  return (
    <div className="min-h-screen">
      <AuthButtons onProfileClick={handleProfileClick} />
      <HeroSection mounted={mounted} onBeginJourney={handleBeginJourney} />

      {/* Clean Navigation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <nav className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <button
              onClick={handleMindfulnessClick}
              className="group p-6 bg-sage-50 rounded-lg transition-all duration-300 hover:bg-sage-100"
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
            {/* Add more navigation items here as needed */}
          </nav>
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
