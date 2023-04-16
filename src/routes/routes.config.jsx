import BlankLayout from "layouts/BlankLayout/BlankLayout";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";



import ProductsScreen from "features/Product/ProductsScreen/ProductsScreen";
import SignInScreen from "features/Auth/SignInScreen/SignInScreen";
import HomeScreen from "features/Home/HomeScreen/HomeScreen";
import SizesScreen from "features/Size/SizesScreen/SizesScreen";
import ProductDetailScreen from "features/Product/ProductDetailScreen/ProductDetailScreen";
import CreateProductScreen from "features/Product/CreateProductScreen/CreateProductScreen";
import EditProductScreen from "features/Product/EditProductScreen/EditProductScreen";

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
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/products",
        element: ProductsScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/products/:id",
        element: ProductDetailScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/edit-products/:id",
        element: EditProductScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/create-products",
        element: CreateProductScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/sizes",
        element: SizesScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },

]