import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

const Cart = () => {
  const { data } = useSession();

  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return;
    }

    const order = await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-9">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-bold">Carrinho vazio.</p>
            )}
          </div>
        </ScrollArea>

        {products.length > 0 && (
          <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-sm lg:text-sm">
              <p>Subtotal</p>
              <p>
                {subtotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm lg:text-sm">
              <p>Entrega</p>
              <p>Grátis</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm lg:text-sm">
              <p>Descontos</p>
              <p>
                {totalDiscount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm lg:text-base">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <Button
              className="mt-7 font-bold uppercase"
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
