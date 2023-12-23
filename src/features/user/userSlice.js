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

const initialState = {
  user: "",
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
  },
})

export default authSlice.reducer
