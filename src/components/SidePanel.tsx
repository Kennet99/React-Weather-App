import { Suspense } from "react";
import { getAirPollution } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coords } from "../types";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import { Skeleton } from "./ui/skeleton";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Info, PanelRightClose } from "lucide-react";
import SideCardSkeleton from "./skeletons/SideCardSkeleton";

type SidePanelProps = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SidePanel({
  coords: { lat, lon },
  isSidePanelOpen,
  setIsSidePanelOpen,
}: SidePanelProps) {
  //   const { isSidePanelOpen, setIsSidePanelOpen } = {
  //     isSidePanelOpen,
  //     setIsSidePanelOpen,
  //   };

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-80 shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-auto transition-transform duration-300",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
        <PanelRightClose />
      </button>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <SkeletonHeading />
            {Array.from({ length: 6 }, (_, index) => (
              <SideCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <AirPollution lat={lat} lon={lon} />
      </Suspense>
    </div>
  );
}

function SkeletonHeading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-12 w-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="size-5 rounded-full" />
      </div>
    </div>
  );
}

function AirPollution({ lat, lon }: Coords) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", lat, lon],
    queryFn: () => getAirPollution({ lat, lon }),
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <h1 className="text-3xl font-semibold">Air pollution</h1>
        <h2 className="text-5xl font-semibold">{data?.list[0].main.aqi}</h2>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">AQI</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                {" "}
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* Use Object.entries to create an iterable as components is an object */}
        {Object.entries(data?.list[0].components ?? {}).map(([key, value]) => {
          const pollutant =
            airQualityRanges[
              key.toUpperCase() as keyof typeof airQualityRanges
            ];

          const max = Math.max(pollutant["Very Poor"].min, value);

          //   Loop over the pollutant levels to determine the current level
          const currentLevel = (() => {
            for (const [level, range] of Object.entries(pollutant)) {
              if (
                value >= range.min &&
                (range.max === undefined || value <= range.max)
              )
                return level;
            }
            return "Very Poor";
          })();

          const qualityColour = (() => {
            switch (currentLevel) {
              case "Good":
                return "bg-green-500 text-white";
              case "Fair":
                return "bg-blue-500 text-white";
              case "Moderate":
                return "bg-yellow-500 text-white";
              case "Poor":
                return "bg-orange-500 text-white";
              case "Very Poor":
                return "bg-red-500 text-white";
              default:
                return "bg-muted text-muted-foreground";
            }
          })();

          return (
            //   <div key={key} className="flex justify-between">
            //     <span>{key}</span>
            //     <span>{value}</span>
            //   </div>
            <Card
              key={key}
              childrenClassName="flex flex-col gap-4"
              className="gap-4!"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium capitalize">{key}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Concentration of{" "}
                        {pollutantNameMapping[key.toUpperCase() as Pollutant]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-lg font-semibold">{value}</span>
              </div>
              <Slider min={0} max={max} value={[value]} disabled />
              <div className="flex justify-between">
                <p>{0}</p>
                <p>{max}</p>
              </div>
              <div className="flex gap-1">
                {/* Render the color-coded quality levels for the pollutant */}
                {Object.keys(pollutant).map((quality) => (
                  <span
                    key={quality}
                    className={clsx(
                      "flex-1 px-1 py-1 rounded-md text-center text-[10px] font-medium whitespace-nowrap",
                      quality === currentLevel
                        ? qualityColour
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

// Types & objects for air pollution components

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | undefined;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: undefined },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: undefined },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: undefined },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: undefined },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: undefined },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: undefined },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: undefined },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: undefined },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};
