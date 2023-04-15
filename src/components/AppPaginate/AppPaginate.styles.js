import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    paginationRoot: {
        "&.MuiPagination-root": {
            "& .Mui-selected": {
                boxShadow: "0px 0px 6px #a7a7a1",
            },
        },
    },
}));