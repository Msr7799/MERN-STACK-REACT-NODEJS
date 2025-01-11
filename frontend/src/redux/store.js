import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice.js";
import { categoryReducer } from "./slices/categorySlice.js";
import { commentReducer } from "./slices/commentSlice.js";
import { passwordReducer } from "./slices/passwordSlice.js";
import { postReducer } from "./slices/postSlice.js";
import { profileReducer } from "./slices/profileSlice.js";
const store = configureStore({
    reducer: {
       auth: authReducer,
       profile: profileReducer,
       post: postReducer,
       category: categoryReducer,
       comment: commentReducer,
       password: passwordReducer,
    }
});

export default store;