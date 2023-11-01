import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBadge from "@/components/ui/skeleton-badge";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container">
      <SkeletonBadge />
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />

        <Skeleton className="h-36" />
        <Skeleton className="h-36" />

        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </div>
  );
};

export default Loading;
