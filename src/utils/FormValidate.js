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

    sizes: [

    ]

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