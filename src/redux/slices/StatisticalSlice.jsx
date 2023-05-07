import { CallApiByBody, CallApiByParams } from "api/configApi";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetMonthlyRevenueList = createAsyncThunk(
    "statistical/fetchAsyncGetMonthlyRevenueList",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("statistical/get-monthly-revenue-list.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetTotalRecords = createAsyncThunk(
    "statistical/fetchAsyncGetTotalRecords",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("statistical/total-records.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
export const fetchAsyncGetRecentTransactions = createAsyncThunk(
    "statistical/fetchAsyncGetRecentTransactions",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("statistical/get-recent-transactions.php", "get", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
const StatisticalSlice = createSlice({
    name: 'statistical',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
    }
})

const { reducer: StatisticalReducer, actions } = StatisticalSlice
export const { } = actions
export default StatisticalReducer
