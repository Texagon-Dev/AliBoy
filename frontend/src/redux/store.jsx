import { configureStore } from "@reduxjs/toolkit";
import bookPrintingOrderReducer from "./features/bookPrintingSlice";
import customerOrdersReducer from "./features/customerOrdersSlice";

export default configureStore({
  reducer: {
		bookPrintingOrders: bookPrintingOrderReducer,
		customerOrders: customerOrdersReducer
  },
});
