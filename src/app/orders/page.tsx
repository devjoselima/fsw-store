import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ArrowLeftIcon, ShoppingBasketIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const dynamic = "force-dynamic";

const OrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <p>Acesso negado, faça login</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
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
          <ShoppingBasketIcon size={16} />
          Meus pedidos
        </Badge>
      </div>

      {orders.length > 0 ? (
        <ScrollArea className="h-[600px]">
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p>Não há pedidos registrados.</p>
      )}
    </div>
  );
};

export default OrderPage;
