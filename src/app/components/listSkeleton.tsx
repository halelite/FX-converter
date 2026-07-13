import { Skeleton } from "@/components/ui/skeleton";

const ListSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} className="h-14.5 w-full" />
  ));
};

export default ListSkeleton;
