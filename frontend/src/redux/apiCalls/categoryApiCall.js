import { categoryActions } from "../slices/categorySlice.js";
import request from "../../utils/request.js";
import { toast } from "react-toastify";

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while fetching categories.");
      }
    }
  };
}

// Create Category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category created successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating category.");
      }
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting category.");
      }
    }
  };
}