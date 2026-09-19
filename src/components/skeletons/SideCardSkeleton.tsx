import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function SideCardSkeleton() {
  return (
    <Card>
      <div className="flex justify-between mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <div className="flex justify-between mb-4">
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-8" />
      </div>
      <div className="flex justify-between gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton className="h-6 flex-1" key={index} />
        ))}
      </div>
    </Card>
  );
}
