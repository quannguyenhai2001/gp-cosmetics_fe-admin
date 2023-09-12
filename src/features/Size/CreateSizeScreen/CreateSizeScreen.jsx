

import { AddCircle } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, FormControl, FormGroup, Grid, IconButton, Stack, Typography } from '@mui/material';
import FormikCombobox from 'components/FormElements/FormikCombobox/FormikCombobox';
import FormikTextField from 'components/FormElements/FormikTextField/FormikTextField';
import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSizeSchema, initCreateSizes } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';
import "./CreateProductScreen.css"
import { fetchAsyncGetProducts } from 'redux/slices/ProductSlice';
import { fetchAsyncCreateSize } from 'redux/slices/SizeSlice';
import { useStyles } from "./CreateProductScreen.styles";

const CreateSizeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const classes = useStyles();


    const [productOptions, setProductOptions] = useState([[
        {
            value: 0,
            label: "",
        },
    ]])


    useEffect(() => {
        (async () => {
            try {
                const [productData] = await Promise.all([
                    await dispatch(
                        fetchAsyncGetProducts()
                    ).unwrap(),

                ])
                const newManuOptions = productData.data.map(category => {
                    return {
                        label: category.product_name,
                        value: category.id
                    }
                })
                setProductOptions(newManuOptions)
            } catch (e) {
                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch]);





    const submitHandle = async (values) => {
        console.log(values)
        try {
            const payload = {
                ...values,
            }
            await dispatch(fetchAsyncCreateSize(payload))
            Toast('success', "Tạo phân loại hàng thành công!");
            navigate("/dashboard/sizes")

        } catch (err) {
            Toast('warning', "Lỗi!");
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Tạo phân loại hàng
            </Typography>
            <Formik
                initialValues={initCreateSizes}
                validationSchema={createSizeSchema}
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
                    <Form >
                        <Stack direction="column" spacing={20} mb="30px" >
                            <Grid
                                container
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Grid item xs={4} sm={4} md={4} lg={2} xl={4}>
                                    Chọn sản phẩm
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikCombobox
                                        size="small"
                                        variant="outlined"
                                        name="product_id"
                                        placeholder="Sản phẩm"
                                        options={productOptions}
                                        fullWidth
                                        sxPropsLabel={{ fontWeight: "bold" }}
                                    />
                                </Grid>
                            </Grid>

                            <Box>
                                <Typography variant="h5" fontWeight="bold" mb={10}>
                                    Phân loại hàng
                                </Typography>
                                <Box>
                                    <FieldArray
                                        name="sizes"
                                        render={arrayHelpersSizes => (
                                            <FormControl sx={{ width: "100%" }}>
                                                <FormGroup>
                                                    {values.sizes.map((size, sizeIndex) => (
                                                        <Box key={size.id}>
                                                            <Grid
                                                                container
                                                                alignItems="center"
                                                                mb={15}
                                                                spacing="10"
                                                            >
                                                                <Grid item xs={2}>
                                                                    <Typography required>
                                                                        Phân loại {sizeIndex + 1}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                                                    <FormikTextField
                                                                        size="small"
                                                                        variant="outlined"
                                                                        id={`sizes[${sizeIndex}].size_name`}
                                                                        name={`sizes[${sizeIndex}].size_name`}
                                                                        label="Tên phân loại"
                                                                        onBlur={e => {
                                                                            handleBlur(e);
                                                                            setFieldValue(
                                                                                `sizes[${sizeIndex}].size_name`,
                                                                                e.target.value.trim(),
                                                                                true
                                                                            );
                                                                        }}
                                                                        fullWidth
                                                                        FormHelperTextProps={{
                                                                            className: classes.helperText,
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                                                    <FormikTextField
                                                                        size="small"
                                                                        variant="outlined"
                                                                        id={`sizes[${sizeIndex}].size_additional_price`}
                                                                        name={`sizes[${sizeIndex}].size_additional_price`}
                                                                        label="Giá cộng thêm"
                                                                        onBlur={e => {
                                                                            handleBlur(e);
                                                                            setFieldValue(
                                                                                `sizes[${sizeIndex}].size_additional_price`,
                                                                                e.target.value.trim(),
                                                                                true
                                                                            );
                                                                        }}
                                                                        fullWidth
                                                                        FormHelperTextProps={{
                                                                            className: classes.helperText,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                                                    <FormikTextField
                                                                        size="small"
                                                                        variant="outlined"
                                                                        name={`sizes[${sizeIndex}].quantity`}
                                                                        id={`sizes[${sizeIndex}].quantity`}
                                                                        label="Số lượng"
                                                                        onBlur={e => {
                                                                            handleBlur(e);
                                                                            setFieldValue(
                                                                                `sizes[${sizeIndex}].quantity`,
                                                                                e.target.value.trim(),
                                                                                true
                                                                            );
                                                                        }}
                                                                        fullWidth
                                                                        FormHelperTextProps={{
                                                                            className: classes.helperText,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        onClick={() => {
                                                                            arrayHelpersSizes.remove(
                                                                                sizeIndex,
                                                                                1
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            values.sizes.length === 1
                                                                        }
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                                </FormGroup>
                                                <Stack direction="row" alignItems="center">
                                                    <IconButton
                                                        color="success"
                                                        sx={{ ml: -10 }}
                                                        onClick={() => {
                                                            return arrayHelpersSizes.insert(values.sizes.length + 1, {
                                                                id:
                                                                    (!!values.sizes.length &&
                                                                        values.sizes[values.sizes.length - 1].id + 1) ||
                                                                    1,
                                                                size_name: "",
                                                                size_additional_price: "",
                                                                quantity: ""
                                                            });
                                                        }

                                                        }
                                                    >
                                                        <AddCircle />
                                                    </IconButton>
                                                    <Typography color="text.dark" fontWeight={600}>
                                                        Thêm mục
                                                    </Typography>
                                                </Stack>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                        <Box display="flex" justifyContent="center" gap="30px">
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

export default CreateSizeScreen;