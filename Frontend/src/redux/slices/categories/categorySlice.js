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
  categories: [],
  category: null,
};

//fetch Categories action
export const fetchCategoriesAction = createAsyncThunk(
  "categories/lists",
  async (payLoad, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      console.log("started communication");
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/categories",
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Category Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: INTIAL_STATE,
  extraReducers: (builder) => {
    //fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      console.log("pending");
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.categories = action.payload;
    });
    //handle rejected state
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      console.log("rejected");
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
const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
