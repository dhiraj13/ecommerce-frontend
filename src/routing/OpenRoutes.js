import { Else, If, Then } from "react-if"
import { Navigate } from "react-router-dom"

export const OpenRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <If condition={user?.token}>
        <Navigate to="/" replace={true} />
        <Else>
          <Then>{children}</Then>
        </Else>
      </If>
    </>
  )
}
