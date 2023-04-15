import React, { memo } from "react";

import { Modal, Backdrop, Typography, Button, Box, Fade } from "@mui/material";
import "./Modal.styles.scss";

const AppModal = ({
    openModal,
    handleCloseModal,
    handleConfirmModal,
    children,
    modalTitle,
    modalContent,
    modalConfirmMessage,
    hasAcceptButton = true,
    hasCancelButton = true,
    textAcceptButton = "Đồng ý",
    textCancelButton = "Hủy",
    ...props
}) => {
    return (
        <Modal
            {...props}
            className="app-modal"
            open={openModal}
            handlecloseModal={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box
                className="modal-container"
                sx={{
                    minHeight: "270px",
                    minWidth: "600px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box py={15} className="modal-title" fontWeight="bold">
                    {props.modalIcon}
                    <Typography variant="h6">{modalTitle}</Typography>
                </Box>

                <Box className="modal-content">
                    <Typography p={10}>{modalContent}</Typography>
                    <Typography fontWeight="bold" px={15}>
                        {modalConfirmMessage}
                    </Typography>
                </Box>

                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    gap={30}
                    py={25}
                    px={30}
                >
                    {hasCancelButton && (
                        <Button
                            className="cancel-btn"
                            color="success"
                            variant="outlined"
                            onClick={handleCloseModal}
                            sx={{
                                minWidth: "170px",
                                padding: "10px 0",
                                borderRadius: "30px",
                                border: "2px solid #c8c8c8ab",
                            }}
                        >
                            <Typography color="text.dark" fontWeight="bold">
                                {textCancelButton}
                            </Typography>
                        </Button>
                    )}

                    {hasAcceptButton && (
                        <Button
                            className="accept-btn"
                            variant="contained"
                            sx={{
                                minWidth: "170px",
                                borderRadius: "30px",
                            }}
                            onClick={handleConfirmModal}
                        >
                            <Typography color="text.light" fontWeight="bold">
                                {textAcceptButton}
                            </Typography>
                        </Button>
                    )}
                </Box>
            </Box>
            {/* <Fade in={openModal}>{children}</Fade> */}
        </Modal>
    );
};

export default memo(AppModal);