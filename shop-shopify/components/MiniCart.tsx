/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import { CartContext } from "../context";
import { priceFormatter } from "../utils";
import Link from "next/link";

const MiniCart = () => {
  const cancelButtonRef = useRef(null);
  const cartContext = useContext(CartContext);

  const cartProducts = cartContext?.cart;
  const open = cartContext?.cartOpen ?? false;
  const setOpen = cartContext?.setCartOpen;
  const removeCartItem = cartContext?.removeCartItem;

  let cartTotal = 0;
  cartProducts?.forEach((item) => {
    cartTotal += item?.variantPrice * item?.variantQuantity;
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-50 inset-0 overflow-hidden"
        onClose={() => {
          !!setOpen && setOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            ref={cancelButtonRef}
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              !!setOpen && setOpen(false);
                            }}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartProducts?.length ? (
                              cartProducts.map((cartItem) => (
                                <li key={cartItem.id} className="flex py-6">
                                  <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image
                                      src={cartItem.image}
                                      alt={cartItem.variantTitle}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            passHref
                                            href={`/product/${cartItem.handle}`}
                                          >
                                            <a
                                              onClick={() =>
                                                !!setOpen && setOpen(false)
                                              }
                                            >
                                              {" "}
                                              {cartItem.title}{" "}
                                            </a>
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {priceFormatter.format(
                                            cartItem.variantPrice
                                          )}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {cartItem.variantTitle}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {cartItem.variantQuantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={async () => {
                                            removeCartItem &&
                                              (await removeCartItem(cartItem));
                                          }}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <div>
                                <p>Nothing in your cart!</p>
                              </div>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cartProducts?.length ? (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>{priceFormatter.format(cartTotal)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => {
                                  !!setOpen && setOpen(false);
                                }}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MiniCart;
