import BreadCrumb from "@components/Breadcrumb"
import Container from "@components/Container"
import { getUserDetail, updateProfile } from "@features/user/userSlice"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Else, If, Then } from "react-if"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { FiEdit } from "react-icons/fi"
import { MdOutlineChromeReaderMode } from "react-icons/md"

const Profile = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const { user, userDetail, updatedUser } = authState
  const [edit, setEdit] = useState(false)

  let schema = Yup.object().shape({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .email("Email Should be Valid")
      .required("Email Address is Required"),
    mobile: Yup.number().required("Mobile No is Required"),
  })

  useEffect(() => {
    dispatch(getUserDetail(user?._id))
  }, [dispatch, user, updatedUser])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userDetail?.user?.firstname,
      lastname: userDetail?.user?.lastname,
      email: userDetail?.user?.email,
      mobile: userDetail?.user?.mobile,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(updateProfile(values))
    },
  })

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <If condition={edit}>
                <Then>
                  <MdOutlineChromeReaderMode
                    className="fs-3 cursor-pointer"
                    data-bs-toggle="tooltip"
                    onClick={() => setEdit(false)}
                    title="Read Mode"
                  />
                </Then>
                <Else>
                  <FiEdit
                    className="fs-3 cursor-pointer"
                    data-bs-toggle="tooltip"
                    onClick={() => setEdit(true)}
                    title="Edit Mode"
                  />
                </Else>
              </If>
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="example1"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="example2"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputMobileNo1" className="form-label">
                  Mobile No
                </label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  id="exampleInputMobileNo1"
                  aria-describedby="mobileHelp"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              <If condition={edit}>
                <Then>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </Then>
              </If>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile
