import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import FormikCombobox from 'components/FormElements/FormikCombobox/FormikCombobox';
import FormikTextField from 'components/FormElements/FormikTextField/FormikTextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAsyncCreateCategory, fetchAsyncGetAllCategories } from 'redux/slices/CategorySlice';
import { createCateSchema, initCreateCategories } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';

const CreateCategoryScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [fatherCategoriesOptions, setFatherCategoriesOptions] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetAllCategories({
                        use_page: 0,
                    })
                ).unwrap();
                const categoriesOptions = res.data.filter(category => Number(category.father_category_id) === 0)
                const newCategoriesOptions = categoriesOptions.map(category => {
                    return {
                        label: category.name,
                        value: category.id
                    }
                })
                setFatherCategoriesOptions(newCategoriesOptions)
            } catch (e) {


                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch]);

    const submitHandle = async (values) => {
        console.log(values)
        try {
            await dispatch(fetchAsyncCreateCategory(values))
            Toast('success', "Tạo danh mục thành công!");
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
                initialValues={initCreateCategories}
                validationSchema={createCateSchema}
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
                                    Tên danh mục
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikTextField
                                        size="small"
                                        variant="outlined"
                                        id="category_name"
                                        name="category_name"
                                        label="Tên danh mục"
                                        onBlur={e => {
                                            handleBlur(e);
                                            setFieldValue(
                                                "category_name",
                                                values.category_name.trim(),
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
                                    Danh mục cha
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <FormikCombobox
                                        size="small"
                                        variant="outlined"
                                        name="father_category_id"
                                        placeholder="Danh mục cha"
                                        options={fatherCategoriesOptions}
                                        fullWidth
                                        sxPropsLabel={{ fontWeight: "bold" }}
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

export default CreateCategoryScreen;