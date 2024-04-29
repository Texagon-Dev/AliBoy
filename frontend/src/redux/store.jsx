import { configureStore } from "@reduxjs/toolkit";
import bookPrintingOrderReducer from "./features/bookPrintingSlice";
import customerOrdersReducer from "./features/customerOrdersSlice";
import userReducer from "./features/userSlice";
import storiesReducer from "./features/storySlice";

const store = configureStore({
  reducer: {
    bookPrintingOrders: bookPrintingOrderReducer,
    customerOrders: customerOrdersReducer,
    user: userReducer,
    stories: storiesReducer,
  },
});

export default store;