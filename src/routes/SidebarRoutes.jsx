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
        to: "/not-found",
    },
    {
        icon: <PersonAddAlt1Icon />,
        title: "Quản lý 1",
        items: [
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/not-found",
            },
        ],
    },
    {
        icon: <Diversity3Icon />,
        title: "Quản lý 2",
        items: [
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/not-found",
            },
        ],
    },
    {
        icon: <PermDataSettingIcon />,
        title: "Quản lý 3",
        items: [
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/a",
            },
        ],
    },
    {
        icon: <SettingsSuggestIcon />,
        title: "Quản lý 4",
        items: [
            {
                title: "muc 1",
                to: "/not-found",
            },
            {
                title: "muc 1",
                to: "/a",
            },
            {
                title: "muc 1",
                to: "/not-found",
            },
        ],
    },
    {
        icon: <SettingsAccessibilityIcon />,
        title: "Quản lý 5",
        items: [
            {
                title: "muc 1",
                to: "/not-found",
            },
            {
                title: "muc 1",
                to: "/change-password",
            },
        ],
    },
    {
        icon: <ExitToAppIcon />,
        title: "Thoát",
    },
];