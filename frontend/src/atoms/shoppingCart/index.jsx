import { atom, useAtom } from "jotai";
import Immutable from "seamless-immutable";

// Define the initial state of the cart. We put in one piece of test data

const initialCart = Immutable([]);

// Create an atom for the cart
export const cartAtom = atom(initialCart);

// Custom hook for cart operations
export const useShoppingCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  // Function to calculate the total price of items in the cart
  const getCartTotal = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const addToCart = (product) => {
    console.log(product)
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (product) => product.id === product.id
      );
      if (existingItemIndex !== -1) {
        // Use setIn to update quantity immutably
        const currentQuantity = currentCart[existingItemIndex].quantity;
        return currentCart.setIn(
          [existingItemIndex, "quantity"],
          currentQuantity + 1
        );
      } else {
        // Use concat to add a new item immutably
        return currentCart.concat({
          ...product,
          quantity: 1,
        });
      }
    });
    console.log(cart)
  };

  const setCartContent = (cartItems) => {
    setCart(Immutable(cartItems));
  };

  const removeFromCart = (id) => {
    console.log(cart);
    console.log("Remove from Cart: ", id);
    setCart((currentCart) => {
      return currentCart.filter((product) => product.id !== id);
    });
    console.log(cart);
  };

  const modifyQuantity = (id, quantity) => {
    quantity = parseInt(quantity);
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        // check if the quantity will be reduced to 0 or less, if so remove the item
        if (quantity < 0) {
          return currentCart.filter((item) => item.id !== id);
        } else {
          return currentCart.setIn([existingItemIndex, "quantity"], quantity);
        }
      }
    });
  };

  return {
    cart,
    getCartTotal,
    addToCart,
    removeFromCart,
    setCartContent,
    modifyQuantity,
  };
};
