import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mock base URL (you might want to replace this with an actual API endpoint)
const BASE_URL = "https://myapi.com/api/book-printing-orders";

// Async thunks
export const fetchBookPrintingOrders = createAsyncThunk(
  "bookPrintingOrders/fetchBookPrintingOrders",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addBookPrintingOrder = createAsyncThunk(
  "bookPrintingOrders/addBookPrintingOrder",
	async (order) => {
		
    const response = await axios.post(BASE_URL, order);
		// return order;
		return response.data;
  }
);

const bookPrintingOrdersSlice = createSlice({
  name: "bookPrintingOrders",
  initialState: {
		orders: [],
		// order: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookPrintingOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookPrintingOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchBookPrintingOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBookPrintingOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        // state.order = (action.payload);
      });
  },
});

export default bookPrintingOrdersSlice.reducer;
