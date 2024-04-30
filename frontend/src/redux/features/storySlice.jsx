// src/redux/storiesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendStoryData = createAsyncThunk(
  "stories/sendStoryData",
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://yourapi.com/stories",
        storyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  currentStory: {
    genre: null,
    storyDetails: {
      storyBookId: "",
      storyExplanation: "",
      characterExplanation: "",
      storyLength: "",
      image: null,
    },
    generationOptions: {
      chapters: 1,
      imageStyle: "Auto",
      language: "English",
    },
  },
  items: [],
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.currentStory.genre = action.payload;
    },
    setStoryDetails: (state, action) => {
      state.currentStory.storyDetails = {
        ...state.currentStory.storyDetails,
        ...action.payload,
      };
    },
    setGenerationOptions: (state, action) => {
      state.currentStory.generationOptions = {
        ...state.currentStory.generationOptions,
        ...action.payload,
      };
    },
    addStoryToHistory: (state, action) => {
      state.items.push(action.payload);
    },
    resetCurrentStory: (state) => {
      state.currentStory = initialState.currentStory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendStoryData.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendStoryData.fulfilled, (state, action) => {

        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(sendStoryData.rejected, (state, action) => {
       
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setGenre,
  setStoryDetails,
  setGenerationOptions,
  addStoryToHistory,
  resetCurrentStory,
} = storiesSlice.actions;

export default storiesSlice.reducer;
