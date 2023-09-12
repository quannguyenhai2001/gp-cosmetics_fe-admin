import { Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncGetManufacturer } from 'redux/slices/ManufacturerSlice';
import { Toast } from 'utils/Toast';

const ManufacturerDetailScreen = () => {
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState({})
    const { id } = useParams()
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetManufacturer({
                        manufacturer_id: id
                    })
                ).unwrap();
                setUserDetail(res.data)
            } catch (e) {

                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch, id]);
    return (
        <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" fontSize="30px" mb={30}>
                Chi tiết nhà cung cấp
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
                        Tên nhà cung cấp :
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Typography>
                            {userDetail.name}
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



            </Stack>
        </Container >
    );
};

export default ManufacturerDetailScreen;