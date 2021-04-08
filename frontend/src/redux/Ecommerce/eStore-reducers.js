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
      console.log(action.payload.qty);
      //Get the items data from the products array
      const item = state.products.find(
        (item) => item.product_id === action.payload.itemId
      );
      //Check if item is in the cart already
      const inCart = state.cart.find((item) =>
        item.product_id === action.payload.itemId ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.product_id === action.payload.itemId
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
                userId: action.payload.userId,
              },
            ],
      };
    case actionTypes.REMOVE_FROM_CART:
      console.log("red here");
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

    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        // products: state.products.filter(
        //   (item) => item.product_id !== action.payload.id
        // ),

        products: action.payload,
      };

    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        // products: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
