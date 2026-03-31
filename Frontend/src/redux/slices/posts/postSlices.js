import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INTIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};
