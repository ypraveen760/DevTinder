import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newFeed = state.filter((r) => r._id !== action.payload);
      return newFeed;
    },
    cleanFeed: () => null,
  },
});
export const { addFeed, removeFeed, cleanFeed } = feedSlice.actions;
export default feedSlice.reducer;
