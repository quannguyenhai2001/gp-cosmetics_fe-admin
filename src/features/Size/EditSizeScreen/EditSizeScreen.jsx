
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import FormikTextField from 'components/FormElements/FormikTextField/FormikTextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchAsyncGetProduct } from 'redux/slices/ProductSlice';
import { fetchAsyncGetSize, fetchAsyncUpdateSize } from 'redux/slices/SizeSlice';
import { initEditSize, updateSizeSchema } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';

const EditSizeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    console.log(id)
    const location = useLocation()
    const product_id = location.state.product_id;
    console.log(product_id)
    const [userDetail, setUserDetail] = useState({})


    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetProduct({
                        product_id: product_id
                    })
                ).unwrap();
                const res1 = await dispatch(
                    fetchAsyncGetSize({
                        size_id: id
                    })
                ).unwrap();
                initEditSize.size_name = res1.data.size_name
                initEditSize.size_additional_price = res1.data.additional_price
                initEditSize.quantity = res1.data.quantity


                setUserDetail(res.data)
            } catch (e) {

                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch, product_id, id]);
    const submitHandle = async (values) => {
        console.log(values)
        try {
            const payload = { ...values, id: id, product_id: product_id }
            await dispatch(fetchAsyncUpdateSize(payload))
            Toast('success', "Sửa phân loại hàng thành công!");
            navigate("/dashboard/sizes")

        } catch (err) {
            Toast('warning', "Lỗi!");
        }
    }
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Chỉnh sửa phân loại hàng
            </Typography>
            <Box>
                <Typography variant="h5" fontWeight="bold" mb={10}>
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

                    </Stack>
                ) : (<>Lỗi</>)}
            </Box>
            <Formik
                initialValues={initEditSize}
                validationSchema={updateSizeSchema}
                onSubmit={(values, { setFieldError }) => {
                    submitHandle(values, setFieldError);
                }}
            >
                {({
                    errors,
                    values,
                    setFieldValue,
                    handleBlur,
                    isValid,
                    dirty,
                    setFieldError,
                    ...rest
                }) => (
                    <Form>
                        <Typography variant="h5" fontWeight="bold" mb={10} sx={{ mt: "2rem" }}>
                            Phân loại hàng
                        </Typography>
                        <Stack direction="column" spacing={20} mb="30px" >
                            <Grid
                                container
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                                    Tên phân loại hàng
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikTextField
                                        size="small"
                                        variant="outlined"
                                        id="size_name"
                                        name="size_name"
                                        label="Tên phân loại hàng"
                                        onBlur={e => {
                                            handleBlur(e);
                                            setFieldValue(
                                                "size_name",
                                                values.size_name.trim(),
                                                true
                                            );
                                        }}
                                        fullWidth
                                    />
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
                                    Giá thêm
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikTextField
                                        size="small"
                                        variant="outlined"
                                        id="size_additional_price"
                                        name="size_additional_price"
                                        label="Giá thêm"
                                        onBlur={e => {
                                            handleBlur(e);
                                            setFieldValue(
                                                "size_additional_price",
                                                values.size_additional_price.trim(),
                                                true
                                            );
                                        }}
                                        fullWidth
                                    />
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
                                    Số lượng
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikTextField
                                        size="small"
                                        variant="outlined"
                                        id="quantity"
                                        name="quantity"
                                        label="Số lượng"
                                        onBlur={e => {
                                            handleBlur(e);
                                            setFieldValue(
                                                "quantity",
                                                values.quantity.trim(),
                                                true
                                            );
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                        <Box display="flex" justifyContent="center" gap="30px" maxWidth="500px">
                            <Button
                                sx={{ minWidth: "100px" }}
                                size="large"
                                variant="contained"
                                onClick={() => navigate(-1)}
                            >
                                Hủy
                            </Button>

                            <Button
                                sx={{ minWidth: "100px" }}
                                size="large"
                                variant="contained"
                                color="signature"
                                type="submit"
                                disabled={!dirty || !isValid}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container >
    );
};

export default EditSizeScreen;