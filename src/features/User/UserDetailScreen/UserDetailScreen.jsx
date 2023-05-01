import { Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncGetUserDetail } from 'redux/slices/UserSlice';
import { Toast } from 'utils/Toast';

const UserDetailScreen = () => {
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState({})
    const { id } = useParams()
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetUserDetail({
                        user_id: id
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
                Chi tiết người dùng
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
                        Họ và tên :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.display_name}
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
                        Tên người dùng :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.username}
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
                        Email :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.email}
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
                            {userDetail.address}
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
                        Giới tính :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.sex}
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
                        Tuổi :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.age}
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
                        Số điện thoại :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.phone_number}
                        </Typography>
                    </Grid>
                </Grid>

            </Stack>
        </Container >
    );
};

export default UserDetailScreen;