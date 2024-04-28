import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
  userId: "",
  name: "",
  email: "",
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  setSession,
  setIsLoading,
  setUserId,
  setUserEmail,
  setUserName,
} = userSlice.actions;

export default userSlice.reducer;
