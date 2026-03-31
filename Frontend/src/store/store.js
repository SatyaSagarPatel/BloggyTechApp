import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/users/userSlices";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
export default store;
