import { createSlice} from "@reduxjs/toolkit";



const bookPrintingOrdersSlice = createSlice({
  name: "bookPrintingOrders",
  initialState: {
    order: null,
    totalSlides: "",
    status: "idle",
    error: null,

  },
  reducers: {
    setPrintingOrder: (state, action) => {
      state.order = action.payload;
    },
    setTotalSlides: (state, action) => {
      state.totalSlides = action.payload;
    },
  },

});

export const { setPrintingOrder, setTotalSlides } = bookPrintingOrdersSlice.actions;

export default bookPrintingOrdersSlice.reducer;
