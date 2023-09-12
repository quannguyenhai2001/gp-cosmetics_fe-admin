import * as yup from "yup";
export const createProductNameValidateSchema = () =>
    yup
        .string()
        .required("Tên sản phẩm không được để trống");

export const createProductSizeValidateSchema = () =>
    yup
        .number()
        .typeError("Giá phải là kiểu sô")
        .required("Giá không được để trống");

export const createProductPromotionValidateSchema = () =>
    yup
        .number()
        .typeError("Giảm giá phải là kiểu sô")
        .required("Giảm giá không được để trống");

export const createProductCateIDValidateSchema = () =>
    yup
        .number()
        .required("Danh mục không được để trống");

export const createProductManuIDValidateSchema = () =>
    yup
        .number()
        .required("Nhà cung cấp không được để trống");


export const createProductSizesValidateSchema = () =>
    yup.array().of(
        yup.object().shape({
            size_name: yup
                .string()
                .required("Tên phân loại không được để trống"),
            size_additional_price: yup.number()
                .typeError("Giá cộng thêm phải là kiểu sô")
                .required("Giá cộng thêm không được để trống"),
            quantity: yup.number()
                .typeError("Số lượng phải là kiểu sô")
                .required("Số lượng không được để trống"),
        })
    );
export const createProductSchema = yup.object().shape({
    product_name: createProductNameValidateSchema({}),
    product_price: createProductSizeValidateSchema({}),
    product_promotion: createProductPromotionValidateSchema({}),
    manufacturer_id: createProductManuIDValidateSchema({}),
    category_id: createProductCateIDValidateSchema({}),
    sizes: createProductSizesValidateSchema({}),
});
export const updateProductSchema = yup.object().shape({
    product_name: createProductNameValidateSchema({}),
    product_price: createProductSizeValidateSchema({}),
    product_promotion: createProductPromotionValidateSchema({}),
    manufacturer_id: createProductManuIDValidateSchema({}),
    category_id: createProductCateIDValidateSchema({}),
    sizes: createProductSizesValidateSchema({}),
});

export const createProductIDValidateSchema = () =>
    yup
        .number()
        .required("Sản phẩm không được để trống");
export const createSizeSchema = yup.object().shape({
    product_id: createProductIDValidateSchema({}),
    sizes: createProductSizesValidateSchema({}),
});

export const updateSizeNameValidateSchema = () =>
    yup
        .string()
        .required("Tên phân loại không được để trống");
export const updateSizeAdditionalPriceValidateSchema = () =>
    yup.number()
        .typeError("Giá cộng thêm phải là kiểu sô")
        .required("Giá cộng thêm không được để trống");
export const updateSizeQuantityValidateSchema = () =>
    yup.number()
        .typeError("Số lượng phải là kiểu sô")
        .required("Số lượng không được để trống");
export const updateSizeSchema = yup.object().shape({
    size_name: updateSizeNameValidateSchema({}),
    size_additional_price: updateSizeAdditionalPriceValidateSchema({}),
    quantity: updateSizeQuantityValidateSchema({}),
});

export const createCateNameValidateSchema = () =>
    yup
        .string()
        .required("Tên danh mục không được để trống");
export const createCateSchema = yup.object().shape({
    category_name: createCateNameValidateSchema({}),
});

export const updateCateSchema = yup.object().shape({
    category_name: createCateNameValidateSchema({}),
});

export const createManuNameValidateSchema = () =>
    yup
        .string()
        .required("Tên nhà cung cấp không được để trống");
export const createManuAddressValidateSchema = () =>
    yup
        .string()
        .required("Địa chỉ nhà cung cấp không được để trống");
export const createManuSchema = yup.object().shape({
    manufacturer_name: createManuNameValidateSchema({}),
    manufacturer_address: createManuAddressValidateSchema({}),
});

export const updateManuSchema = yup.object().shape({
    manufacturer_name: createManuNameValidateSchema({}),
    manufacturer_address: createManuAddressValidateSchema({}),
});

export const initLoginFormValue = {
    email: '',
    password: '',
}

export const initSearchProductsValue = {
    product_name: "",
    manufacturer_name: ""
}

export const initSearchSizesValue = {
    size_name: "",
}

export const initCreateCategories = {
    category_name: "",
    father_category_id: ""
}
export const initUpdateCategories = {
    category_name: "",
    father_category_id: ""
}
export const initUpdateManufacturers = {
    manufacturer_name: "",
    manufacturer_address: ""
}
export const initCreateManufacturers = {
    manufacturer_name: "",
    manufacturer_address: ""
}
export const initCreateProducts = {
    product_name: "",
    product_price: "",
    product_promotion: "",
    thumbnail_url: "",
    gallery_image_urls: "",
    manufacturer_id: "",
    category_id: "",

    sizes: [
        {
            id: 1,
            size_name: "",
            size_additional_price: "",
            quantity: ""
        }
    ]
}

export const initUpdateProducts = {
    product_name: "",
    product_price: "",
    product_promotion: "",
    thumbnail_url: "",
    gallery_image_urls: "",
    manufacturer_id: "",
    category_id: "",
    sizes: []
}
export const initCreateSizes = {
    product_id: "",
    sizes: [
        {
            id: 1,
            size_name: "",
            size_additional_price: "",
            quantity: ""
        }
    ]

}
export const initEditSize = {
    size_name: "",
    size_additional_price: "",
    quantity: ""
}