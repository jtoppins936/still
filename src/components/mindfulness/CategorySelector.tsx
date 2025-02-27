
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Brain } from "lucide-react";

type MindfulnessCategory = 'faith_based' | 'spiritual' | 'neutral';

interface CategorySelectorProps {
  onSelectCategory: (category: MindfulnessCategory) => void;
}

export const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-medium text-center">Choose Your Path</h2>
        <p className="text-gray-600 text-center">
          Select the approach that resonates most with you for your 30-day mindfulness journey.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 hover:border-purple-200 transition-colors cursor-pointer"
            onClick={() => onSelectCategory('faith_based')}>
            <Heart className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-medium mb-2">Faith-Based</h3>
            <p className="text-sm text-gray-600">
              Guided by scripture, prayer, and spiritual wisdom traditions.
            </p>
          </Card>

          <Card className="p-6 hover:border-sage-200 transition-colors cursor-pointer"
            onClick={() => onSelectCategory('spiritual')}>
            <Leaf className="w-8 h-8 text-sage-600 mb-4" />
            <h3 className="font-medium mb-2">Spiritual</h3>
            <p className="text-sm text-gray-600">
              Drawing from wisdom literature, nature, and universal truths.
            </p>
          </Card>

          <Card className="p-6 hover:border-blue-200 transition-colors cursor-pointer"
            onClick={() => onSelectCategory('neutral')}>
            <Brain className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-medium mb-2">Mindfulness</h3>
            <p className="text-sm text-gray-600">
              Based on neuroscience and evidence-based practices.
            </p>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
