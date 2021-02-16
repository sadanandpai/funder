import { createSlice } from "@reduxjs/toolkit";
import { setJokesAPIPageNumber, fetchJokesFromAPI, fetchImage } from "./apiReq";

export const images = [];
const jokesLoadingThreshHold = 4; // Make requests when remaining jokes are less than this count

const jokeSlice = createSlice({
  name: "jokes",
  initialState: {
    jokes: [],
    favorites: [],
    swipeDirection: "",
    page: "HOME",
    hasBackgroundImage: true,
    hasLocalStorage: true,
  },
  reducers: {
    appendJokes: (state, { payload }) => {
      state.jokes.push(...payload);
    },
    invertBoolean: (state, { payload }) => {
      state[payload] = !state[payload];
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setSwipeDirection: (state, { payload }) => {
      state.swipeDirection = payload;
    },
    onFavDelete: (state, { payload }) => {
      state.favorites.splice(
        state.favorites.findIndex((item) => item.id === payload),
        1
      );
    },
    onSwipe: (state, { payload }) => {
      if (state.swipeDirection === "RIGHT") {
        const position = state.favorites.findIndex((joke) => joke.id === payload);
        if (position === -1) {
          state.favorites.push(state.jokes[0]);
        }
      } else {
        const position = state.favorites.findIndex((joke) => joke.id === payload);
        if (position !== -1) {
          state.favorites.splice(position, 1);
        }
      }

      state.jokes.shift();
      state.swipeDirection = "";
      images.pop();
    },
    setStateFromLocalStorage: (state, { payload }) => {
      state.jokes = payload.jokes;
      state.favorites = payload.favorites ?? [];
      state.hasBackgroundImage = Boolean(payload.hasBackgroundImage);
      state.hasLocalStorage = Boolean(payload.hasLocalStorage);
      setJokesAPIPageNumber(payload.jokesAPIPageNumber);
    },
  },
});

export const { appendJokes, invertBoolean, setPage, setSwipeDirection, onFavDelete, onSwipe, setStateFromLocalStorage } = jokeSlice.actions;
export default jokeSlice.reducer;

export const fetchJokeAsync = () => async (dispatch, getState) => {
  const state = getState();
  if (state.jokes.length < jokesLoadingThreshHold) {
    const jokes = await fetchJokesFromAPI();
    if (jokes) {
      dispatch(appendJokes(jokes));
    }
  }
};

// Load 2 images eagerly
(async function loadInitialImage() {
  const image1 = await fetchImage();
  const image2 = await fetchImage();
  if (image1 && image2) {
    images.push(image1, image2);
  }
})();
