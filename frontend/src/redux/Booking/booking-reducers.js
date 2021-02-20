import {
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_CURRENT_SERVICE,
  FETCH_SERVICES,
} from "./booking-types";

const INITIAL_STATE = {
  services: [],
  cart: [],
  currentItem: null,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      console.log(action.payload);
      return {
        ...state,
        services: action.payload,
      };
    case BOOK_APPOINTMENT:
      //Get the items data from the services array
      const item = state.services.find(
        (item) => item.service_id === action.payload.id
      );
      //Check if item is in the cart already
      const inCart = state.cart.find((item) =>
        item.service_id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.service_id === action.payload.id
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
    case DELETE_APPOINTMENT:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product_id !== action.payload.id
        ),
      };

    case LOAD_CURRENT_SERVICE:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
