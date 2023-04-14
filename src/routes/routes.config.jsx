import BlankLayout from "layouts/BlankLayout/BlankLayout";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
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
        element: SignInScreen,
        isPrivate: false,
        layout: DefaultLayout,
    },
]