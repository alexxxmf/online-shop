import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { CHECKOUT_CREATE, client } from "../services";
import { CHECKOUT_UPDATE } from "../services/mutations/CheckoutUpdate";
import {
  CheckoutCreate as CheckoutCreateData,
  CheckoutCreateVariables,
} from "../services/mutations/__generated__/CheckoutCreate";
import {
  CheckoutUpdate as CheckoutUpdateData,
  CheckoutUpdateVariables,
  CheckoutUpdate_checkoutLineItemsReplace_checkout as CheckoutElement,
} from "../services/mutations/__generated__/CheckoutUpdate";

interface ShopProviderProps {
  children: React.ReactNode;
}

interface CartItem extends CheckoutCreateVariables {}

interface CartContext {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  addToCart: (newItem: CartItem) => Promise<void>;
  checkoutUrl: string;
}

export const CartContext = createContext<CartContext | null>(null);

const ShopProvider = ({ children }: ShopProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    const stringifiedCart = localStorage.getItem("checkout_id");
    if (stringifiedCart) {
      const cartObject: [CartItem[], CheckoutElement] =
        JSON.parse(stringifiedCart);
      setCart(cartObject[0]);
      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  const addToCart = async (newItem: CartItem) => {
    if (cart.length === 0) {
      setCart([newItem]);

      const response = await client.mutate<
        CheckoutCreateData,
        CheckoutCreateVariables
      >({
        mutation: CHECKOUT_CREATE,
        variables: {
          variantId: newItem.variantId,
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
            JSON.stringify([[newItem], checkoutElement])
          );
      } else if (response.errors) {
        throw new Error(
          "There was a problem adding the item to the cart. Please try later!"
        );
      }
    } else {
      let newCart = [...cart];

      const indexOfNewItemFoundInCart = cart.findIndex(
        ({ variantId }) => variantId === newItem.variantId
      );
      if (indexOfNewItemFoundInCart === -1) {
        newCart.push({ variantId: newItem.variantId, quantity: 1 });
      } else {
        newCart[indexOfNewItemFoundInCart] = {
          ...newCart[indexOfNewItemFoundInCart],
          quantity: newCart[indexOfNewItemFoundInCart].quantity + 1,
        };
      }
      setCart(newCart);

      const response = await client.mutate<
        CheckoutUpdateData,
        CheckoutUpdateVariables
      >({
        mutation: CHECKOUT_UPDATE,
        variables: {
          lineItems: cart,
          checkoutId,
        },
      });

      if (response.data) {
        const checkoutElement =
          response.data.checkoutLineItemsReplace?.checkout ?? null;
        checkoutElement &&
          setCheckoutId(checkoutElement.id) &&
          setCheckoutUrl(checkoutElement.webUrl);

        // TODO: move this key to env or something more centralized
        checkoutElement &&
          localStorage.setItem(
            "checkout_id",
            JSON.stringify([newCart, checkoutElement])
          );
      } else if (response.errors) {
        throw new Error(
          "There was a problem adding the item to the cart. Please try later!"
        );
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, setCartOpen, addToCart, checkoutUrl }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ShopProvider;
