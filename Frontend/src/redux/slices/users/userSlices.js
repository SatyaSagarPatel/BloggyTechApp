import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INTIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
//Login action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payLoad, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      console.log("started communication");
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        payLoad,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Register action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payLoad, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      console.log("started communication");
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        payLoad,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
//Logout Action
export const LogoutAction = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
  return true;
});

const usersSlice = createSlice({
  name: "users",
  initialState: INTIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      console.log("rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //register
    builder.addCase(registerAction.pending, (state, action) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      console.log("rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
