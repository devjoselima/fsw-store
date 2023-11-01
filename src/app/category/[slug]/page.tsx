import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icons";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const CategoryProducts = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <div className="flex items-center gap-5 ">
        <Link href={process.env.HOST_URL}>
          <ArrowLeftIcon size={22} />
        </Link>
        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant="outline"
        >
          {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
          {category.name}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
