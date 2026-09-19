import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AdditionalInfoSkeleton() {
  return (
    <Card title="Additional info">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex justify-between mb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </Card>
  );
}
