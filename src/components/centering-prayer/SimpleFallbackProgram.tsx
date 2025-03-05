
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const SimpleFallbackProgram: React.FC = () => {
  const { toast } = useToast();
  
  const handleButtonClick = () => {
    toast({
      title: "Centering Prayer",
      description: "This feature is currently under maintenance. Please check back later.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-lg">
        <h2 className="text-xl font-semibold text-rose-700 mb-3">
          Centering Prayer Practice
        </h2>
        <p className="text-gray-600 mb-4">
          Centering Prayer is a method of silent prayer that prepares us to 
          experience God's presence within us, closer than breathing, closer 
          than thinking, closer than consciousness itself.
        </p>
        <p className="text-gray-600 mb-4">
          The focus phrase for today is: "Be still and know that I am God."
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Choose a sacred word as the symbol of your intention to consent to God's presence</li>
          <li>Sitting comfortably with eyes closed, settle briefly and silently introduce the sacred word</li>
          <li>When you become aware of thoughts, return ever-so-gently to the sacred word</li>
          <li>At the end of the prayer period, remain in silence with eyes closed for a couple of minutes</li>
        </ol>
        <Button 
          onClick={handleButtonClick}
          className="bg-rose-600 hover:bg-rose-700 w-full mt-4"
        >
          Begin Practice (20 minutes)
        </Button>
      </div>
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium text-rose-700 mb-3">Reflection</h3>
        <p className="text-gray-600 mb-4">
          After your prayer time, reflect on your experience. What brought you back to the present moment?
          How did it feel to let go of your thoughts and rest in God's presence?
        </p>
        <textarea 
          className="w-full p-3 border border-gray-300 rounded-md" 
          rows={5}
          placeholder="Write your reflection here..."
        ></textarea>
        <Button 
          onClick={handleButtonClick}
          className="bg-rose-600 hover:bg-rose-700 mt-4"
        >
          Save Reflection
        </Button>
      </div>
    </div>
  );
};
