import { fetchUsers } from "@/lib/functions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
  userId: "",
  metadata: {},
  email: "",
  users: [],
  avatarUrl: "",
  isLoading: true,
};

export const fetchUserProfile = (userId) => async (dispatch) => {
  try {
    const users = await fetchUsers(userId);
    dispatch(setUsers(users));
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.userId = action.payload ? action.payload.user.id : "";
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.avatarUrl = action.payload;
      console.log("Updated state avatar URL:", state.avatarUrl);
    },
    setUserMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setSession,
  setIsLoading,
  setUserId,
  setUserEmail,
  setUserAvatar,
  setUserMetadata,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
