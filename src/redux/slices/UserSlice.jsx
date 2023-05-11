import { CallApiByBody, CallApiByParams } from "api/configApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    userInfo: {},
    accessToken: ""
};

export const fetchAsyncSignIn = createAsyncThunk(
    "auth/fetchAsyncSignIn",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("auth/sign-in.php", "post", data)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);

export const fetchAsyncGetUser = createAsyncThunk(
    "auth/fetchAsyncGetUser",
    async (_data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("auth/get-user.php", "get", null)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);
export const fetchAsyncGetAllUsers = createAsyncThunk(
    "auth/fetchAsyncGetAllUsers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("auth/get-all-users.php", "get", data)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);
export const fetchAsyncDeleteUsers = createAsyncThunk(
    "auth/fetchAsyncDeleteUsers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("auth/delete-user.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetUserDetail = createAsyncThunk(
    "auth/fetchAsyncGetUserDetail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("auth/get-user-detail.php", "get", { user_id: 42 })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchAsyncSignIn.fulfilled, (state, action) => {
            state.userInfo = action.payload.data;
            localStorage.setItem('access_token', action.payload.token);
        })
        builder.addCase(fetchAsyncGetUser.fulfilled, (state, action) => {
            state.userInfo = action.payload.data;
        })
    }
})

const { reducer: userReducer } = userSlice
export default userReducer
