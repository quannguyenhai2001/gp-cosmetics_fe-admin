import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetProducts = createAsyncThunk(
    "products/fetchAsyncGetProducts",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("products/get-all-products.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncDeleteProduct = createAsyncThunk(
    "products/fetchAsyncDeleteProduct",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("products/delete-product.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: productReducer, actions } = productSlice
export const { } = actions
export default productReducer
