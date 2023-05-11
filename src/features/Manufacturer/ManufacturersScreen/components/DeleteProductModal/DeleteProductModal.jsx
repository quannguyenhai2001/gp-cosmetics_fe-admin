import React from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/material";

import AppModal from "components/Modal/Modal";


import { modalMessages } from "constants/modal-message";
import { useDispatch } from "react-redux";
import { Toast } from "utils/Toast";
import { fetchAsyncDeleteManufacturers } from "redux/slices/ManufacturerSlice";

const DeleteProductModal = ({
    products,
    openDeleteProductModal,
    setOpenDeleteProductModal,
    setIsActionButton,
    setUserDeleteID,
    userDeleteID

}) => {


    const dispatch = useDispatch();

    const selectedInterns = products.filter(intern => {
        return intern.isSelected;
    });

    const getLabelModal = () => {
        if (selectedInterns.length < 2) {
            return modalMessages.confirmDeleteManufacturers.replace(/{number}/, "");
        }
        return modalMessages.confirmDeleteManufacturers.replace(
            /{number}/,
            selectedInterns.length
        );
    };
    const handleCloseModalDeleteIntern = () => {
        setOpenDeleteProductModal(false);
    };
    const handleConfirmModalDeleteIntern = async () => {
        try {
            const internsID = selectedInterns.map(intern => intern.id);
            const requestValues = userDeleteID ? {
                ids: [userDeleteID]
            } : {
                ids: internsID
            }
            await dispatch(fetchAsyncDeleteManufacturers(requestValues)).unwrap();
            setIsActionButton(value => !value)
            setOpenDeleteProductModal(false);
            setUserDeleteID("")
            Toast('success', "Xóa nhà cung cấp thành công!");
        } catch (err) {
            setOpenDeleteProductModal(false);
            Toast('warning', "Lỗi!");

        }
    };
    return (
        <Box>
            <AppModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                openModal={openDeleteProductModal}
                handleCloseModal={handleCloseModalDeleteIntern}
                modalTitle="Xóa sản phẩm"
                modalConfirmMessage={getLabelModal()}
                handleConfirmModal={handleConfirmModalDeleteIntern}
                modalIcon={<ErrorOutlineIcon />}
            />
        </Box>
    );
};

export default DeleteProductModal;