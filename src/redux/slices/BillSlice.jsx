import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

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
