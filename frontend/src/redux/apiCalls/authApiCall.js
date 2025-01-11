import { authActions } from "../slices/authSlice.js";
import request from "../../utils/request.js";
import { toast } from "react-toastify";

// التحقق من تسجيل الدخول
export function checkAuth() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/auth/check-status");
      dispatch(authActions.setUser(data));
    } catch (error) {
      const message = error.response?.data?.message || "Failed to authenticate";
      toast.error(message);
    }
  };
}

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Status
export function getStatus() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/status/status");
      dispatch(authActions.setStatus(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch status");
    }
  };
}