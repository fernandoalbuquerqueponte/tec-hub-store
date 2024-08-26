import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../_providers/cart-provider";
import { Card, CardContent } from "./ui/card";
import { getTotalPrice } from "../_helpers/product-price";

export default function CartItem() {
  const {
    products,
    incrementProduct,
    decrementProduct,
    removeProduct,
    subtotal,
    total,
    discount,
  } = useContext(CartContext);

  function handleIncrement(productId: string) {
    incrementProduct(productId);
  }

  function handleDecrement(productId: string) {
    decrementProduct(productId);
  }

  function handleRemoveProduct(productId: string) {
    removeProduct(productId);
  }
  return (
    <div className="flex flex-col gap-6">
      {products.map((product) => (
        <div key={product.id} className="flex flex-row gap-3">
          <Image
            src={product.imageUrl}
            width={100}
            height={100}
            style={{
              objectFit: "contain",
            }}
            alt={product.name}
          />

          <div className="flex flex-col gap-2 w-full">
            <h1>{product.name}</h1>
            <h2>R$ {getTotalPrice(product).toFixed(2)}</h2>
            <div className="flex justify-between w-full">
              <div className="flex flex-row gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(product.id)}
                >
                  <ChevronLeftIcon size={20} />
                </Button>

                <span className="text-center">{product.quantity}</span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(product.id)}
                >
                  <ChevronRightIcon size={20} />
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveProduct(product.id)}
              >
                <Trash2Icon size={20} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="py-7">
        {products.length > 0 ? (
          <Card>
            <CardContent className="py-5">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h1>Subtotal</h1>
                  <h2>R$ {subtotal.toFixed(2)}</h2>
                </div>
                <div className="flex justify-between">
                  <h1>Entrega</h1>
                  <h2>R$ 00,00</h2>
                </div>
                <div className="flex justify-between">
                  <h1>Descontos</h1>
                  <h2>- R$ {discount.toFixed(2)}</h2>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold">Total</h1>
                  <h2 className="font-bold">R$ {Number(total).toFixed(2)}</h2>
                </div>
                <Button className="w-full">CONFIRMAR COMPRA</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full h-full flex flex-col gap-2">
            <h1 className="font-bold text-xl">
              Você ainda não adicionou nada ao seu carrinho.
            </h1>
            <span className="text-center text-sm text-[#C4C4C4]">
              Dê uma olhada em nossa seleção e escolha o que mais gosta!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
