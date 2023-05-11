
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncGetMonthlyRevenueList, fetchAsyncGetRecentTransactions, fetchAsyncGetTotalRecords } from 'redux/slices/StatisticalSlice';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Toast } from 'utils/Toast';
import { cloneDeep } from 'lodash';
import Header from 'components/Header/Header';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import convertToVND from 'utils/ConvertToVND';
import json2csv from 'json2csv';
import fileDownload from 'js-file-download';
import DownloadIcon from '@mui/icons-material/Download';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [totalRecords, setTotalRecords] = useState({})
    const [revenueStatic, setRevenueStatic] = useState([])
    const [recentTransactions, setRecentTransactions] = useState([])

    const chart = useRef(null)
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: 'Doanh thu theo tháng',
        },
        xAxis: {
            categories: [],
            dateTimeLabelFormats: {
                month: '%b %Y'
            }
        },
        yAxis: {
            title: {
                text: 'Doanh thu (VNĐ)',
            },
        },
        tooltip: {

        },
        series: [
            {
                name: 'Doanh thu',
                data: [],
            },
        ],
    });
    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(
                    fetchAsyncGetMonthlyRevenueList()
                ).unwrap();
                const res1 = await dispatch(
                    fetchAsyncGetTotalRecords()
                ).unwrap();
                const res2 = await dispatch(
                    fetchAsyncGetRecentTransactions()
                ).unwrap();
                setTotalRecords(res1.data)
                setRecentTransactions(res2.data)
                const { data } = res;
                setRevenueStatic(data)
                const categories = data.map(item => `${item.month}/${item.year}`);
                const revenueData = data.map(item => Number(item.revenue));
                const cloneOptions = cloneDeep(chartOptions)
                cloneOptions.xAxis.categories = categories;
                cloneOptions.series[0].data = revenueData;
                cloneOptions.tooltip.formatter = function () {
                    const { x, y } = this;
                    const currentMonth = x.split('/')[0];
                    const currentYear = x.split('/')[1];
                    const prevMonth = currentMonth === '1' ? '12' : `${currentMonth - 1}`;
                    const prevYear = currentMonth === '1' ? `${currentYear - 1}` : currentYear;

                    const prevRevenue = data
                        .filter(({ month, year }) => month === prevMonth && year === prevYear)
                        .reduce((prev, { revenue }) => prev + parseFloat(revenue), 0);

                    if (prevRevenue && (Number(y - prevRevenue) >= 0)) {
                        return `<b>${x}</b><br/>Doanh thu: ${y} VNĐ<br/>Tăng so với tháng trước: ${y - prevRevenue} VNĐ`;
                    } else if (prevRevenue && (Number(y - prevRevenue) < 0)) {
                        return `<b>${x}</b><br/>Doanh thu: ${y} VNĐ<br/>Giảm so với tháng trước: ${y - prevRevenue} VNĐ`;
                    }
                    return `<b>${x}</b><br/>Doanh thu: ${y} VNĐ<br/>Tăng so với tháng trước: 0 VNĐ`;

                };

                setChartOptions(cloneOptions);
            } catch (e) {
                Toast('warning', "Lỗi!");
            }
        })();
    }, [dispatch]);



    const exportCSV = () => {
        const fields = ['year', 'month', 'revenue'];
        const opts = { fields };
        const csvData = json2csv.parse(revenueStatic, opts);
        const csvBuffer = Buffer.from(csvData, 'utf-8');
        fileDownload(csvBuffer, 'revenue.csv');
    }
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="TRANG QUẢN TRỊ" />
            </Box>
            {Object.keys(totalRecords).length > 0 &&
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="120px"
                    gap="20px"
                    mb="2rem"
                >
                    <Box
                        gridColumn="span 3"
                        backgroundColor="#26a69a"
                        display="flex"
                        borderRadius="15px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box width="100%" m="0 30px">
                            <Box display="flex" justifyContent="space-between" >
                                <Box>
                                    <PersonAddIcon
                                        sx={{ fontSize: "30px", color: "white" }}
                                    />
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        {totalRecords.users.total_users}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box
                                        sx={{
                                            background: `radial-gradient(#26a69a 55%, transparent 56%),
                                             conic-gradient(transparent 0deg ${totalRecords.users.new_users_last_month / totalRecords.users.total_users * 360}deg, white ${totalRecords.users.new_users_last_month / totalRecords.users.total_users * 360}deg 360deg), black`,
                                            borderRadius: "50%",
                                            width: `${50}px`,
                                            height: `${50}px`,
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="2px">
                                <Typography fontWeight="bold"
                                    color="white">
                                    Người dùng
                                </Typography>
                                <Typography sx={{ transform: "TranslateX(-6px)", fontStyle: "italic", color: "white" }}
                                >
                                    <Typography color="white" component="span" sx={{ display: "inline-block", transform: "TranslateY(-1.8px)" }} >&uarr;</Typography> {totalRecords.users.new_users_last_month / totalRecords.users.total_users * 100}%
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor="#f35c86"
                        borderRadius="15px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box width="100%" m="0 30px">
                            <Box display="flex" justifyContent="space-between" >
                                <Box>
                                    <PriceCheckIcon
                                        sx={{ fontSize: "30px", color: "white" }}
                                    />
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        color="white"

                                    >
                                        {totalRecords.bills.total_orders}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box
                                        sx={{
                                            background: `radial-gradient(#f35c86 55%, transparent 56%),
                                             conic-gradient(transparent 0deg ${totalRecords.bills.total_orders_last_month / totalRecords.bills.total_orders * 360}deg, white ${totalRecords.bills.total_orders_last_month / totalRecords.bills.total_orders * 360}deg 360deg), black`,
                                            borderRadius: "50%",
                                            width: `${50}px`,
                                            height: `${50}px`,
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="2px">
                                <Typography fontWeight="bold"
                                    color="white">
                                    Đơn đặt
                                </Typography>
                                <Typography sx={{ transform: "TranslateX(-6px)", fontStyle: "italic", color: "white" }}
                                >
                                    <Typography component="span" sx={{ display: "inline-block", transform: "TranslateY(-1.8px)" }} >&uarr;</Typography> {Math.floor((totalRecords.bills.total_orders_last_month / totalRecords.bills.total_orders) * 100)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>



                </Box>
            }

            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item md={6.9} sx={{ backgroundColor: "#f1f4f9", borderRadius: "15px", }}>
                    <Box sx={{ padding: "1rem" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ mb: "1rem" }}>
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"

                                >
                                    Tổng doanh thu
                                </Typography>
                                <Typography
                                    fontSize="20px"
                                    fontWeight="bold"

                                >
                                    {convertToVND(totalRecords?.revenue?.total_revenue)}
                                </Typography>
                            </Box>
                            <Tooltip title="Xuất doanh thu" arrow placement="top">
                                <Button onClick={exportCSV} sx={{
                                    "&.MuiButtonBase-root": {
                                        minWidth: "40px",
                                        "& .MuiButton-startIcon": {
                                            margin: 0
                                        }
                                    }

                                }} startIcon={<DownloadIcon />}></Button>
                            </Tooltip>
                        </Box>

                        <HighchartsReact ref={chart} highcharts={Highcharts} options={chartOptions} />


                    </Box>
                </Grid>
                <Grid item md={5} sx={{ overflowY: "scroll", backgroundColor: "#f1f4f9", borderRadius: "15px", maxHeight: "300px" }}>
                    <Box>
                        <Box sx={{ borderBottom: "2px solid gray", margin: "1rem", pb: "1rem" }}>
                            <Typography
                                variant="h5"
                                fontWeight="bold"

                            >
                                Giao dịch gần đây
                            </Typography>
                        </Box>

                        {recentTransactions.length > 0 ? recentTransactions.map(transaction => (
                            <Box
                                key={transaction.username}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom="2px solid gray"
                                m="15px"
                                pb="1rem"
                            >
                                <Box>
                                    <Typography

                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {transaction.id}
                                    </Typography>
                                    <Typography >
                                        {transaction.username}
                                    </Typography>
                                </Box>
                                <Box >{transaction.create_at}</Box>
                                <Box

                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    {convertToVND(transaction.total_price)}
                                </Box>
                            </Box>
                        )) : <Typography>Không có giao dịch nào gần đây</Typography>

                        }
                    </Box>
                </Grid >
            </Grid >



        </Box >


    );
};

export default HomeScreen;