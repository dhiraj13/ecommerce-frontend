import BreadCrumb from "@components/Breadcrumb"
import Container from "@components/Container"
import { getUserOrders } from "@features/user/userSlice"
import { useEffect } from "react"
import { If, Then } from "react-if"
import { useDispatch, useSelector } from "react-redux"

const Orders = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const { getOrderedProduct } = authState

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount after Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            <If condition={getOrderedProduct?.length > 0}>
              <Then>
                {getOrderedProduct?.map((orderedProduct, index) => (
                  <div
                    style={{ backgroundColor: "#febd69" }}
                    className="row pt-3 my-3"
                    key={index}
                  >
                    <div className="col-3">
                      <p>{orderedProduct?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{orderedProduct?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{orderedProduct?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{orderedProduct?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div
                        className="row py-3"
                        style={{ backgroundColor: "#232f3e" }}
                      >
                        <div className="col-3">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Color</h6>
                        </div>
                      </div>
                    </div>
                    <If condition={orderedProduct?.orderItems}>
                      <Then>
                        {orderedProduct?.orderItems?.map((orderItem, index) => (
                          <div className="col-12" key={index}>
                            <div
                              className="row py-3"
                              style={{ backgroundColor: "#232f3e" }}
                            >
                              <div className="col-3">
                                <p className="text-white">
                                  {orderItem?.product?.title}
                                </p>
                              </div>
                              <div className="col-3">
                                <p className="text-white">
                                  {orderItem?.quantity}
                                </p>
                              </div>
                              <div className="col-3">
                                <p className="text-white">{orderItem?.price}</p>
                              </div>
                              <div className="col-3">
                                <ul className="colors ps-0">
                                  <li
                                    style={{
                                      backgroundColor: orderItem?.color,
                                    }}
                                  ></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Then>
                    </If>
                  </div>
                ))}
              </Then>
            </If>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Orders
