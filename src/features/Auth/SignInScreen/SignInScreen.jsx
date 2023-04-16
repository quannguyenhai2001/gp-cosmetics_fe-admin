
import React, { useState } from "react";

import { useTheme } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Button,
    Grid,
    Box,
    Typography,
    Divider,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import { initLoginFormValue } from "utils/FormValidate";





const SignInScreen = () => {


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const theme = useTheme();


    const loginHandler = ({ email, password }) => {
        // const payload = {
        //     email,
        //     password,
        //     grant_type: "password",
        // };
        // dispatch(postLogin(payload)).then(res => {
        //     const { payload } = res;
        //     const destinationPath =
        //         payload.first_login_flag === FIRST_LOGIN_STATES.FALSE
        //             ? AUTH_PATHS.CHANGE_PASSWORD
        //             : STAFF_PATHS.STAFF_LIST;
        //     dispatch(getAuthUser({ id: payload.user_id }));
        //     history.push(destinationPath);
        // });
    };

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
                        loginHandler(values, setFieldError);
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
                                    label="Email Address"
                                    name="email"
                                    placeholder="Nhập Email"
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
                                    label="Password"
                                    placeholder="Nhập Password"
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

                            <Divider
                                sx={{
                                    mt: 20,
                                }}
                            />
                        </Form>
                    )}
                </Formik>

                <Stack mt={20}>
                    <Box>
                        <Link color="primary">
                            Quên mật khẩu
                        </Link>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default SignInScreen;