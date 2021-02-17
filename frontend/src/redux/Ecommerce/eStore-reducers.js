import * as actionTypes from "./eStore-types";

const INITIAL_STATE = {
  products: [],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.ADD_TO_CART:
      //Get the items data from the products array
      const item = state.products.find(
        (item) => item.product_id === action.payload.id
      );
      //Check if item is in the cart already
      const inCart = state.cart.find((item) =>
        item.product_id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.product_id === action.payload.id
                ? {
                    ...item,
                    qty: item.qty + action.payload.qty,
                    total: action.payload.qty * item.price,
                  }
                : item
            )
          : [
              ...state.cart,
              {
                ...item,
                qty: action.payload.qty,
                total: item.qty * item.price,
              },
            ],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product_id !== action.payload.id
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
