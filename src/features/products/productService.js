import api from "api/api"

const getProducts = (data) => {
  const { brand, category, minPrice, maxPrice, sort, tag } = data
  return api
    .get(
      `product?${brand ? `brand=${brand}&` : ""}${
        category ? `category=${category}&` : ""
      }${minPrice ? `price[gte]=${minPrice}&` : ""}${
        maxPrice ? `price[lte]=${maxPrice}&` : ""
      }${sort ? `sort=${sort}&` : ""}${tag ? `tag=${tag}&` : ""}`
    )
    .then((res) => res.data)
}

const getSingleProduct = (id) => {
  return api.get(`product/${id}`).then((res) => res.data)
}

const addToWishlist = (prodId) => {
  return api.put("product/wishlist", { prodId }).then((res) => res.data)
}

const rateProduct = (data) => {
  return api.put("product/rating", data).then((res) => res.data)
}

export const productService = {
  getProducts,
  getSingleProduct,
  addToWishlist,
  rateProduct,
}
