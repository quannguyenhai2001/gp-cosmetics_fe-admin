import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};
export const fetchAsyncGetBill = createAsyncThunk(
    "bills/fetchAsyncGetBill",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("bills/get-bill.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetBills = createAsyncThunk(
    "bills/fetchAsyncGetBills",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("bills/get-all-bills.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncUpdateBill = createAsyncThunk(
    "bills/fetchAsyncUpdateBill",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("bills/update-bill.php", "PUT", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetAllBillDetails = createAsyncThunk(
    "bills/fetchAsyncGetAllBillDetails",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("bill-details/get-all-bill-details.php", "get", arg)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
const SizeSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: billReducer } = SizeSlice
export default billReducer
