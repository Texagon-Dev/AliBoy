import { configureStore } from "@reduxjs/toolkit";
import bookPrintingOrderReducer from "./features/bookPrintingSlice";
import customerOrdersReducer from "./features/customerOrdersSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    bookPrintingOrders: bookPrintingOrderReducer,
    customerOrders: customerOrdersReducer,
    user: userReducer,
  },
});

export default store;