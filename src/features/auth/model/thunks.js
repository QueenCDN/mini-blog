import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({ email, password}, thunkAPI) => {
        try {
            const res = await api.post("/auth/login", {email, password});
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Ошибка авторизации");
        }
    }
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    // если роут смонтирован как /user, будет "/user/me"
    const res = await api.get("/user/me");
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || "Failed to load profile");
  }
});