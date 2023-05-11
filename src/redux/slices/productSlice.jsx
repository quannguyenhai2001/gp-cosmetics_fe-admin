import instanceApi, { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};
export const fetchAsyncGetProduct = createAsyncThunk(
    "products/fetchAsyncGetProduct",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("products/get-product.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
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
export const fetchAsyncUpdateProduct = createAsyncThunk(
    "products/fetchAsyncUpdateProduct",
    async (data, { rejectWithValue }) => {
        try {
            instanceApi.defaults.headers["Content-Type"] = "multipart/form-data";
            const response = await CallApiByBody("products/update-product.php", "post", data)
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

export const fetchAsyncCreateProduct = createAsyncThunk(
    "products/fetchAsyncCreateProduct",
    async (data, { rejectWithValue }) => {
        try {
            instanceApi.defaults.headers["Content-Type"] = "multipart/form-data";
            const response = await CallApiByBody("products/create-product.php", "post", data)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
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

const { reducer: productReducer } = productSlice
export default productReducer
