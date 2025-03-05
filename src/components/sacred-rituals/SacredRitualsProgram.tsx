
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/AuthProvider";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";
import { SacredRitualsPrompt } from "./SacredRitualsPrompt";
import { SacredRitualsHeader } from "./SacredRitualsHeader";
import { useSacredRitualsData } from "./hooks/useSacredRitualsData";
import { useSaveReflection } from "./SacredRitualsSaveReflection";

export const SacredRitualsProgram = () => {
  const { session } = useAuth();
  const { isSubscribed } = usePaywall();
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(1);
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Custom hook for data fetching
  const { programData, userProgress, isLoading, refetchProgress } = useSacredRitualsData();
  
  // Custom hook for saving reflections
  const { saveReflection } = useSaveReflection();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
      return;
    }
    
    if (!isSubscribed) {
      setShowPaywall(true);
    }
  }, [session, isSubscribed, navigate]);

  useEffect(() => {
    if (userProgress) {
      setCurrentDay(userProgress.completed ? 30 : Math.min(30, userProgress.scheduled_for ? new Date(userProgress.scheduled_for).getDate() : 1));
    }
  }, [userProgress]);

  const handleSubmitReflection = async () => {
    if (!session?.user?.id) return;
    
    await saveReflection({
      userId: session.user.id,
      programData,
      userProgress,
      reflection,
      currentDay,
      onSuccess: () => {
        setSubmitted(true);
        refetchProgress();
      }
    });
  };

  const handleNextDay = () => {
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
      setReflection("");
      setSubmitted(false);
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setReflection("");
      setSubmitted(false);
    }
  };

  if (!isSubscribed) {
    return <PaywallModal isOpen={showPaywall} onClose={() => navigate('/')} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  const currentPrompt = programData?.find(prompt => prompt.day === currentDay);

  return (
    <div className="space-y-6">
      <SacredRitualsHeader 
        currentDay={currentDay}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        submitted={submitted}
      />

      {currentPrompt && (
        <SacredRitualsPrompt
          prompt={currentPrompt}
          day={currentDay}
          reflection={reflection}
          onReflectionChange={setReflection}
          onSubmit={handleSubmitReflection}
          submitted={submitted}
        />
      )}
    </div>
  );
};
