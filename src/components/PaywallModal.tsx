
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePaywall } from "./PaywallProvider";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const { handleSubscribe, price } = usePaywall();

  const onSubscribe = async () => {
    await handleSubscribe();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Premium Feature</DialogTitle>
          <DialogDescription>
            Unlock all premium features for just {price}:
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Blocking Statistics</li>
              <li>Meditation Sessions</li>
              <li>Mindful Journaling</li>
              <li>Centering Prayer</li>
              <li>Sacred Rituals</li>
              <li>And more reflective activities!</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Not Now</Button>
          <Button onClick={onSubscribe}>Subscribe for {price}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
