import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const slice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: null,
    error: null,
  },
  reducers: {
    checkPosts(state, action) {
      state.location.push(action.payload);
      debugger;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: setError,
  },
});

export const { checkPosts } = slice.actions;

export default slice.reducer;
