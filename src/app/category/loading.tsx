import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBadge from "@/components/ui/skeleton-badge";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <SkeletonBadge />

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
};

export default Loading;
