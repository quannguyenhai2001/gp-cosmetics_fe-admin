import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetSizes = createAsyncThunk(
    "sizes/fetchAsyncGetSizes",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("sizes/get-all-sizes.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetSize = createAsyncThunk(
    "sizes/fetchAsyncGetSize",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("sizes/get-size.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncDeleteSize = createAsyncThunk(
    "sizes/fetchAsyncDeleteSize",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("sizes/delete-size.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

const SizeSlice = createSlice({
    name: 'sizes',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: sizeReducer, actions } = SizeSlice
export const { } = actions
export default sizeReducer
