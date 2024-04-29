// src/redux/storiesSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    items: [],
  },
  reducers: {
    addStory: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addStory } = storiesSlice.actions;

export default storiesSlice.reducer;
