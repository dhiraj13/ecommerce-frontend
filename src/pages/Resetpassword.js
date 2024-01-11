import Breadcrumb from "../components/Breadcrumb"
import Meta from "../components/Meta"
import Container from "../components/Container"
import CustomInput from "../components/CustomInput"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "@features/user/userSlice"

const Resetpassword = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let schema = Yup.object().shape({
    password: Yup.string().required("Password is Required"),
  })

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(
        resetPassword({
          token,
          password: values.password,
        })
      )
      navigate("/login")
    },
  })
  return (
    <>
      <Meta title={"Reset Password"} />
      <Breadcrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Resetpassword
