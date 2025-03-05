
import { Card } from "@/components/ui/card";
import { Leaf, Moon, Heart, Timer } from "lucide-react";

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

export const BenefitsSection = () => {
  return (
    <section className="py-24 px-4 bg-sage-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full mb-6">
            Why Still?
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
  );
};
