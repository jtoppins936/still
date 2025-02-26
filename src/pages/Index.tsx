import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Moon, Heart, Timer, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { DailyChallenges } from "@/components/DailyChallenges";
import { SabbathPlanner } from "@/components/SabbathPlanner";
import { DeclutterSection } from "@/components/DeclutterSection";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Goodbye",
        description: "You have been signed out.",
      });
      navigate("/auth");
    }
  };

  const benefits = [
    {
      icon: <Leaf className="w-6 h-6 text-sage-600" />,
      title: "Mindful Living",
      description: "Cultivate awareness and presence in your daily life",
    },
    {
      icon: <Moon className="w-6 h-6 text-sage-600" />,
      title: "Digital Sabbath",
      description: "Create space for rest and reflection",
    },
    {
      icon: <Heart className="w-6 h-6 text-sage-600" />,
      title: "Inner Peace",
      description: "Find tranquility through intentional practices",
    },
    {
      icon: <Timer className="w-6 h-6 text-sage-600" />,
      title: "Slow Down",
      description: "Embrace a more peaceful pace of life",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Auth button and profile link */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-4">
        {session ? (
          <>
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              className="bg-white"
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate("/auth")}
            variant="outline"
            className="bg-white"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-sand-50 -z-10" />
        <div className={`text-center max-w-3xl mx-auto ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full mb-6">
            Welcome to Still
          </span>
          <h1 className="text-4xl md:text-6xl font-light mb-6 text-gray-900">
            Find peace in a hurried world
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Embrace minimalism, eliminate hurry, and cultivate inner peace through intentional living.
          </p>
          <Button
            onClick={() => !session && navigate("/auth")}
            className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
          >
            {session ? "Begin Your Journey" : "Sign Up to Begin"}
          </Button>
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

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-sage-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full mb-6">
              Why Still
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Cultivate a Life of Intention
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-sage-50 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-sand-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us in creating a more intentional and peaceful way of living.
          </p>
          <Button
            onClick={() => !session && navigate("/auth")}
            className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
          >
            {session ? "Continue Your Journey" : "Sign Up Now"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
