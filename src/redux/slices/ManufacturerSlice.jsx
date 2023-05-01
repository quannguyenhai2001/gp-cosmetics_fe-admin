import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};
export const fetchAsyncGetManufacturer = createAsyncThunk(
    "manufacturers/fetchAsyncGetManufacturer",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("manufacturers/get-manufacturer.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
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
export const fetchAsyncDeleteManufacturers = createAsyncThunk(
    "manufacturers/fetchAsyncDeleteManufacturers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("manufacturers/delete-manufacturer.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
// export const fetchAsyncCreateCategory = createAsyncThunk(
//     "categories/fetchAsyncCreateCategory",
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await CallApiByBody("categories/create-category.php", "post", data)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// );
export const fetchAsyncUpdateManufacturer = createAsyncThunk(
    "categories/fetchAsyncUpdateManufacturer",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("manufacturers/update-manufacturer.php", "put", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
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
