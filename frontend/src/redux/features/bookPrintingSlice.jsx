import { createSlice} from "@reduxjs/toolkit";



const bookPrintingOrdersSlice = createSlice({
  name: "bookPrintingOrders",
  initialState: {
    order: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setPrintingOrder: (state, action) => {
      state.order = action.payload;
    },
  },

});

export const { setPrintingOrder } = bookPrintingOrdersSlice.actions;

export default bookPrintingOrdersSlice.reducer;
