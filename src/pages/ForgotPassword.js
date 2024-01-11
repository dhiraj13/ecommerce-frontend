import Breadcrumb from "@components/Breadcrumb"
import Meta from "@components/Meta"
import { Link, useNavigate } from "react-router-dom"
import Container from "@components/Container"
import CustomInput from "@components/CustomInput"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassToken } from "@features/user/userSlice"

const Forgotpassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be Valid")
      .required("Email Address is Required"),
  })
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPassToken(values))
    },
  })
  return (
    <>
      <Meta title={"Forgot Password"} />
      <Breadcrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default Forgotpassword
