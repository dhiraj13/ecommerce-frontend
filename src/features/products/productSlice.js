import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productService } from "./productService"
import { toast } from "react-toastify"

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getSingleProduct = createAsyncThunk(
  "product/get-single-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const rateProduct = createAsyncThunk(
  "product/rating",
  async (data, thunkAPI) => {
    try {
      return await productService.rateProduct(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  products: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          toast.error(action.error)
        }
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.addToWishlist = action.payload
        state.message = "Product Added To Wishlist!"
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          toast.error(action.error)
        }
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.rating = action.payload
        state.message = "Rating Added Successfully!"
        toast.success("Rating Added Successfully!")
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          toast.error(action.error)
        }
      })
  },
})

export default productSlice.reducer
