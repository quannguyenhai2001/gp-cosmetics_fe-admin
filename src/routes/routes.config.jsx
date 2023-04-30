import BlankLayout from "layouts/BlankLayout/BlankLayout";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";



import ProductsScreen from "features/Product/ProductsScreen/ProductsScreen";
import SignInScreen from "features/Auth/SignInScreen/SignInScreen";
import HomeScreen from "features/Home/HomeScreen/HomeScreen";
import SizesScreen from "features/Size/SizesScreen/SizesScreen";
import ProductDetailScreen from "features/Product/ProductDetailScreen/ProductDetailScreen";
import CreateProductScreen from "features/Product/CreateProductScreen/CreateProductScreen";
import EditProductScreen from "features/Product/EditProductScreen/EditProductScreen";
import SizeDetailScreen from "features/Size/SizeDetailScreen/SizeDetailScreen";
import EditSizeScreen from "features/Size/EditSizeScreen/EditSizeScreen";
import CreateSizeScreen from "features/Size/CreateSizeScreen/CreateSizeScreen";
import UsersScreen from "features/User/UsersScreen/UsersScreen";
import UserDetailScreen from "features/User/UserDetailScreen/UserDetailScreen";
import ManufacturersScreen from "features/Manufacturer/ManufacturersScreen/ManufacturersScreen";
import CategoriesScreen from "features/Category/CategoriesScreen/CategoriesScreen";

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
        path: "/dashboard/users",
        element: UsersScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/users/:id",
        element: UserDetailScreen,
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
    {
        path: "/dashboard/size/:id",
        element: SizeDetailScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/edit-size/:id",
        element: EditSizeScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/create-size",
        element: CreateSizeScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/manufacturers",
        element: ManufacturersScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
    {
        path: "/dashboard/categories",
        element: CategoriesScreen,
        isPrivate: true,
        layout: DefaultLayout,
    },
]