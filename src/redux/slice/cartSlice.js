import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  //when you want to get some thing in the local storage  and use it in your project, you use JSON.parse
  cartTotalQuantity: 0, // represents the total number in our cart
  cartTotalAmount: 0, // total value of every thing in the cart
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      //   console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        //item already exists in cart
        //increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;

        toast.info(` ${action.payload.name}  product increased by one`, {
          position: "top-left",
        });
      } else {
        //item does not exist in the cart
        //add item to the cart
        const temProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temProduct);
        toast.success(` ${action.payload.name}  added to Cart`, {
          position: "top-left",
        });
      }
      //save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // NOTE when you want to save some thing in the local storage you use JSON.stringify
    },

    DECREASE_CART: (state, action) => {
      //   console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        //if product exists, decrease it by one
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(` ${action.payload.name}  product decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        //delete the product from the cart
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(` ${action.payload.name}  removed from Cart`, {
          position: "top-left",
        });
      }
      //update the cartItems in the local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //remove single product from the cart regardless of its quantity
    REMOVE_FROM_CART: (state, action) => {
      //   console.log(action.payload);
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.success(` ${action.payload.name}  removed from Cart`, {
        position: "top-left",
      });

      //update the cartItems in the local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART: (state, action) => {
      //   console.log(action.payload);
      state.cartItems = [];
      toast.info(` Cart cleared`, {
        position: "top-left",
      });

      //update the cartItems in the local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUBTOTAL: (state, action) => {
      // console.log(action.payload);
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;

        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      // console.log(totalAmount);
      state.cartTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY: (state, action) => {
      // console.log(action.payload);

      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;

        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      // console.log(totalAmount);
      state.cartTotalQuantity = totalQuantity;
    },

    SAVE_URL: (state, action) => {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

//exporting valuables that will point all of those up cart states
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
