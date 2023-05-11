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
    TableSortLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AppTooltip from "components/AppTooltip/AppTooltip";

import { useStyles } from "../../ProductsScreen.styles";
import convertToVND from "utils/ConvertToVND";
import { useDispatch } from "react-redux";
import { fetchAsyncGetProducts } from "redux/slices/ProductSlice";
import { Toast } from "utils/Toast";
const initialPageInfo = {
    page: 1,
    total: 0,
    total_page: 1,
};

const ProductsTable = ({
    products,
    setProducts,
    setUserDeleteID,
    pageInfo,
    setPageInfo,
    setOpenDeleteProductModal
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tableHeadContents = [
        { id: "checkAll", minWidth: 80 },
        {
            id: "product_name",
            label: "Tên sản phẩm",
            minWidth: 100,
        },
        {
            id: "thumbnail_url",
            label: "Ảnh",
            minWidth: 120,
        },
        {
            id: "manufacturer_name",
            label: "Nhà cung cấp",
            minWidth: 120,
        },
        {
            id: "price",
            label: "Giá",
            minWidth: 70,
        },
        {
            id: "promotion",
            label: "Giảm giá",
            minWidth: 70,
        },
        {
            id: "122",
            label: "Tổng số lượng",
            minWidth: 70,
        },
        {
            id: "1223",
            label: "Số lượng đã bán",
            minWidth: 150,
        },
        {
            id: "create_at",
            label: "Ngày tạo",
            minWidth: 70,
        },
    ];

    const isCheckedCurrentProduct = (products, currentIntern) => {
        return !!products.find(
            product => product.id === currentIntern.id && product.isSelected
        );
    };
    const handleCheckProduct = (id, isChecked) => {
        const newProducts = products.map(product => {
            if (product.id === id) {
                return { ...product, isSelected: isChecked };
            }
            return product;
        });
        setProducts(newProducts);
    };
    const isCheckedAllProducts = products => {
        return !!products.every(product => product.isSelected);
    };
    const handleSelectAll = isChecked => {
        const newProducts = products.map(product => {
            return { ...product, isSelected: isChecked };
        });
        setProducts(newProducts);
    };
    const isDisabledIcon = (products) => {
        const newProducts = products.filter(product => {
            return product.isSelected
        });
        if (newProducts.length > 0) {
            return true
        }
        return false
    }
    const [order, setOrder] = React.useState('desc');
    const createSortHandler = async () => {
        try {
            const res = await dispatch(
                fetchAsyncGetProducts({
                    soft_total_sold: order === "desc" ? "desc" : "asc",
                    use_page: 1,
                })
            ).unwrap();
            setProducts(res.data)
            setPageInfo(res.pageInfo)
            if (res.data.length === 0) {
                Toast('warning', "Không có kết quả!");
            }
            setOrder(order => {
                return order === "desc" ? "asc" : "desc"
            })
        } catch (e) {
            setProducts([]);
            setPageInfo(initialPageInfo);
            Toast('warning', "Lỗi!");
        }


    }
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
                        minHeight: products.length >= 5 ? 450 : (products.length + 1) * 72.5,
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
                                {tableHeadContents.map(columnContent => {
                                    if (columnContent.id === "checkAll") {
                                        return (<TableCell
                                            key={columnContent.id}
                                            align="center"
                                            sx={{
                                                minWidth: columnContent.minWidth,
                                                bgcolor: theme.palette.grey[400],
                                                fontWeight: "bold",
                                                borderTop: "none",
                                            }}
                                            rowSpan={2}
                                        >
                                            <AppTooltip title="Chọn tất cả">
                                                <Checkbox
                                                    onChange={e => {
                                                        handleSelectAll(e.target.checked);
                                                    }}
                                                    checked={isCheckedAllProducts(products)}
                                                />
                                            </AppTooltip>
                                        </TableCell>)
                                    }
                                    else if (columnContent.id === "1223") {
                                        return (<TableCell
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
                                            <TableSortLabel

                                                direction={order}
                                                onClick={createSortHandler}
                                            >
                                                {columnContent.label}
                                            </TableSortLabel>

                                        </TableCell>)
                                    }
                                    return (<TableCell
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


                                    </TableCell>)
                                }




                                )}

                                <TableCell
                                    colSpan={4}
                                    align="center"
                                    sx={{
                                        minWidth: 100,
                                        bgcolor: theme.palette.grey[400],
                                        fontWeight: "bold",
                                        borderTop: "none",
                                    }}
                                >
                                    Thao tác
                                </TableCell>
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
                                        <Checkbox
                                            onChange={e => {
                                                handleCheckProduct(product.id, e.target.checked);
                                            }}
                                            checked={isCheckedCurrentProduct(products, product)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                        size="medium"
                                        sx={{ textDecoration: "underline" }}
                                    >
                                        <Link
                                            style={{
                                                color: theme.palette.text.dark,
                                            }}
                                            to={`/dashboard/products/${product.id}`}

                                        >
                                            {product.product_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.thumbnail_url ? (<CardMedia className={classes.rootCardMedia}
                                            component="img"
                                            height="70"
                                            image={product.thumbnail_url}
                                            alt="green iguana"
                                        />) : (
                                            "Không"
                                        )}
                                    </TableCell>

                                    <TableCell align="center" size="small">
                                        {product.manufacturer_name}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {convertToVND(product.price)}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.promotion}%
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.quantity ? product.quantity : 0}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.total_sold ? product.total_sold : 0}
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        {product.create_at}
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        size="small"
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <Box display="flex" justifyContent="center">
                                            <AppTooltip title="Chỉnh sửa">
                                                <IconButton
                                                    disabled={isDisabledIcon(products)}
                                                    onClick={() =>
                                                        navigate(`/dashboard/edit-products/${product.id}`)
                                                    }
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </AppTooltip>
                                            <AppTooltip title="Xóa">
                                                <IconButton
                                                    disabled={isDisabledIcon(products)}
                                                    onClick={() => {
                                                        setOpenDeleteProductModal(true)
                                                        setUserDeleteID(product.id)
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </AppTooltip>
                                        </Box>
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