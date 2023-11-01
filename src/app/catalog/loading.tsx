import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 lg:container">
      <div className="grid grid-cols-2 gap-8 gap-x-14 pt-5 lg:container lg:grid-cols-3">
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
