import React from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/material";

import AppModal from "components/Modal/Modal";


import { modalMessages } from "constants/modal-message";
import { useDispatch } from "react-redux";
import { Toast } from "utils/Toast";

import { fetchAsyncUpdateBill } from "redux/slices/BillSlice";

const DeleteProductModal = ({

    payloadBills,
    openDeleteProductModal,
    setOpenDeleteProductModal,
    setIsActionButton,
    setUserDeleteID,

}) => {


    const dispatch = useDispatch();



    const getLabelModal = () => {
        if (payloadBills.length < 2) {
            return modalMessages.confirmChangeStatusBills.replace(/{number}/, "");
        }
        return modalMessages.confirmChangeStatusBills.replace(
            /{number}/,
            payloadBills.length
        );
    };
    const handleCloseModalDeleteIntern = () => {
        setOpenDeleteProductModal(false);
    };
    const handleConfirmModalDeleteIntern = async () => {
        try {

            await dispatch(fetchAsyncUpdateBill({ value: payloadBills })).unwrap();
            setIsActionButton(value => !value)
            setOpenDeleteProductModal(false);
            setUserDeleteID("")
            Toast('success', "Chuyển trạng thái đơn hàng thành công!");
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
                modalTitle="Chuyển trạng thái đơn hàng"
                modalConfirmMessage={getLabelModal()}
                handleConfirmModal={handleConfirmModalDeleteIntern}
                modalIcon={<ErrorOutlineIcon />}
            />
        </Box>
    );
};

export default DeleteProductModal;