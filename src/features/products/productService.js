import api from "api/api";

const getProducts = (userData) => {
  return api.get("product", userData).then((res) => res.data);
};

const addToWishlist = (prodId) => {
  return api.put("product/wishlist", { prodId }).then((res) => res.data);
};

export const productService = {
  getProducts,
  addToWishlist,
};