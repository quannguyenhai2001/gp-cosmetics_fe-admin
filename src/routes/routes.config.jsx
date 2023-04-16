import BlankLayout from "layouts/BlankLayout/BlankLayout";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";



import ProductsScreen from "features/Product/ProductsScreen/ProductsScreen";
import SignInScreen from "features/Auth/SignInScreen/SignInScreen";
import HomeScreen from "features/Home/HomeScreen/HomeScreen";
import SizesScreen from "features/Size/SizesScreen/SizesScreen";

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
    {
        path: "/dashboard/sizes",
        element: SizesScreen,
        isPrivate: false,
        layout: DefaultLayout,
    },

]