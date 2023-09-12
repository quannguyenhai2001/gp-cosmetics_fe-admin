import { withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Tab } from "@mui/material";

export const useStyles = makeStyles(() => ({
    tab: {
        "&.MuiTabs-root": {
            "& .MuiTabs-flexContainer ": {
                justifyContent: "end",
            },
        },
    },
    tabpanel: {
        "&.MuiBox-root": {
            marginTop: 0,
        },
    },

    helperText: {
        position: "absolute",
        top: 40,
        margin: 0,
    },
    table: {
        "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
        },

        "& .MuiTableRow-root": {
            "&:nth-of-type(odd)": {
                backgroundColor: "rgb(243 243 243)",
            },
        },
    },
    overFlowContent: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "0.875rem",
        textAlign: "justify",
    },
}));

export const CustomTab = withStyles({
    root: {
        backgroundColor: "lightGrey",
        transition: "0.3s ease",
    },
    selected: {
        backgroundColor: "#fff000",
    },
})(Tab);