// src/redux/storiesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendStoryData = createAsyncThunk(
  "stories/sendStoryData",
  async (storyData, { rejectWithValue }) => {
    const { story_explanation, character_explanations, story_length } =
      storyData.storyDetails;
    const { total_chapters } = storyData.generationOptions;

    // Form the input object to send to the API
    const input = {
      story_explanation,
      character_explanations,
      total_chapters,
      story_length,
    };

    try {
      const response = await axios.post(
        `https://4198-202-166-171-220.ngrok-free.app/api/v1/${storyData.genre.value}`,
        { input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const regenerateStorySlide = createAsyncThunk(
  "stories/regenerateStorySlide",
  async (
    { text, storyIndex, chapterIndex, slideIndex },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://4198-202-166-171-220.ngrok-free.app/api/v1/rewriteParagraph",
        { input: text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: response.data,
        storyIndex,
        chapterIndex,
        slideIndex,
      };
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
      story_explanations: "",
      character_explanations: "",
      story_length: "",
      image: null,
    },
    generationOptions: {
      total_chapters: "2",
      imageStyle: "",
      language: "",
    },
  },
  items: [],
  loading: false,
  error: null,
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
      })
      // .addCase(regenerateStorySlide.fulfilled, (state, action) => {
      //   const {
      //     storyIndex,
      //     chapterIndex,
      //     slideIndex,
      //     data: regeneratedText,
      //   } = action.payload;

      //   const story = state.items[storyIndex];
      //   if (
      //     story &&
      //     story.output &&
      //     story.output[chapterIndex] &&
      //     story.output[chapterIndex].slides &&
      //     story.output[chapterIndex].slides[slideIndex]
      //   ) {
      //     story.output[chapterIndex].slides[slideIndex].regeneratedText =
      //       regeneratedText;
      //   }
      // });
  
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