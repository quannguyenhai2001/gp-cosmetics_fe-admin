import { makeStyles } from "@material-ui/core/styles";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles(theme => ({
    wrapAvatar: {
        "&.avatar-expanded": {
            width: "90px",
            height: "90px",
            transition: "all 0.3s ease-in-out",
            animation: "$fade-in-scale 0.75s 1 ease-in-out",
        },
        "&.avatar-collapsed": {
            transition: "all 0.3s ease-in-out",
            animation: "$fade-in 1s 1 ease-in-out",
        },
    },
    typoUsername: {
        display: "none",
        "&.username-expanded": {
            display: "block",
            transition: "all 0.75s ease-in-out",
            animation: "$fade-in-scale 0.75s 1 ease-in-out",
        },
    },
    sbParentSelected: {
        borderLeft: "4px double #53575A88",
    },
    sbParentIconExpanded: {
        transition: "all 0.75s ease-in-out",
        animation: "$fade-in-scale 0.75s 1 ease-in-out",
    },
    sbParentIconCollapsed: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "12px",
        transition: "all 0.25s linear",
        animation: "$fade-in 1.25s 1 linear",
    },
    sbParentTitleExpanded: {
        display: "block",
        transition: "all 0.75s linear",
        animation: "$fade-in 0.75s 1 ease-in",
    },
    sbParentTitleCollapsed: {
        display: "none",
        transition: "all 0.5s ease-out",
    },
    fadeIn: {
        transition: "all 0.75s ease-in-out",
        animation: "$fade-in 0.75s 1 ease-in-out",
    },
    "@keyframes fade-in": {
        "0%": {
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        },
    },
    "@keyframes fade-in-scale": {
        "0%": {
            transform: "scale(.8)",
            opacity: 0,
        },
        "100%": {
            transform: "scale(1)",
            opacity: 1,
        },
    },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));