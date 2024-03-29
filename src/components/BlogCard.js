import React from "react"
import { Link } from "react-router-dom"
import styles from "./BlogCard.module.css"
import { Else, If, Then } from "react-if"

const BlogCard = (props) => {
  const { id, title, description, date, image } = props

  return (
    <div className="blog-card">
      <img
        src={image ? image : "images/blog-1.jpg"}
        alt="blog"
        className={`img-fluid w-100 ${styles.cardImage}`}
      />
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <If condition={description !== undefined}>
          <Then>
            <p
              className="desc"
              dangerouslySetInnerHTML={{
                __html: description?.substr(0, 70) + "...",
              }}
            ></p>
          </Then>
          <Else></Else>
        </If>
        <Link to={`/blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
