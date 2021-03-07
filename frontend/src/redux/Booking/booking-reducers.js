import {
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_CURRENT_SERVICE,
  FETCH_SERVICES,
  DELETE_SERVICE,
  UPDATE_SERVICE,
  ADD_SERVICE,
  FETCH_STAFFS,
  DEMOTE_STAFFS,
  FETCH_ADMIN,
  DEMOTE_ADMIN,
  FETCH_APPOINTMENT,
  FETCH_USER_APPOINTMENTS,
  HANDLE_PAYMENT,
} from "./booking-types";

const INITIAL_STATE = {
  services: [],
  cart: [],
  currentItem: null,
  staffs: [],
  admins: [],
  appointments: [],
  bookingCart: [],
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      // console.log(action.payload);
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case FETCH_STAFFS:
      // console.log(action.payload);
      return {
        ...state,
        staffs: action.payload,
      };
    case DEMOTE_STAFFS:
      // console.log(action.payload);
      return {
        ...state,
        // staffs: action.payload,
      };

    case FETCH_ADMIN:
      // console.log(action.payload);
      return {
        ...state,
        admins: action.payload,
      };
    case DEMOTE_ADMIN:
      // console.log(action.payload);
      return {
        ...state,
        // admins: [],
      };
    case BOOK_APPOINTMENT:
      //Get the items data from the services array
      // const item = state.bookingCart.find(
      //   (item) => item.service_id === action.payload.serviceId
      // );
      // //Check if item is in the cart already
      const inBookingCart = state.bookingCart?.find((item) =>
        item.service_id === action.payload.serviceId ? true : false
      );
      return {
        ...state,
        bookingCart: !inBookingCart && [...state.bookingCart, action.payload],

        // bookingCart: inBookingCart
        //   ? state.bookingCart.map((item) =>
        //       item.service_id === action.payload.serviceId
        //         ? {
        //             ...item,
        //             qty: item.qty + action.payload.qty,
        //             total: action.payload.qty * item.price,
        //           }
        //         : item
        //     )
        //   : [
        //       ...state.bookingCart,
        //       {
        //         ...item,
        //         qty: action.payload.qty,
        //         total: item.qty * item.price,
        //       },
        //     ],
      };
    case DELETE_APPOINTMENT:
      console.log(state.bookingCart);
      return {
        ...state,
        bookingCart: state.bookingCart.filter(
          (item) => item.serviceId !== action.payload.id
        ),
      };

    case LOAD_CURRENT_SERVICE:
      return {
        ...state,
        currentItem: action.payload,
      };

    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (item) => item.service_id !== action.payload.id
        ),
      };

    case UPDATE_SERVICE:
      return {
        ...state,
        services: action.payload,
        // services: state.services.map(
        //   (item) =>
        //     item.service_id === action.payload.id && {
        //       ...item,
        //       name: action.payload.values.name,
        //       description: action.payload.values.description,
        //       price: action.payload.values.price,
        //     }
        // ),
        // (action.payload.id !== null) & (action.payload.image !== null) &&
        // state.services.map(
        //   (item) =>
        //     item.service_id === action.payload.id && {
        //       ...item,
        //       image: action.payload.image,
        //     }
        // ),
      };
    case ADD_SERVICE:
      return {
        ...state,
        services: action.payload,
      };
    case FETCH_APPOINTMENT:
      return {
        ...state,
        appointments: action.payload,
      };

    case FETCH_USER_APPOINTMENTS:
      return {
        ...state,
        // bookingCart: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
