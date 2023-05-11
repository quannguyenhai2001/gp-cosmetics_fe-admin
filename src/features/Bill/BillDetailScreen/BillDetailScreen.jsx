import { Box, CardMedia, Container, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncGetAllBillDetails, fetchAsyncGetBill } from 'redux/slices/BillSlice';
import { Toast } from 'utils/Toast';
import { useStyles } from "./UsersScreen.styles";
import { useTheme } from "@emotion/react";

const BillDetailScreen = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const [bill, setBill] = useState([])

    const { id } = useParams()
    const classes = useStyles();
    const theme = useTheme();

    const tableHeadContents = [

        {
            id: "10",
            label: "Tên sản phẩm",
            minWidth: 100,
        },
        {
            id: "12212121",
            label: "Ảnh",
            minWidth: 100,
        },
        {
            id: "11110",
            label: "Tên phân loại",
            minWidth: 100,
        },

        {
            id: "thumbnail_url",
            label: "Giá sản phẩm",
            minWidth: 100,
        },
        {
            id: "212121",
            label: "Giá cộng thêm",
            minWidth: 100,
        },
        {
            id: "product_name",
            label: "Giảm giá",
            minWidth: 100,
        }
    ];
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetAllBillDetails({
                        bill_id: id
                    })
                ).unwrap();
                const res1 = await dispatch(
                    fetchAsyncGetBill({
                        bill_id: id
                    })
                ).unwrap();
                setBill(res1.data)
                setProducts(res.data)
            } catch (e) {

                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch, id]);
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Chi tiết hóa đơn
            </Typography>
            <Stack direction="column" spacing={10} >

                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                        Người nhận :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {bill.receiver_name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                        Địa chỉ giao hàng :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {bill.delivery_address}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                        Phương thức thanh toán :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {bill.payment_method}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                        Ghi chú :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {bill.note}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                        Tình trạng :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {bill.status}
                        </Typography>
                    </Grid>
                </Grid>


            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ m: "1rem 0" }}>
                Thông tin sản phẩm
            </Typography>
            <Box>
                <TableContainer
                    sx={{
                        borderTop: "none",
                        borderRadius: "5px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        minWidth: 600,
                        minHeight: products.length >= 5 ? 100 : (products.length + 1) * 5,
                    }}
                >
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        className={classes.table}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                {tableHeadContents.map(columnContent =>

                                    <TableCell
                                        key={columnContent.id}
                                        align="center"
                                        sx={{
                                            minWidth: columnContent.minWidth,
                                            bgcolor: theme.palette.grey[400],
                                            fontWeight: "bold",
                                            borderTop: "none",
                                            height: "60px",
                                        }}
                                        rowSpan={2}
                                    >
                                        {columnContent.label}
                                    </TableCell>

                                )}


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.map(product => (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        ":hover": {
                                            bgcolor: theme.palette.grey[200],
                                        },
                                    }}
                                >



                                    <TableCell align="center" size="small">
                                        {product.product_name}
                                    </TableCell>


                                    <TableCell align="center" size="small">
                                        {product.thumbnail_url ? (<CardMedia className={classes.rootCardMedia}
                                            component="img"
                                            height="70"
                                            image={product.thumbnail_url}
                                            alt="green iguana"
                                        />) : (
                                            "Không"
                                        )}
                                    </TableCell>

                                    <TableCell align="center" size="small">
                                        {product.size_name}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.product_price}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.size_additional_price}
                                    </TableCell>

                                    <TableCell align="center" size="small">
                                        {product.product_promotion}%
                                    </TableCell>



                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Container >
    );
};

export default BillDetailScreen;