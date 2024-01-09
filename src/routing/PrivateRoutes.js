import { Else, If, Then } from "react-if"
import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <If condition={user?.token}>
        <Then>{children}</Then>
        <Else>
          <Navigate to="/login" replace={true} />
        </Else>
      </If>
    </>
  )
}
