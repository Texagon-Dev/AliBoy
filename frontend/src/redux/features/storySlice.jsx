// src/redux/storiesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendStoryData = createAsyncThunk(
  "stories/sendStoryData",
  async (storyData, { rejectWithValue }) => {
    const { story_explanation, character_explanations, story_length } =
      storyData.storyDetails;
    const { total_chapters } = storyData.generationOptions;

    console.log("storyData from slice", storyData);

    // Form the input object to send to the API
    const input = {
      story_explanation,
      character_explanations,
      total_chapters,
      story_length,
    };
    console.log("input from slice", input);

    try {
      const response = await axios.post(
        `https://51c0-202-166-171-221.ngrok-free.app/api/v1/${storyData.genre.value}`,
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
        "https://51c0-202-166-171-221.ngrok-free.app/api/v1/rewriteParagraph",
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
      total_chapters: "1",
      imageStyle: "",
      language: "",
    },
   
  },

  items: [],
  loading: false,
  error: null,
};

export const setSlideText =
  ({ editedText, storyIndex, chapterIndex, slideIndex }) =>
  (dispatch, getState) => {
    const { stories } = getState();
    const updatedItems = [...stories.items]; // Copy the items array

    // Update the slide content with edited text
    updatedItems[storyIndex].output[chapterIndex].slides[
      slideIndex
    ].regeneratedText = editedText;

    // Dispatch the action to update the state
    dispatch({ type: "stories/setSlideText", payload: updatedItems });
  };


const MAX_WORDS_PER_SLIDE = 35;

const splitTextIntoSlides = (text) => {
  if (!text) return []; // Guard clause to handle undefined or empty strings
   if (MAX_WORDS_PER_SLIDE <= 0) return [];

  let slides = [];
  const words = text.split(/\s+/); // Split the text into words
  for (let i = 0; i < words.length; i += MAX_WORDS_PER_SLIDE) {
    slides.push({
      slideId: i / MAX_WORDS_PER_SLIDE,
      originalText: words.slice(i, i + MAX_WORDS_PER_SLIDE).join(" "),
      regeneratedText: null, // Initialize with no regenerated text
    });
  }
  return slides;
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
      console.log("action", action.payload);
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
        const response = action.payload;
        console.log(response);
        response.output.forEach((chapter) => {
          console.log(chapter);
          const slides =
            chapter.slides || splitTextIntoSlides(chapter.chapter);
          // response.output.chapter.slides = slides;
          chapter.slides = slides
         

        });
       

        state.items.push(response);
        state.loading = false;
      })
      .addCase(sendStoryData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(regenerateStorySlide.fulfilled, (state, action) => {
        const {
          storyIndex,
          chapterIndex,
          slideIndex,
          data: regeneratedText,
        } = action.payload;
        const parentStory = state.items[storyIndex];
        const story = parentStory.output[chapterIndex];
        story.slides[slideIndex].regeneratedText = regeneratedText.output;
        console.log(story);

        // story.chapter = regeneratedText.output;
        state.items[storyIndex] = parentStory;
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
