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
import { initCreateCategories, initUpdateCategories } from 'utils/FormValidate';
import { Toast } from 'utils/Toast';

const EditCategoryScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()
    const [fatherCategoriesOptions, setFatherCategoriesOptions] = useState([[
        {
            value: 0,
            label: "",
        },
    ]])
    const [categoryDetail, setCategoryDetail] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const [categoryData, categoriesData] = await Promise.all([
                    dispatch(
                        fetchAsyncGetCategory({
                            category_id: id
                        })
                    ).unwrap(),
                    dispatch(
                        fetchAsyncGetAllCategories({
                            use_page: 0,
                        })
                    ).unwrap()
                ])



                const categoriesOptions = categoriesData.data.filter(category => Number(category.father_category_id) === 0)
                const newCategoriesOptions = categoriesOptions.map(category => {
                    return {
                        label: category.name,
                        value: category.id
                    }
                })
                setFatherCategoriesOptions(newCategoriesOptions)
                setCategoryDetail(categoryData.data)
            } catch (e) {
                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch, id]);
    initUpdateCategories.category_name = categoryDetail?.name
    initUpdateCategories.father_category_id = Number(categoryDetail?.father_category_id) && categoryDetail?.father_category_id
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

export default EditCategoryScreen;