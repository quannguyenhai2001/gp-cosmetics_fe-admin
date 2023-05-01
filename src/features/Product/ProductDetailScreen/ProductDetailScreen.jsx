
import { Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncGetManufacturer } from 'redux/slices/ManufacturerSlice';
import { fetchAsyncGetProduct } from 'redux/slices/ProductSlice';
import { fetchAsyncGetUserDetail } from 'redux/slices/UserSlice';
import { Toast } from 'utils/Toast';

const ProductDetailScreen = () => {
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState({})
    const { id } = useParams()
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetProduct({
                        product_id: id
                    })
                ).unwrap();
                setUserDetail(res.data)
            } catch (e) {

                Toast('warning', "Lỗi!");
            }
        })();
    }, []);
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Chi tiết sản phẩm
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
                        Tên nhà cung cấp :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail?.name}
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
                        Địa chỉ :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail?.address}
                        </Typography>
                    </Grid>
                </Grid>



            </Stack>
        </Container >
    );
};

export default ProductDetailScreen;