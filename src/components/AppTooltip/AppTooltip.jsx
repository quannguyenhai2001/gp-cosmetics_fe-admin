import React, { memo } from "react";

import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";

function AppTooltip({ title, arrow = true, placement = "top", ...props }) {
    return (
        <Tooltip title={title} {...props} placement={placement} arrow={arrow}>
            <Box>{props.children}</Box>
        </Tooltip>
    );
}

export default memo(AppTooltip);