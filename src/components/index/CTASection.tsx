
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

interface CTASectionProps {
  onBeginJourney: () => void;
}

export const CTASection = ({ onBeginJourney }: CTASectionProps) => {
  const { session } = useAuth();

  return (
    <section className="py-24 px-4 bg-sand-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join us in creating a more intentional and peaceful way of living.
        </p>
        <Button
          onClick={onBeginJourney}
          className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
        >
          {session ? "Continue Your Journey" : "Sign Up Now"}
        </Button>
      </div>
    </section>
  );
};
