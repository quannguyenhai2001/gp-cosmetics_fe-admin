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
export const fetchAsyncCreateSize = createAsyncThunk(
    "sizes/fetchAsyncCreateSize",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("sizes/create-size.php", "post", data)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);

export const fetchAsyncUpdateSize = createAsyncThunk(
    "sizes/fetchAsyncUpdateSize",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("sizes/update-size.php", "put", data)
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

const { reducer: sizeReducer } = SizeSlice
export default sizeReducer
