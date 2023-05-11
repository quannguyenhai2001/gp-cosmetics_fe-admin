import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetCategory = createAsyncThunk(
    "categories/fetchAsyncGetCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("categories/get-category.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetAllCategories = createAsyncThunk(
    "categories/fetchAsyncGetAllCategories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("categories/get-all-categories.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncDeleteCategories = createAsyncThunk(
    "categories/fetchAsyncDeleteCategories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("categories/delete-category.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncCreateCategory = createAsyncThunk(
    "categories/fetchAsyncCreateCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("categories/create-category.php", "post", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncUpdateCategory = createAsyncThunk(
    "categories/fetchAsyncUpdateCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("categories/update-category.php", "put", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: categoryReducer } = categorySlice
export default categoryReducer
