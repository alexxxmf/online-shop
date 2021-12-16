import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";

const Nav = () => {
  const cartContext = useContext(CartContext);

  const cart = cartContext?.cart ?? [];

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">Shop</span>
          </a>
        </Link>
        <a className="text-md font-bold cursor-pointer">Cart({cartQuantity})</a>
      </div>
    </header>
  );
};

export default Nav;
