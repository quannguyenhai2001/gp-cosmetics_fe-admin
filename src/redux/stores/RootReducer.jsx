import billReducer from "redux/slices/BillSlice";
import categoryReducer from "redux/slices/CategorySlice";
import manufacturerReducer from "redux/slices/ManufacturerSlice";
import productReducer from "redux/slices/ProductSlice";
import ratingReducer from "redux/slices/RatingSlice";
import sizeReducer from "redux/slices/SizeSlice";
import StatisticalReducer from "redux/slices/StatisticalSlice";
import userReducer from "redux/slices/UserSlice";


const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
    user: userReducer,
    products: productReducer,
    sizes: sizeReducer,
    manufacturers: manufacturerReducer,
    categories: categoryReducer,
    ratings: ratingReducer,
    bills: billReducer,
    statistical: StatisticalReducer
}
const store = configureStore({
    reducer: rootReducer,
})
export default store