import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/product-images";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductInfo from "../components/product-info";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:px-5 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9">
        {/* @ts-expect-error */}
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        {/* @ts-expect-error */}
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>

      <div className="flex flex-col gap-5">
        <SectionTitle className="pl-5">Produtos recomendados</SectionTitle>
        {/* @ts-expect-error */}
        <ProductList products={product?.category.products} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
