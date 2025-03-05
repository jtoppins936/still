
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
  const { handleSubscribe } = usePaywall();

  const onSubscribe = async () => {
    await handleSubscribe();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Premium Feature (Testing Mode)</DialogTitle>
          <DialogDescription>
            All premium features are currently accessible for testing. In production, these features would require a subscription:
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
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Continue Testing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
