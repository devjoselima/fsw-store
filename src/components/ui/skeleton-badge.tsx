import { Skeleton } from "./skeleton";

const SkeletonBadge = () => {
  return (
    <div className="flex items-center gap-5 ">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-10 w-36" />
    </div>
  );
};

export default SkeletonBadge;
