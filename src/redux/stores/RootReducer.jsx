import manufacturerReducer from "redux/slices/ManufacturerSlice";
import productReducer from "redux/slices/ProductSlice";
import sizeReducer from "redux/slices/SizeSlice";
import userReducer from "redux/slices/UserSlice";


const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
    user: userReducer,
    products: productReducer,
    sizes: sizeReducer,
    manufacturers: manufacturerReducer
}
const store = configureStore({
    reducer: rootReducer,
})
export default store