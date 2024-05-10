import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import bookPrintingOrderReducer from "./features/bookPrintingSlice";
import customerOrdersReducer from "./features/customerOrdersSlice";
import userReducer from "./features/userSlice";
import storiesReducer from "./features/storySlice";
import userStoriesReducer from "./features/userStoriesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only user state will be persisted
};

const rootReducer = {
  bookPrintingOrders: bookPrintingOrderReducer,
  customerOrders: customerOrdersReducer,
  user: persistReducer(persistConfig, userReducer), // Wrap user reducer
  userStories: userStoriesReducer,
  stories: storiesReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // ignore non-serializable checks for specific actions
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
