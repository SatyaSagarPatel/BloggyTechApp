import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

const INTIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};

//fetch public post action
export const fetchPublicPostAction = createAsyncThunk(
  "posts/fetch-public-post",
  async (payLoad, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      console.log("started communication");
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/posts/public",
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//fetch single post action
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      console.log("started communication");
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/posts/${postId}`,
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Create Post action
export const addPostAction = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      //convert payload to formData
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/posts",
        formData,
        config,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Post Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: INTIAL_STATE,
  extraReducers: (builder) => {
    //fetch public post
    builder.addCase(fetchPublicPostAction.pending, (state, action) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(fetchPublicPostAction.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPublicPostAction.rejected, (state, action) => {
      console.log("rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //fetch single post
    builder.addCase(getPostAction.pending, (state, action) => {
      console.log("get post pending run");
      state.loading = true;
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      console.log("rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //create post
    builder.addCase(addPostAction.pending, (state, action) => {
      console.log("add post pending");
      state.loading = true;
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      console.log("add post fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(addPostAction.rejected, (state, action) => {
      console.log("add post rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //Reset error action
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    //Reset success action
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});

//Generate reducer
const postsReducer = postsSlice.reducer;
export default postsReducer;
