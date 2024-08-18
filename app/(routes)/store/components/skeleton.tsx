import { Skeleton } from "@/components/ui/skeleton";


const PantrySkeleton=()=>{
    return (
      <div className="col-span-1 divide-y divide-gray-200 rounded-lg shadow transition hover:shadow-lg dark:bg-slate-800">
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="px-6 py-4">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

export default PantrySkeleton