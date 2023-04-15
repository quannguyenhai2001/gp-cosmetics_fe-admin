import BlankLayout from "layouts/BlankLayout/BlankLayout";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import ProductsScreen from "screens/ProductsScreen/ProductsScreen";
import SignInScreen from "screens/SignInScreen/SignInScreen";

export const RouteConfigs = [
    {
        path: "/",
        element: SignInScreen,
        isPrivate: false,
        layout: BlankLayout,
    },
    {
        path: "/dashboard",
        element: HomeScreen,
        isPrivate: false,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/products",
        element: ProductsScreen,
        isPrivate: false,
        layout: DefaultLayout,
    },

]