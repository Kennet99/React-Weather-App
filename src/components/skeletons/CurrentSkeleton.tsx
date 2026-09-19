import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function CurrentSkeleton() {
  return (
    <>
      <Card title="Current weather">
        <div className="flex flex-row gap-12">
          <div
            className="flex flex-col gap-4 items-start"
            //   key={data.current.dt}
          >
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32" />
            {/* <p className="text-lg">
                Feels like: {Math.round(data.current.feels_like)}°C
              </p> */}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Feels like:
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-row gap-2">
          Local time:
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-row gap-2">
          Humidity:
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-row gap-2">
          Wind speed:
          <Skeleton className="h-6 w-24" />
        </div>
      </Card>
    </>
  );
}
