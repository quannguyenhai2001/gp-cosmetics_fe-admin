import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";



export const sidebarMenuItems = [
    {
        icon: <HomeIcon />,
        title: "Trang chủ",
        to: "/dashboard",
    },
    {
        icon: <AccountCircleIcon />,
        title: "Quản lý người dùng",
        to: "/dashboard/users",
    },
    {
        icon: <PersonAddAlt1Icon />,
        title: "Quản lý sản phẩm",
        items: [
            {
                title: "Danh sách sản phẩm",
                to: "/dashboard/products",
            },
            {
                title: "Danh sách phân loại hàng",
                to: "/dashboard/sizes",
            },

        ],
    },
    {
        icon: <Diversity3Icon />,
        title: "Quản lý danh mục",
        to: "/dashboard/categories",
    },
    {
        icon: <PermDataSettingIcon />,
        title: "Quản lý nhà cung cấp",
        to: "/dashboard/manufacturers",

    },
    {
        icon: <SettingsSuggestIcon />,
        title: "Quản lý hóa đơn",
        to: "/dashboard/bills",
    },
    {
        icon: <SettingsSuggestIcon />,
        title: "Quản lý đánh giá",
        to: "/dashboard/ratings",
    },
    {
        icon: <ExitToAppIcon />,
        title: "Thoát",
    },
];