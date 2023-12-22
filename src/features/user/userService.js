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

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
}
