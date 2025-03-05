
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
};
