import { fetchUser } from "@/lib/functions";
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
    const users = await fetchUser(userId);

    if (!users || users.length === 0) {
      return;
    }

    const user = users[0]; // Assuming there is only one user with the given userId
    const { metadata, email, profile_image } = user;

    // Dispatch actions to update the state
    dispatch(setUsers(users));
    dispatch(setUserMetadata(metadata));
    dispatch(setUserEmail(email));
    dispatch(setUserAvatar(profile_image));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error("Error fetching users:", error.message);
    dispatch(setIsLoading(false)); // Ensure loading state is reset on error
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
      const users = action.payload || [];
      state.users = users;
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
