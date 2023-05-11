import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import FormikTextField from 'components/FormElements/FormikTextField/FormikTextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAsyncCreateManufacturer } from 'redux/slices/ManufacturerSlice';
import { initCreateManufacturers } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';

const CreateManufacturer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submitHandle = async (values) => {
        console.log(values)
        try {
            const payload = { ...values }
            await dispatch(fetchAsyncCreateManufacturer(payload))
            Toast('success', "Tạo nhà cung cấp thành công!");
            navigate("/dashboard/manufacturers")

        } catch (err) {
            Toast('warning', "Lỗi!");
        }
    }
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Tạo nhà cung cấp
            </Typography>
            <Formik
                initialValues={initCreateManufacturers}
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

export default CreateManufacturer;