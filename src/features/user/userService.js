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

const removeProductsFromCart = () => {
  return api.delete(`user/delete-cart-products`).then((res) => res)
}

const updateProductQuantityFromCart = (cartDetail) => {
  return api.put(
    `user/update-cart-product-quantity/${cartDetail?.id}/${cartDetail?.quantity}`
  )
}

const createOrder = (orderDetail) => {
  return api.post(`user/cart/create-order`, orderDetail).then((res) => res)
}

const getUserOrders = () => {
  return api.get(`user/get-my-orders`).then((res) => res.data)
}

const updateProfile = (data) => {
  return api.put(`user/edit-user`, data).then((res) => res.data)
}

const getUserDetail = (id) => {
  return api.get(`user/${id}`).then((res) => res.data)
}

const forgotPassToken = (data) => {
  return api.post(`user/forgot-password-token`, data).then((res) => res.data)
}

const resetPassword = (data) => {
  return api
    .put(`user/reset-password/${data?.token}`, { password: data?.password })
    .then((res) => res.data)
}

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  removeProductsFromCart,
  updateProductQuantityFromCart,
  createOrder,
  getUserOrders,
  updateProfile,
  getUserDetail,
  forgotPassToken,
  resetPassword,
}
