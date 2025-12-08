import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/user/me");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load profile");
        }
    }
);

export const updateUserName = createAsyncThunk(
    "user/updateName",
    async (username, thunkAPI) => {
        try {
            const response = await api.put("/user/name", { username });
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update username");
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    "user/changePassword",
    async ({ oldPassword, newPassword }, thunkAPI) => {
        try {
            const response = await api.put("/user/password", { oldPassword, newPassword });
            return response.data;
        } catch (error) {   
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to change password");
        }
    }
)

const initialState = {
    profile: null,
    status: "idle",
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState(state) {
            state.profile = null;
            state.status = "idle";
            state.error = null;
        }, 
    },

    extraReducers: (builder) => {
        builder // получение профиля юзера
        .addCase(fetchUserProfile.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.profile = action.payload
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        })
        // обновление имени юзера
        .addCase(updateUserName.pending, (state) => {
            state.status = "loading";
        })
        .addCase(updateUserName.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.profile = action.payload;
        })
        .addCase(updateUserName.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        // изменение пароля
        .addCase(changeUserPassword.pending, (state) => {
            state.status = "loading";
        })
        .addCase(changeUserPassword.fulfilled, (state) => {
            state.status = "succeeded";
        })
        .addCase(changeUserPassword.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }, 
});

export const {clearUserState} = userSlice.actions;
export default userSlice.reducer; 