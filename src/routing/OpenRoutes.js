import { Else, If, Then } from "react-if"
import { Navigate } from "react-router-dom"

export const OpenRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <If condition={user?.token}>
        <Then>
          <Navigate to="/" replace={true} />
        </Then>
        <Else>{children}</Else>
      </If>
    </>
  )
}
