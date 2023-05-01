import { Autocomplete, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import FormikCombobox from 'components/FormElements/FormikCombobox/FormikCombobox';
import FormikTextField from 'components/FormElements/FormikTextField/FormikTextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAsyncCreateCategory, fetchAsyncGetAllCategories, fetchAsyncGetCategory, fetchAsyncUpdateCategory } from 'redux/slices/CategorySlice';
import { fetchAsyncGetManufacturer } from 'redux/slices/ManufacturerSlice';
import { initCreateCategories, initUpdateCategories } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';

const EditManufacturer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()
    const [categoryDetail, setCategoryDetail] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetManufacturer({
                        manufacturer_id: id
                    })
                ).unwrap();
                setCategoryDetail(res.data)
            } catch (e) {
                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch, id]);
    initUpdateCategories.manufacturer_name = categoryDetail?.name
    initUpdateCategories.manufacturer_address = categoryDetail?.address
    const submitHandle = async (values) => {
        console.log(values)
        try {
            const payload = { ...values, id: id }
            await dispatch(fetchAsyncUpdateCategory(payload))
            Toast('success', "Chỉnh sửa danh mục thành công!");
            navigate("/dashboard/categories")

        } catch (err) {
            Toast('warning', "Lỗi!");
        }
    }
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Tạo danh mục
            </Typography>
            <Formik
                initialValues={initUpdateCategories}
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
                        <Stack direction="column" spacing={20} mb="30px" >
                            <Grid
                                container
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                                    Tên nhà cung cấp
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
                                    Địa chỉ
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikTextField
                                        size="small"
                                        variant="outlined"
                                        id="manufacturer_address"
                                        name="manufacturer_address"
                                        label="Địa chỉ"
                                        onBlur={e => {
                                            handleBlur(e);
                                            setFieldValue(
                                                "manufacturer_address",
                                                values.manufacturer_address.trim(),
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


                            >
                                Hủy
                            </Button>

                            <Button
                                sx={{ minWidth: "100px" }}
                                size="large"
                                variant="contained"
                                color="signature"
                                type="submit"
                                disabled={!dirty}
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

export default EditManufacturer;