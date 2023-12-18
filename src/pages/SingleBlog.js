import { Link, useParams } from "react-router-dom"
import { HiOutlineArrowLeft } from "react-icons/hi"

import Meta from "../components/Meta"
import BreadCrumb from "../components/Breadcrumb"
import Container from "../components/Container"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getBlog } from "@features/blog/blogSlice"

const SingleBlog = () => {
  const blogState = useSelector((state) => state.blog)
  const { blog } = blogState
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [])

  const fetchBlog = () => {
    dispatch(getBlog(id))
  }

  return (
    <>
      <Meta title={blog?.title} />
      <BreadCrumb title={blog?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{blog?.title}</h3>
              <img
                src={blog?.images?.[0]?.url}
                className="img-fluid w-100 my-4"
                alt="blog"
                // style={{
                //   height: "400px",
                //   objectFit: "contain",
                // }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: blog?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SingleBlog
