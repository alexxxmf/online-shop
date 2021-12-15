import { createContext, useState, useEffect } from "react";
import { CHECKOUT_CREATE, client } from "../services";
import {
  CheckoutCreate as CheckoutCreateData,
  CheckoutCreateVariables,
} from "../services/mutations/__generated__/CheckoutCreate";

interface ShopProviderProps {
  children: React.ReactNode;
}

interface CartItem extends CheckoutCreateVariables {}

const CartContext = createContext({});

const ShopProvider = ({ children }: ShopProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const addToCart = async (newItem: CartItem) => {
    if (cart.length === 0) {
      setCart([newItem]);

      const response = await client.mutate<
        CheckoutCreateData,
        CheckoutCreateVariables
      >({
        mutation: CHECKOUT_CREATE,
        variables: {
          variantId: "",
          quantity: 1,
        },
      });

      if (response.data) {
        const checkoutElement = response.data.checkoutCreate?.checkout ?? null;
        checkoutElement &&
          setCheckoutId(checkoutElement.id) &&
          setCheckoutUrl(checkoutElement.webUrl);

        // TODO: move this key to env or something more centralized
        checkoutElement &&
          localStorage.setItem(
            "checkout_id",
            JSON.stringify([newItem, checkoutElement])
          );
      } else if (response.errors) {
        throw new Error(
          "There was a problem adding the item to the cart. Please try later!"
        );
      }
    }
  };

  return <div>shopContext</div>;
};

export default ShopProvider;
