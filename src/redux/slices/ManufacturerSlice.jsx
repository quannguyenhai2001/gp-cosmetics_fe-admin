import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetManufacturers = createAsyncThunk(
    "manufacturers/fetchAsyncGetManufacturers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("manufacturers/get-all-manufacturers.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
// export const fetchAsyncDeleteProduct = createAsyncThunk(
//     "product/fetchAsyncDeleteProduct",
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await CallApiByBody("products/delete-product.php", "delete", data)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// );

const productSlice = createSlice({
    name: 'manufacturers',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: manufacturerReducer, actions } = productSlice
export const { } = actions
export default manufacturerReducer
