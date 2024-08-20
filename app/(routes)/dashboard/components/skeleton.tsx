import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "./table-sekeleton";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";

export const CategoryChartSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="w-40 h-6" />
        <Skeleton className="w-64 h-4" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex items-center justify-center max-h-[250px]">
          <Skeleton className="w-full h-full max-w-[250px] max-h-[250px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-64 h-4" />
      </CardFooter>
    </Card>
  );
};

export const DataCardSkeleton = () => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <Skeleton className="w-32 h-4" /> {/* Placeholder for title */}
          <Skeleton className="w-24 h-3 mt-1" /> {/* Placeholder for description */}
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Placeholder for icon */}
      </CardHeader>
      <CardContent>
        <Skeleton className="w-24 h-8 mb-2" /> {/* Placeholder for value */}
        <Skeleton className="w-36 h-4" /> {/* Placeholder for description */}
      </CardContent>
    </Card>
  );
};

const DataCardsSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
     <DataCardSkeleton/>
     <DataCardSkeleton/>
     <DataCardSkeleton/>
     <DataCardSkeleton/>
    </div>
  );
};

export default DataCardsSkeleton;

export const DashboardSkeleton = () => {
  return (
    <div className="p-9">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DataCardsSkeleton />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <CardSkeleton />
          <CategoryChartSkeleton />
        </div>
      </main>
    </div>
  );
};
