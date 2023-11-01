import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBadge from "@/components/ui/skeleton-badge";

const Loading = () => {
  return (
    <div className="flex flex-col gap-5 p-5 lg:container">
      <SkeletonBadge />

      <div className="flex flex-col gap-5">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default Loading;
