import React from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import AppModal from "components/Modal/Modal";
// import { deleteInternships } from "features/internship/redux/internship.slice";


import { modalMessages } from "constants/modal-message";
import { fetchAsyncDeleteProduct } from "redux/slices/ProductSlice";
import { useDispatch } from "react-redux";
import { Toast } from "utils/Toast";

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
            return modalMessages.confirmDeleteProducts.replace(/{number}/, "");
        }
        return modalMessages.confirmDeleteProducts.replace(
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
            await dispatch(fetchAsyncDeleteProduct(requestValues)).unwrap();
            setIsActionButton(value => !value)
            setOpenDeleteProductModal(false);
            Toast('success', "Xóa sản phẩm thành công!");
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