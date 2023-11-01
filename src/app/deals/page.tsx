import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { Skeleton } from "@/components/ui/skeleton";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { ArrowLeftIcon, PercentIcon } from "lucide-react";
import Link from "next/link";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="flex flex-col gap-5 p-5 lg:container">
      <div className="flex items-center gap-5">
        <Link href={process.env.HOST_URL}>
          <ArrowLeftIcon size={22} />
        </Link>
        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant="outline"
        >
          <PercentIcon size={16} />
          Ofertas
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-y-12">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
