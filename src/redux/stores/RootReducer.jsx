import productReducer from "redux/slices/productSlice";



const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {

    products: productReducer
}
const store = configureStore({
    reducer: rootReducer,
})
export default store