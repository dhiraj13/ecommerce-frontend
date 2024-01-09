import api from "api/api"

const register = (userData) => {
  return api.post("user/register", userData).then((res) => res.data)
}

const login = (userData) => {
  return api.post("user/login", userData).then((res) => res.data)
}

const getUserWishlist = () => {
  return api.get("user/wishlist").then((res) => res.data)
}

const addToCart = (cartData) => {
  return api.post("user/cart", cartData).then((res) => res.data)
}

const getCart = () => {
  return api.get("user/cart").then((res) => res.data)
}

const removeProductFromCart = (id) => {
  return api.delete(`user/delete-cart-product/${id}`)
}

const updateProductQuantityFromCart = (cartDetail) => {
  return api.put(
    `user/update-cart-product-quantity/${cartDetail?.id}/${cartDetail?.quantity}`
  )
}

const createOrder = (orderDetail) => {
  return api.put(`user/cart/create-order`, orderDetail)
}

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  createOrder,
}
