import React, { useEffect } from "react";

import dayjs from "dayjs";
import Meta from "components/Meta";
import BreadCrumb from "components/Breadcrumb";
import BlogCard from "components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@features/blog/blogSlice";

const Blog = () => {
  const blogState = useSelector((state) => state.blog);
  const { blogs } = blogState;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    dispatch(getBlogs());
  };

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogs?.map((blog, index) => (
                  <div className="col-6 mb-3" key={index}>
                    <BlogCard
                      id={blog?._id}
                      title={blog?.title}
                      description={blog?.description}
                      image={blog?.images[0]?.url}
                      date={dayjs(new Date(blog?.createdAt)).format(
                        "d MMM, YYYY"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
