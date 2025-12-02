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