import {
  createOrder,
  getUserCart,
  removeProductsFromCart,
} from "@features/user/userSlice"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function PayPal({ orderDetail }) {
  const paypal = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool Products",
                amount: {
                  currency_code: "USD",
                  value: orderDetail?.totalAmount,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          if (!order) return
          const amount = order?.purchase_units?.[0]
          console.log({ amount })
          await dispatch(
            createOrder({
              orderDetail: {
                totalPrice: orderDetail?.totalAmount,
                totalAmountAfterDiscount: orderDetail?.totalAmount,
                shippingInfo: orderDetail?.shippingInfo,
                orderItems: orderDetail?.cartProductsList,
                paymentInfo: {
                  amount: amount?.amount,
                  payee: amount?.payee,
                },
              },
              cb: async () => {
                await dispatch(removeProductsFromCart(() => navigate("/cart")))
              },
            })
          )
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
  }, [])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
