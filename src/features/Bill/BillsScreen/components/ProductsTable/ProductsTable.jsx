import React from "react";

import { useTheme } from "@emotion/react";
import {

    Edit,
    Delete,


    SearchOff,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    IconButton,
    TableContainer,
    CardMedia,
    Select,
    MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AppTooltip from "components/AppTooltip/AppTooltip";

import { useStyles } from "../../UsersScreen.styles";
import convertToVND from "utils/ConvertToVND";
import { BillStatusOptions } from "constants/contants";
import { cloneDeep } from "lodash";

const ProductsTable = ({
    products,
    setProducts,
    setPayloadBills,
    payloadBills,
    productsNoPagination,
    pageInfo,
    setUserDeleteID,
    setOpenDeleteProductModal
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();

    const tableHeadContents = [

        {
            id: "10",
            label: "Mã hóa đơn",
            minWidth: 100,
        },
        {
            id: "thumbnail_url",
            label: "Người đặt hàng",
            minWidth: 100,
        },
        {
            id: "product_name",
            label: "Người nhận",
            minWidth: 100,
        },
        {
            id: "1",
            label: "Địa chỉ",
            minWidth: 100,
        }, {
            id: "2",
            label: "Số điện thoại",
            minWidth: 100,
        }, {
            id: "3",
            label: "Phương thức thanh toán",
            minWidth: 100,
        }, {
            id: "7",
            label: "Ghi chú",
            minWidth: 100,
        }, {
            id: "4",
            label: "Tổng",
            minWidth: 100,
        }, {
            id: "5",
            label: "Tình trạng",
            minWidth: 150,
        },
        {
            id: "create_at",
            label: "Ngày tạo",
            minWidth: 70,
        },
    ];


    const handleChange = (product, event) => {
        const cloneValue = cloneDeep(payloadBills)
        let updated = false;
        for (let i = 0; i < cloneValue.length; i++) {
            if (cloneValue[i].id === product.id) {
                cloneValue[i].status = event.target.value;
                updated = true;
                break;
            }
        }
        if (!updated) {
            cloneValue.push({ id: product.id, status: event.target.value });
        }
        setPayloadBills(cloneValue)
    };
    return (
        <Box>
            {!pageInfo.total ? (
                <Box textAlign="center" py={200} borderRadius={10} bgcolor="#f2f2f2">
                    <Typography>
                        <SearchOff fontSize="large" />
                    </Typography>
                    <Typography variant="h5">Không tìm thấy kết quả</Typography>
                </Box>
            ) : (
                <TableContainer
                    sx={{
                        borderTop: "none",
                        borderRadius: "5px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        minWidth: 600,
                        minHeight: products.length >= 5 ? 300 : (products.length + 1) * 65,
                    }}
                >
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        className={classes.table}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                {tableHeadContents.map(columnContent =>

                                    <TableCell
                                        key={columnContent.id}
                                        align="center"
                                        sx={{
                                            minWidth: columnContent.minWidth,
                                            bgcolor: theme.palette.grey[400],
                                            fontWeight: "bold",
                                            borderTop: "none",
                                            height: "60px",
                                        }}
                                        rowSpan={2}
                                    >
                                        {columnContent.label}
                                    </TableCell>

                                )}


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.map(product => (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        ":hover": {
                                            bgcolor: theme.palette.grey[200],
                                        },
                                    }}
                                >


                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                        size="medium"
                                    >

                                        <Link
                                            style={{
                                                color: theme.palette.text.dark,
                                                textDecoration: 'underline'
                                            }}
                                            to={`/dashboard/bill/${product.id}`}

                                        >
                                            {product.id}
                                        </Link>



                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.username}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.receiver_name}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.delivery_address}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.phone_number}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.payment_method}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.note}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {convertToVND(product.total_price)}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.status === "Hủy" || product.status === "Đã giao" ?
                                            (product.status) :
                                            (<>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    size="small"
                                                    defaultValue={product.status}
                                                    onChange={(e) => handleChange(product, e)}
                                                    fullWidth
                                                >
                                                    {
                                                        BillStatusOptions.map((option, index) => {
                                                            if (option.value === "Chờ xác nhận") {
                                                                return <MenuItem key={option.value} value={option.value} disabled>{option.label}</MenuItem>
                                                            } else if (product.status === "Chờ xác nhận" && option.value === "Đã giao") {
                                                                return <MenuItem key={option.value} value={option.value} disabled>{option.label}</MenuItem>
                                                            }
                                                            return <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </>)}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.create_at}
                                    </TableCell>




                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <AppTooltip TooltipIcon={<Edit />} title="Edit" />
        </Box>
    );
};

export default ProductsTable;