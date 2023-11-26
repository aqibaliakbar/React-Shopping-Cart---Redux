import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../products";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: getDefaultCart() }, // empty obj
  reducers: {
		addToCart: (state, action) => {
      // Increment item quantity in the cart
      const itemsId = action.payload; // items: {itemsId=key}
      state.items[itemsId] = (state.items[itemsId] || 0) + 1; // items: {key=itemsId: value=0+1}
    },
		removeFromCart: (state, action) => {
      // Decrement item quantity in the cart
      const itemsId = action.payload;
      state.items[itemsId] = Math.max((state.items[itemsId] || 0) - 1, 0);
    },
		updateCartItemCount: (state, action) => {
      // Update item quantity in the cart
      const { itemId, newAmount } = action.payload;
      state.items[itemId] = newAmount;
    },
		checkout: (state) => {
      // Reset the cart to an empty state
      state.items = getDefaultCart();
    },
  },
});

// Function to calculate the total amount of items in the cart
const calculateTotalAmount = (cartItems) => {
  // Initialize the total amount to zero
  let totalAmount = 0;

  // Iterate over each item in the cart
  for (const item in cartItems) {
    // Check if the quantity of the item is greater than zero
    if (cartItems[item] > 0) {
      // Find the corresponding product information based on the item ID
      let itemInfo = PRODUCTS.find((product) => product.id === Number(item));

      // Calculate the total amount for the current item and add it to the overall total
      totalAmount += cartItems[item] * itemInfo.price;
    }
  }

  // Return the final total amount
  return totalAmount;
};

// Selector to calculate the total amount from the Redux state
export const selectTotalCartAmount = (state) => {
  // Extract the 'items' property from the 'cart' slice of the state
  const { items } = state.cart;

  // Call the calculateTotalAmount function with the cart items and return the result
  return calculateTotalAmount(items);
};



export const { addToCart, removeFromCart, updateCartItemCount, checkout } = cartSlice.actions

export default cartSlice.reducer