import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import InventoryIcon from '@mui/icons-material/Inventory';
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
        icon: <InventoryIcon />,
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
        icon: <ProductionQuantityLimitsIcon />,
        title: "Quản lý hóa đơn",
        to: "/dashboard/bills",
    },
    {
        icon: <StarHalfIcon />,
        title: "Quản lý đánh giá",
        to: "/dashboard/ratings",
    },
    {
        icon: <ExitToAppIcon />,
        title: "Thoát",
    },
];