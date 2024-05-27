// ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllBookPrintingOrders,
  fetchStoryBooks,
  updateBookPrintingOrderStatus,
} from "@/lib/functions";

// Thunk to fetch orders and include user names and story names
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState }) => {
    // Fetch orders
    const response = await fetchAllBookPrintingOrders();

    // Fetch users from state
    const { users } = getState().user;

    // Fetch story books
    const storyBooks = await fetchStoryBooks();
    console.log("storyBook", storyBooks);

    // Map story books by story_id for quick lookup
    const storyBooksMap = storyBooks.reduce((acc, story) => {
      acc[story.story_book_id] = story.story_name;
      return acc;
    }, {});

    // Combine orders with user names and story names
    const ordersWithUserNamesAndStoryNames = response.map((order) => {
      const user = users.find((user) => user.uuid === order.uuid);
      return {
        ...order,
        user: user,
        user_name: user ? user.metadata.full_name : "Unknown User",
        story_name: storyBooksMap[order.story_book_id] || "Unknown Story",
        order_status: order.order_status || "Pending",
      };
    });
    console.log(
      "ordersWithUserNamesAndStoryNames",
      ordersWithUserNamesAndStoryNames
    );
    return ordersWithUserNamesAndStoryNames;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { dispatch }) => {
    await updateBookPrintingOrderStatus(orderId, { order_status: status });
    return { orderId, status };
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateRealTimeOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const existingOrder = state.orders.find(
        (order) => order.printing_id === orderId
      );
      if (existingOrder) {
        existingOrder.order_status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const existingOrder = state.orders.find(
          (order) => order.printing_id === orderId
        );
        if (existingOrder) {
          existingOrder.order_status = status;
        }
      });
  },
});

export const { updateRealTimeOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
