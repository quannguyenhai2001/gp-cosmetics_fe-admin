import React, { useState, memo, useMemo, useEffect } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    Box,
    Button,
    Avatar,

    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Tooltip,
    Zoom,
    styled,
    tooltipClasses,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from 'assets/images/logo/logo_web.png';

import AppModal from "components/Modal/Modal";



import { sidebarMenuItems } from "routes/SidebarRoutes";

import "./AppSidebar.styles.scss";
import { useStyles, StyledBadge } from "./AppSidebar.styles";
import { hasChildren } from "./helpers/AppSidebar.helpers";
import { useDispatch, useSelector } from "react-redux";

const MultiLevel = ({ item, isSidebarExpanded, isChildItem = false }) => {
    const classes = useStyles();

    const location = useLocation();
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!isSidebarExpanded) {
            setOpen(false);
        }
    }, [isSidebarExpanded]);

    const handleClick = () => {
        if (!isSidebarExpanded) {
            return;
        }
        setOpen(prev => !prev);
    };

    const parentSelected = useMemo(() => {
        return (
            item.items &&
            item.items.length &&
            item.items.some(o => o.to?.includes(location.pathname))
        );
    }, [location, item]);

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                // selected={parentSelected}
                className={`${parentSelected && classes.sbParentSelected}`}
            >
                <ListItemIcon
                    className={`${isSidebarExpanded && !isChildItem
                        ? classes.sbParentIconExpanded
                        : classes.sbParentIconCollapsed
                        }`}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    className={`${isSidebarExpanded
                        ? classes.sbParentTitleExpanded
                        : classes.sbParentTitleCollapsed
                        }`}
                    primary={item.title}
                />
                {isSidebarExpanded &&
                    (open ? (
                        <ExpandLessIcon className={classes.fadeIn} />
                    ) : (
                        <ExpandMoreIcon className={classes.fadeIn} />
                    ))}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, index) => (
                        <MenuItem
                            key={child.title}
                            item={child}
                            isExpand={isSidebarExpanded}
                            isChildItem
                        />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

const SingleLevel = ({ item, isSidebarExpanded }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectMenu = () => {
        // if (!item.to || item.to === location.pathname) {
        //     setOpenCancelModal(true);
        // }
        navigate(item.to);
    };

    return (
        <ListItemButton
            onClick={redirectMenu}
            // selected={item.to === location.pathname}
            className={`${item.to === location.pathname && classes.sbParentSelected}`}
        >
            <ListItemIcon
                className={`${isSidebarExpanded
                    ? classes.sbParentIconExpanded
                    : classes.sbParentIconCollapsed
                    }`}
            >
                {item.icon}
            </ListItemIcon>
            <ListItemText
                className={`${isSidebarExpanded
                    ? classes.sbParentTitleExpanded
                    : classes.sbParentTitleCollapsed
                    }`}
                primary={item.title}
            />
        </ListItemButton>
    );
};

const MenuItem = ({
    item,
    setOpenCancelModal,
    isExpand,
    isChildItem = false,
}) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return (
        <Component
            setOpenCancelModal={setOpenCancelModal}
            item={item}
            isSidebarExpanded={isExpand}
            isChildItem={isChildItem}
        />
    );
};

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.text.dark,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const AppSidebar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isExpand, setIsExpand] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const userInfo = useSelector(state => state.user.userInfo);


    const handleCollapseSideBar = () => {
        setIsExpand(!isExpand);
    };

    const [openCancelModal, setOpenCancelModal] = useState(false);
    const handleCloseModalCancel = () => {
        setOpenCancelModal(false);
    };
    const handleConfirmCancel = async () => {

    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            className={`wrapper-sidebar ${isExpand ? "sidebar-expanded" : "sidebar-collapsed"
                }`}

            bgcolor="rgb(252 252 252)"
        >
            <Box
                my={20}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    sx={{ maxWidth: 140, marginBottom: 20, p: "0 5px" }}
                    bgcolor="signature"
                >
                    <img style={{ width: "100%" }} src={logo} alt="green iguana" />
                </Box>
                <Box>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        width="100px"
                        height="100px"
                    >
                        <Avatar
                            className={`${classes.wrapAvatar} ${isExpand ? "avatar-expanded" : "avatar-collapsed"
                                }`}
                            alt={userInfo.display_name}
                            src={userInfo.avatar}
                        />
                    </StyledBadge>
                </Box>
                <Typography
                    my={12}
                    variant="h3"
                    fontSize={16}
                    fontWeight="bold"
                    className={`${classes.typoUsername} ${isExpand && "username-expanded"
                        }`}
                >
                    {userInfo.display_name}
                </Typography>
            </Box>
            <Box flexGrow={1} className="wrap-menu-items">
                {sidebarMenuItems.map(item => (
                    <LightTooltip
                        onClick={() => {
                            if (!isExpand && item.items) {
                                navigate(item.items[0].to);
                            }
                        }}
                        arrow
                        key={item.title}
                        TransitionComponent={Zoom}
                        placement="right"
                        title={
                            isExpand
                                ? ""
                                : (item.items && (
                                    <List component="nav">
                                        {item.items.map(i => (
                                            <ListItemButton
                                                key={i.title}
                                                selected={i.to === location.pathname}
                                                className={`${i.to === location.pathname &&
                                                    classes.sbParentSelected
                                                    }`}
                                            >
                                                <ListItemText
                                                    primary={i.title}
                                                    onClick={() => navigate(i.to)}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )) ||
                                ""
                        }
                    >
                        <Box>
                            <MenuItem
                                key={item.title}
                                item={item}
                                // setOpenCancelModal={setOpenCancelModal}
                                isExpand={isExpand}
                            />
                        </Box>
                    </LightTooltip>
                ))}
            </Box>
            <Button
                aria-label="Open sidebar"
                className={`btn-display-sidebar ${isExpand
                    ? "btn-display-sidebar--open"
                    : "btn-display-sidebar--collapse"
                    }`}
                onClick={handleCollapseSideBar}
            >
                {isExpand ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </Button>

            <AppModal
                openModal={openCancelModal}
                handleCloseModal={handleCloseModalCancel}
                handleConfirmModal={handleConfirmCancel}
                modalTitle="Đăng xuất"
                modalConfirmMessage="Bạn có chắc chắn muốn đăng xuất không?"
                modalIcon={<LogoutIcon />}
            />
        </Box>
    );
};

export default memo(AppSidebar);