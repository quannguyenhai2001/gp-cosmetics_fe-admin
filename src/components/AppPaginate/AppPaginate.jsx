import React, { memo } from "react";

import { Box, Pagination } from "@mui/material";

import "./AppPaginate.styles.scss";
import { useStyles } from "./AppPaginate.styles";

const AppPaginate = ({
    count,
    page = 1,
    size = "medium",
    onChange,
    color = "signature",
    sx,
    ...props
}) => {
    const classes = useStyles();

    let handleCount = 0;
    if (count) handleCount = count === 1 ? 0 : count;

    return (
        <Box {...sx}>
            {count > 1 && (
                <Box sx={{ display: "flex" }}>
                    <Pagination
                        {...props}
                        size={size}
                        count={handleCount}
                        onChange={onChange}
                        page={page}
                        color={color}
                        className={classes.paginationRoot}
                    />
                </Box>
            )}
        </Box>
    );
};
export default memo(AppPaginate);