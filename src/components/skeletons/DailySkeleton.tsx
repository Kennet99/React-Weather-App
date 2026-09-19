import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function DailySkeleton() {
  return (
    <Card title="Daily forecast">
      <div className="flex flex-row gap-12 overflow-x-scroll scrollbar-gutter-stable">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="flex flex-col items-center gap-2 min-w-20" key={index}>
            <Skeleton className="h-7 w-16" />
            <Skeleton className="size-20 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}
