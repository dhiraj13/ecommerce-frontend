import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "./userService"
import { toast } from "react-toastify"

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserProductWishlist = createAsyncThunk(
  "auth/wishlist",
  async (_, thunkAPI) => {
    try {
      return await authService.getUserWishlist()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addProductToCart = createAsyncThunk(
  "auth/add-to-cart",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createOrder = createAsyncThunk(
  "auth/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserCart = createAsyncThunk(
  "auth/get-user-cart",
  async (_, thunkAPI) => {
    try {
      return await authService.getCart()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const removeProductFromCart = createAsyncThunk(
  "auth/delete-cart-product",
  async (id, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateProductQuantityFromCart = createAsyncThunk(
  "auth/update-cart-product-quantity",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductQuantityFromCart(cartDetail)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserOrders = createAsyncThunk(
  "auth/get-user-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getUserOrders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateProfile = createAsyncThunk(
  "auth/update-user",
  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserDetail = createAsyncThunk(
  "order/get-user-detail",
  async (id, thunkAPI) => {
    try {
      return await authService.getUserDetail(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const forgotPassToken = createAsyncThunk(
  "order/forgot-pass-token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassToken(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "order/reset-pass",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  userDetail: null,
  cartProducts: [],
  deletedCartProduct: null,
  updatedCartProduct: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdUser = action.payload
        if (state.isSuccess) {
          toast.info("User Created Successfully")
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          toast.error(action.error)
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
        if (state.isSuccess) {
          localStorage.setItem("token", action.payload.token)
          localStorage.setItem("user", JSON.stringify(action.payload))
          toast.info("User Logged In Successfully")
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          toast.error(action.error)
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.wishlist = action.payload
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.cartProduct = action.payload
        toast.success("Product Added to Cart")
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.cartProducts = action.payload
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedCartProduct = action.payload
        toast.success("Product Deleted From Cart Successfully!")
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
      .addCase(updateProductQuantityFromCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductQuantityFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedCartProduct = action.payload
        toast.success("Product Updated From Cart Successfully!")
      })
      .addCase(updateProductQuantityFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.orderedProduct = action.payload
        toast.success("Ordered Successfully")
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // state.getOrderedProduct = action.payload
        state.getOrderedProduct = {
          orders: [
            {
              _id: "642da7147ebe3ece16b44141",
              totalPrice: 230,
              totalPriceAfterDiscount: 220,
              orderStatus: "ordered",
              orderItems: [
                {
                  product: {
                    title:
                      "MIYANI SALES Comfortable Pet Bathing Tool for Massager ShowerCleaningWashing SprayersDog Brush Grooming Gloves for Dog & Cat (Blue, Fits All)",
                  },
                  quantity: 1,
                  price: 220,
                  color: "red",
                },
              ],
            },
            {
              _id: "643074fbc51ca7ecb78c40b5",
              totalPrice: 900,
              totalPriceAfterDiscount: 890,
              orderStatus: "ordered",
              orderItems: [
                {
                  product: {
                    title:
                      "MIYANI SALES Comfortable Pet Bathing Tool for Massager ShowerCleaningWashing SprayersDog Brush Grooming Gloves for Dog & Cat (Blue, Fits All)",
                  },
                  quantity: 2,
                  price: 445,
                  color: "red",
                },
              ],
            },
            {
              _id: "643075a8c7e97e254e5d3088",
              totalPrice: 900,
              totalPriceAfterDiscount: 900,
              orderStatus: "ordered",
              orderItems: [
                {
                  product: {
                    title:
                      "MIYANI SALES Comfortable Pet Bathing Tool for Massager ShowerCleaningWashing SprayersDog Brush Grooming Gloves for Dog & Cat (Blue, Fits All)",
                  },
                  quantity: 2,
                  price: 450,
                  color: "red",
                },
              ],
            },
          ],
        }
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getUserDetail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.userDetail = action.payload
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedUser = action.payload
        toast.success("Profile Updated Successfully")
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
      .addCase(forgotPassToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPassToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.token = action.payload
        toast.success("Forgot Password Email Sent Successfully")
      })
      .addCase(forgotPassToken.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Password Updated Successfully")
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        toast.error("Something Went Wrong!")
      })
  },
})

export default authSlice.reducer
