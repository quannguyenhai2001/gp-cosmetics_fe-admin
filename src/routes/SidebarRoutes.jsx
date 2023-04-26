import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
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
                title: "Quản lý phân loại hàng",
                to: "/dashboard/sizes",

            },

        ],
    },
    {
        icon: <Diversity3Icon />,
        title: "Quản lý danh mục",
        to: "/2",
    },
    {
        icon: <PermDataSettingIcon />,
        title: "Quản lý nhà cung cấp",
        to: "/dashboard/manufacturers",

    },
    {
        icon: <SettingsSuggestIcon />,
        title: "Quản lý hóa đơn",
        to: "/4",
    },
    {
        icon: <SettingsSuggestIcon />,
        title: "Quản lý đánh giá",
        to: "/4",
    },
    {
        icon: <ExitToAppIcon />,
        title: "Thoát",
    },
];