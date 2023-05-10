
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
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
            {Object.keys(userDetail).length > 0 ? (
                <Stack direction="column" spacing={10} >
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                            Tên sản phẩm :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                {userDetail?.product_name}
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
                            Tên nhà cung cấp :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                {userDetail?.manufacturer_name}
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
                            Giá :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                {userDetail?.price}
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
                            Giảm giá :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                {userDetail?.promotion}%
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
                            Đánh giá trung bình :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                {userDetail?.rating ? (<>{userDetail?.rating.star_average}/5</>) : (<>Không</>)}
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
                            Ảnh minh họa :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Box sx={{ height: 100 }}>
                                <img style={{ height: "100%" }} src={userDetail.thumbnail_url} alt="cat" />
                            </Box>
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
                            Bộ sưu tập ảnh :
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Box sx={{ height: 120, width: "100%", overflowX: "scroll", display: "flex" }}>
                                {JSON.parse(userDetail.gallery_image_urls).map((item, index) => <img key={index} style={{ height: "100%", marginRight: 10 }} src={item} alt="cat" />)}
                            </Box>
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
                            Thông tin sản phẩm :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                <Box dangerouslySetInnerHTML={{ __html: userDetail.product_information }}></Box>
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
                            Thành phần :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                <Box dangerouslySetInnerHTML={{ __html: userDetail.ingredients }}></Box>
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
                            Hướng đẫn sử dụng :
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Typography>
                                <Box dangerouslySetInnerHTML={{ __html: userDetail.usage_instructions }}></Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Stack>
            ) : (<>Lỗi</>)}
        </Container >
    );
};

export default ProductDetailScreen;