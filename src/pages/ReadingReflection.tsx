
import { ReadingReflectionProgram } from "@/components/reading-reflection/ReadingReflectionProgram";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ReadingReflection = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Reading Reflection Journal</h1>
          <p className="text-gray-600">
            Deepen your understanding of texts through guided daily reflection
          </p>
        </header>

        {!session ? (
          <div className="text-center py-12 bg-sage-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Sign in to begin your reading reflection practice</h2>
            <Button onClick={() => navigate("/auth")} className="bg-sage-600 hover:bg-sage-700">
              Sign In
            </Button>
          </div>
        ) : (
          <ReadingReflectionProgram />
        )}
      </div>
    </div>
  );
};

export default ReadingReflection;
