import React, { useState, useEffect } from "react";
import {
    AddCircleOutline,
    Delete,

} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import qs from "query-string";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppPaginate from "components/AppPaginate/AppPaginate";


import ProductsTable from "./components/ProductsTable/ProductsTable";
import { initSearchProductsValue } from "utils/FormValidate";
import { Toast } from "utils/Toast";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";
import { fetchAsyncGetManufacturers } from "redux/slices/ManufacturerSlice";

const initialPageInfo = {
    page: 1,
    total: 0,
    total_page: 1,
};

const ManufacturersScreen = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userDeleteID, setUserDeleteID] = useState("")

    const [isActionButton, setIsActionButton] = useState(false)

    const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

    // Search and paginate
    const location = useLocation();
    const qsParsed = qs.parse(location.search);
    // load page - fill data in fields search
    useEffect(() => {
        initSearchProductsValue.product_name = qsParsed.product_name ?? "";
        initSearchProductsValue.manufacturer_name = qsParsed.manufacturer_name ?? "";
    }, []);

    // call API
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetManufacturers({
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
    }, [location.search, isActionButton, dispatch, qsParsed]);


    const onPageChange = (_event, page) => {
        navigate({
            pathname: "/dashboard/products",
            search: qs.stringify({ ...qsParsed, page }),
        });
    };

    const isDisabledButton = (products) => {
        const newProducts = products.filter(product => {
            return product.isSelected
        });
        if (newProducts.length > 0) {
            return false
        }
        return true
    }

    return (
        <Box >
            <Stack direction="column" spacing={20} height="100%">
                <Stack direction="column" spacing={20}>
                    <Typography variant="h2" fontWeight="bold" fontSize="30px">
                        Danh sách nhà cung cấp
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
                            startIcon={<AddCircleOutline />}
                            sx={{
                                width: "120px",
                            }}
                            onClick={() =>
                                navigate("/dashboard/create-manufacturer")
                            }
                            size="small"
                            variant="contained"
                            color="signature"
                        >
                            Tạo mới
                        </Button>
                        <Button
                            startIcon={<Delete />}
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
                            Xóa
                        </Button>
                    </Box>
                </Stack>
                <Box spacing={20} height="100%">
                    <ProductsTable
                        products={products}
                        setProducts={setProducts}
                        pageInfo={pageInfo}
                        setUserDeleteID={setUserDeleteID}

                        setOpenDeleteProductModal={setOpenDeleteProductModal}

                    />
                </Box>
            </Stack>
            <DeleteProductModal
                products={products}
                setUserDeleteID={setUserDeleteID}
                userDeleteID={userDeleteID}
                openDeleteProductModal={openDeleteProductModal}
                setOpenDeleteProductModal={setOpenDeleteProductModal}
                setIsActionButton={setIsActionButton}
            />
        </Box>
    );
};

export default ManufacturersScreen;