
import React, { useState } from "react";

import { useTheme } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Button,
    Grid,
    Box,
    Typography,

    InputAdornment,
    IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import { initLoginFormValue } from "utils/FormValidate";
import { useDispatch } from "react-redux";
import { fetchAsyncSignIn } from "redux/slices/UserSlice";
import { Toast } from "utils/Toast";





const SignInScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const changeError = () => {
        setIsError(false)
    }
    const theme = useTheme();


    const handleSubmit = async (value) => {
        try {
            await dispatch(fetchAsyncSignIn(value)).unwrap()
            Toast("success", "Đăng nhập thành công!")
            navigate("/dashboard")

        }
        catch (err) {
            setIsError(true)
            Toast("error", "Lỗi!")
        }
    }

    return (
        <Grid
            container
            sx={{
                minHeight: "100vh",
                bgcolor: theme.palette.background.default,
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid
                item
                xs={9}
                sm={7}
                md={5}
                lg={4}
                xl={4}
                sx={{
                    width: 500,
                    textAlign: "center",
                    bgcolor: theme.palette.background.default,
                    borderRadius: 5,
                    p: "20px",
                    boxShadow: 12,
                }}
            >
                <Stack spacing={10} mb={40}>
                    <Box
                        sx={{
                            width: "100px",
                            height: "auto",
                        }}
                    >
                        {/* <img src={logoImage} alt="logo" width="100%" /> */}
                    </Box>
                    <Typography
                        sx={{
                            fontSize: 30,
                            fontWeight: "bold",
                        }}
                    >
                        Đăng nhập
                    </Typography>
                </Stack>

                <Formik
                    initialValues={initLoginFormValue}
                    // validationSchema={LoginFormSchema}
                    onSubmit={(values, { setFieldError }) => {
                        handleSubmit(values, setFieldError);
                    }}
                >
                    {({ values, setFieldValue, handleBlur, isValid, dirty, ...rest }) => (
                        <Form>
                            <Stack direction="column" spacing={20}>
                                <FormikTextField
                                    required
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    id="email"
                                    label="Email"
                                    onClick={changeError}
                                    name="email"
                                    placeholder="Examle@gmail.com"
                                    onBlur={e => {
                                        handleBlur(e);
                                        setFieldValue("email", values.email.trim(), true);
                                    }}
                                />
                                <FormikTextField
                                    required
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    name="password"
                                    label="Mật khẩu"
                                    onClick={changeError}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {isError ? <Typography color="error">Email hoặc mật khẩu chưa đúng</Typography> : null}


                                <Button
                                    width="100%"
                                    size="large"
                                    variant="contained"
                                    color="signature"
                                    disabled={!isValid || !dirty}
                                    type="submit"
                                >
                                    Đăng nhập
                                </Button>
                            </Stack>


                        </Form>
                    )}
                </Formik>


            </Grid>
        </Grid>
    );
};

export default SignInScreen;