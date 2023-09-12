import React, { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import qs from "query-string";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppPaginate from "components/AppPaginate/AppPaginate";


import ProductsTable from "./components/ProductsTable/ProductsTable";

import { Toast } from "utils/Toast";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";
import { fetchAsyncGetAllCategories } from "redux/slices/CategorySlice";
import { fetchAsyncGetBills } from "redux/slices/BillSlice";

const initialPageInfo = {
    page: 1,
    total: 0,
    total_page: 1,
};

const BillsScreen = () => {
    const [products, setProducts] = useState([]);
    const [productsNoPagination, setProductsNoPagination] = useState([]);
    const [payloadBills, setPayloadBills] = React.useState([]);

    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActionButton, setIsActionButton] = useState(false)
    const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
    const [userDeleteID, setUserDeleteID] = useState("")
    // Search and paginate
    const location = useLocation();
    const qsParsed = qs.parse(location.search);
    // load page - fill data in fields search

    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetAllCategories({
                        use_page: 0,
                    })
                ).unwrap();
                setProductsNoPagination(res.data)
            } catch (e) {
                setProducts([]);
                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch]);
    // call API
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetBills({
                        ...qsParsed,
                        use_page: 1,
                    })
                ).unwrap();
                setProducts(res.data)
                setPageInfo(res.pageInfo)
                if (res.data.length === 0) {
                    Toast('warning', "Không có kết quả!");
                }
            } catch (e) {
                setProducts([]);
                setPageInfo(initialPageInfo);
                Toast('warning', "Lỗi!");
            }
        })();
    }, [location.search, isActionButton, dispatch]);


    const onPageChange = (_event, page) => {
        navigate({
            pathname: "/dashboard/categories",
            search: qs.stringify({ ...qsParsed, page }),
        });
    };

    const isDisabledButton = (products) => {

        if (payloadBills.length > 0) {
            return false
        }
        return true
    }


    return (
        <Box >
            <Stack direction="column" spacing={20} height="100%">
                <Stack direction="column" spacing={20}>
                    <Typography variant="h2" fontWeight="bold" fontSize="30px">
                        Danh sách hóa đơn
                    </Typography>
                </Stack>
                <Box>

                </Box>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <AppPaginate
                        count={pageInfo.total_page}
                        page={pageInfo.page}
                        sx={{ marginTop: "auto" }}
                        onChange={onPageChange}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >

                        <Button

                            sx={{
                                width: "120px",
                                "&:hover": {
                                    color: "text.light",
                                },
                            }}
                            size="small"
                            variant="contained"
                            color="error"
                            disabled={isDisabledButton(products)}
                            onClick={() => setOpenDeleteProductModal(true)}
                        >
                            Xác nhận
                        </Button>
                    </Box>
                </Stack>
                <Box spacing={20} height="100%">
                    <ProductsTable
                        products={products}
                        setProducts={setProducts}
                        pageInfo={pageInfo}
                        setPayloadBills={setPayloadBills}
                        payloadBills={payloadBills}
                        setUserDeleteID={setUserDeleteID}
                        setOpenDeleteProductModal={setOpenDeleteProductModal}
                        productsNoPagination={productsNoPagination}

                    />
                </Box>
            </Stack >
            <DeleteProductModal
                products={products}
                setPayloadBills={setPayloadBills}
                payloadBills={payloadBills}
                setUserDeleteID={setUserDeleteID}
                userDeleteID={userDeleteID}
                openDeleteProductModal={openDeleteProductModal}
                setOpenDeleteProductModal={setOpenDeleteProductModal}
                setIsActionButton={setIsActionButton}
            />
        </Box >
    );
};

export default BillsScreen;