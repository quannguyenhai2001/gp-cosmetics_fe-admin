import instanceApi, { CallApiByBody, CallApiByParams } from "api/configApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {

};

export const fetchAsyncGetAllRatings = createAsyncThunk(
    "rating/fetchAsyncGetAllRatings",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByParams("ratings/get-all-ratings.php", "get", data)
            return response.data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);
export const fetchAsyncDeleteRating = createAsyncThunk(
    "rating/fetchAsyncDeleteRating",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CallApiByBody("ratings/delete-rating.php", "delete", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    }
})

const { reducer: ratingReducer } = ratingSlice
export default ratingReducer
