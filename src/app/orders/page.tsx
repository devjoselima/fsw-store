import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasketIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./order-item";

const OrderPage = async () => {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Acesso negado, faça login</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: true,
    },
  });

  return (
    <div className="flex flex-col gap-5 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingBasketIcon size={16} />
        Catálogo
      </Badge>

      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderPage;
