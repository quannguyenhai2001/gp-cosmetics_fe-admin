import * as Yup from 'yup';
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
    product_name: "1",
    product_price: "1",
    product_promotion: "1",
    thumbnail_url: "",
    gallery_image_urls: "",
    manufacturer_id: "1",
    category_id: "1",

    sizes: [
        {
            id: 1,
            size_name: "",
            size_additional_price: "",
            quantity: ""
        }
    ]

}
