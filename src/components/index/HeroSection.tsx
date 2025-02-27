
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

interface HeroSectionProps {
  mounted: boolean;
  onBeginJourney: () => void;
}

export const HeroSection = ({ mounted, onBeginJourney }: HeroSectionProps) => {
  const { session } = useAuth();

  return (
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
          onClick={onBeginJourney}
          className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
        >
          {session ? "Continue Your Journey" : "Begin Your Journey"}
        </Button>
      </div>
    </section>
  );
};
