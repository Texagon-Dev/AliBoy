import { configureStore } from "@reduxjs/toolkit";
import bookPrintingOrderReducer from "./bookPrintingSlice";
import customerOrdersReducer from "./customerOrdersSlice";

export default configureStore({
  reducer: {
		bookPrintingOrders: bookPrintingOrderReducer,
		customerOrders: customerOrdersReducer
		
  },
});
