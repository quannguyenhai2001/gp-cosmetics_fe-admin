import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

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
    "auth/fetchAsyncDeleteCategories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("categories/delete-category.php", "delete", data)
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

const { reducer: categoryReducer, actions } = categorySlice
export const { } = actions
export default categoryReducer
