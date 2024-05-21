import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

// Mock base URL (you might want to replace this with an actual API endpoint)
const BASE_URL = "https://myapi.com/api/cutomer-orders";

const ORDERS = [
  {
    id: 1,
    name: "Product A",
    quantity: 5,
    status: "Dispatched",
    date: dayjs().subtract(10, "day").toISOString(),
    revenue: 50,
  },
  {
    id: 2,
    name: "Product B",
    quantity: 10,
    status: "Printing",
    date: dayjs().subtract(5, "day").toISOString(),
    revenue: 100,
  },
  {
    id: 3,
    name: "Product C",
    quantity: 8,
    status: "Pending",
    date: dayjs().subtract(20, "day").toISOString(),
    revenue: 80,
  },
  {
    id: 4,
    name: "Product D",
    quantity: 3,
    status: "Delivered",
    date: dayjs().subtract(15, "day").toISOString(),
    revenue: 30,
  },
  {
    id: 5,
    name: "Product E",
    quantity: 7,
    status: "Canceled",
    date: dayjs().subtract(25, "day").toISOString(),
    revenue: 70,
  },
  {
    id: 6,
    name: "Product D",
    quantity: 3,
    status: "Delivered",
    date: dayjs().subtract(15, "day").toISOString(),
    revenue: 30,
  },
  {
    id: 7,
    name: "Product E",
    quantity: 7,
    status: "Canceled",
    date: dayjs().subtract(25, "day").toISOString(),
    revenue: 70,
  },
];

const ORDER = { id: 1, name: "Product A", quantity: 5, status: "Dispatched" };

// Async thunks
export const fetchCustomerOrders = createAsyncThunk(
  "customerOrders/fetchCustomerOrders",
  async () => {
    // we can do api call here
    // const response = await axios.get(BASE_URL);
    // return response.data;
    return ORDERS;
  }
);

export const fetchCustomerOrder = createAsyncThunk(
  "customerOrders/fetchCustomerOrderDetails",
  async (orderId) => {
    // const response = await axios.post(BASE_URL, orderId);
    // return response.data;
    console.log(orderId);
    return ORDER;
  }
);
export const createCustomerOrder = createAsyncThunk(
  "customerOrders/createCustomerOrder",
  async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  }
);

const customerOrderSlice = createSlice({
  name: "customerOrders",
  initialState: {
    orders: [],
    order: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCustomerOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export default customerOrderSlice.reducer;
