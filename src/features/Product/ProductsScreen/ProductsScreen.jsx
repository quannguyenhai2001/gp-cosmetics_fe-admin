import React, { useState, useEffect } from "react";
import {
    AddCircleOutline,
    Delete,
    NoAccounts,
    Search,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { Form, Formik } from "formik";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppPaginate from "components/AppPaginate/AppPaginate";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";

import ProductsTable from "./components/ProductsTable/ProductsTable";
import { fetchAsyncGetProducts } from "redux/slices/ProductSlice";
import { initSearchProductsValue } from "utils/FormValidate";
import removeEmptyValuesInObject from "utils/removeEmptyValuesInObject";
import { Toast } from "utils/Toast";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";

const initialPageInfo = {
    page: 1,
    total: 0,
    total_page: 1,
};

const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActionButton, setIsActionButton] = useState(false)
    const [userDeleteID, setUserDeleteID] = useState("")

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
                    fetchAsyncGetProducts({
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
    }, [location.search, isActionButton]);

    const handleSearchInterviews = values => {
        const newInitSearchValues = removeEmptyValuesInObject(values);
        navigate({
            pathname: "/dashboard/products",
            search: qs.stringify(newInitSearchValues),
        });
    };
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
    const isDisableSearchButton = ({ dirty, submitCount }) => {
        if ((!submitCount && dirty) || submitCount) {
            return false;
        }
        return true;
    };
    return (
        <Box >
            <Stack direction="column" spacing={20} height="100%">
                <Stack direction="column" spacing={20}>
                    <Typography variant="h2" fontWeight="bold" fontSize="30px">
                        Danh sách sản phẩm
                    </Typography>
                </Stack>
                <Box>
                    <Formik
                        initialValues={initSearchProductsValue}
                        onSubmit={handleSearchInterviews}
                    >
                        {({
                            values,
                            setFieldValue,
                            handleBlur,
                            dirty,
                            submitCount
                        }) => {
                            return (
                                <Form>
                                    <Grid container sx={{ display: "flex", alignItems: "center" }}>
                                        <Grid item xs={6} sm={4} md={2} mr={10} mt={10}>
                                            <Box>
                                                <FormikTextField
                                                    size="small"
                                                    variant="outlined"
                                                    id="product_name"
                                                    name="product_name"
                                                    label="Tên sản phẩm"
                                                    onBlur={e => {
                                                        handleBlur(e);
                                                        setFieldValue(
                                                            "product_name",
                                                            values.product_name.trim(),
                                                            true
                                                        );
                                                    }}
                                                    fullWidth
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={2} mr={10} mt={10}>
                                            <Box>
                                                <FormikTextField
                                                    size="small"
                                                    variant="outlined"
                                                    id="manufacturer_name"
                                                    name="manufacturer_name"
                                                    label="Tên nhà cung cấp"
                                                    onBlur={e => {
                                                        handleBlur(e);
                                                        setFieldValue(
                                                            "manufacturer_name",
                                                            values.manufacturer_name.trim(),
                                                            true
                                                        );
                                                    }}
                                                    fullWidth
                                                />
                                            </Box>
                                        </Grid>


                                        <Grid item xs={6} sm={4} md={2} mt={10}>
                                            <Box>
                                                <Button
                                                    sx={{ width: "120px" }}
                                                    startIcon={<Search />}
                                                    size="small"
                                                    variant="contained"
                                                    color="signature"
                                                    type="submit"
                                                    disabled={isDisableSearchButton({ dirty, submitCount })}
                                                >
                                                    Tìm kiếm
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Form>
                            );
                        }}
                    </Formik>
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
                                navigate("/dashboard/create-products")
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

export default ProductsScreen;