import Breadcrumb from "../components/Breadcrumb"
import Meta from "../components/Meta"
import watch from "../images/watch.jpg"
import { AiFillDelete } from "react-icons/ai"
import { Link } from "react-router-dom"
import Container from "../components/Container"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  getUserCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
} from "@features/user/userSlice"
import { If, Then } from "react-if"

const Cart = () => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const authState = useSelector((state) => state.auth)
  const { cartProducts } = authState

  useEffect(() => {
    dispatch(getUserCart())
  }, [dispatch])

  useEffect(() => {
    let sum = 0
    for (let index = 0; index < cartProducts?.length; index++) {
      sum =
        sum +
        Number(cartProducts?.[index]?.quantity) * cartProducts?.[index]?.price
      setTotalAmount(sum)
    }
  }, [cartProducts])

  const deleteCartProduct = async (id) => {
    const { payload } = await dispatch(removeProductFromCart(id))
    if (payload && payload?.status) {
      dispatch(getUserCart())
    }
  }

  const handleChangeQuantity = (id, e) => {
    console.log(e.target.value)
    setQuantity(e.target.value)
    updateCartProduct(id, e.target.value)
  }

  const updateCartProduct = async (id, quantity) => {
    const { payload } = await dispatch(
      updateProductQuantityFromCart({
        id,
        quantity,
      })
    )
    if (payload && payload?.status) {
      dispatch(getUserCart())
    }
  }

  return (
    <>
      <Meta title={"Cart"} />
      <Breadcrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cartProducts &&
              cartProducts?.map((item, index) => (
                <div
                  key={index}
                  className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                >
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={watch}
                        className="img-fluid"
                        alt="product-img"
                      />
                    </div>
                    <div className="w-75">
                      <p>{item?.productId?.title}</p>
                      <p className="d-flex gap-3">
                        Color:{" "}
                        <ul className="colors ps-0">
                          <li
                            style={{ backgroundColor: item?.color?.title }}
                          ></li>
                        </ul>
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">$ {item?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        id=""
                        value={quantity ? quantity : item?.quantity}
                        onChange={(e) => handleChangeQuantity(item?._id, e)}
                      />
                    </div>
                    <div>
                      <AiFillDelete
                        onClick={() => deleteCartProduct(item?._id)}
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">$ {item?.quantity * item?.price}</h5>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <If condition={totalAmount !== null}>
                <Then>
                  <div className="d-flex flex-column align-items-end">
                    <h4>SubTotal: $ {totalAmount}</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  </div>
                </Then>
              </If>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Cart
