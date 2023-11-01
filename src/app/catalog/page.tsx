import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ArrowLeftIcon, ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});
  return (
    <div className="flex flex-col gap-8 p-5 lg:container">
      <div className="flex items-center gap-5">
        <Link href={process.env.HOST_URL}>
          <ArrowLeftIcon size={22} />
        </Link>

        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant="outline"
        >
          <ShapesIcon size={16} />
          Catálogo
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
