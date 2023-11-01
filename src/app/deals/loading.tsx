import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBadge from "@/components/ui/skeleton-badge";

const Loading = () => {
  return (
    <div className="flex flex-col gap-5 p-5 lg:container">
      <SkeletonBadge />
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-y-12">
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />

        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
      </div>
    </div>
  );
};

export default Loading;
