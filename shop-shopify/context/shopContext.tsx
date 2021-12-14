import { createContext, useState, useEffect } from "react";

interface ShopProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext({});

const ShopProvider = ({ children }: ShopProviderProps) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  return <div>shopContext</div>;
};

export default ShopProvider;
