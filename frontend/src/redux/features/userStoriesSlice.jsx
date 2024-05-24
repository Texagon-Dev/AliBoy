import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStoryBooks, fetchUserStoryBooks } from "@/lib/functions";

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchUserStoryBooks(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStoriesBook = createAsyncThunk(
  "stories/fetchStoriesBook",
  async ( { rejectWithValue }) => {
    try {
      const response = await fetchStoryBooks();
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userStoriesSlice = createSlice({
  name: "userStories",
  initialState: {
    details: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userStoriesSlice.reducer;
