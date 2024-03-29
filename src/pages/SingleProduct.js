import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import Breadcrumb from "components/Breadcrumb"
import Meta from "components/Meta"
import ProductCard from "components/ProductCard"
import ReactImageZoom from "react-image-zoom"
import Color from "components/Color"
import { TbGitCompare } from "react-icons/tb"
import { AiOutlineHeart } from "react-icons/ai"
import { Link, useNavigate, useParams } from "react-router-dom"
import watch from "images/watch.jpg"
import Container from "components/Container"
import { useDispatch, useSelector } from "react-redux"
import {
  getProducts,
  getSingleProduct,
  rateProduct,
} from "@features/products/productSlice"
import { toast } from "react-toastify"
import { addProductToCart, getUserCart } from "@features/user/userSlice"
import { If, Then } from "react-if"

const SingleProduct = () => {
  const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [orderedProduct, setorderedProduct] = useState(true)
  const [popularProduct, setPopularProduct] = useState([])
  const [star, setStar] = useState(null)
  const [comment, setComment] = useState(null)

  const navigate = useNavigate()

  const { id } = useParams()
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.product)
  const { product, products, rating } = productState
  const authState = useSelector((state) => state.auth)
  const { cartProducts } = authState

  useEffect(() => {
    dispatch(getSingleProduct(id))
    dispatch(getUserCart())
    dispatch(getProducts())
  }, [id, dispatch])

  useEffect(() => {
    for (let index = 0; index < cartProducts?.length; index++) {
      if (id === cartProducts?.[index]?.productId?._id) {
        setAlreadyAdded(true)
      }
    }
  }, [id, cartProducts])

  useEffect(() => {
    let data = []
    for (let index = 0; index < products?.length; index++) {
      const element = products?.[index]
      if (element?.tags === "popular") {
        data.push(element)
      }
      setPopularProduct(data)
    }
  }, [products])

  useEffect(() => {
    if (rating) {
      dispatch(getSingleProduct(id))
    }
  }, [dispatch, id, rating])

  const addToCart = () => {
    if (color === null) {
      toast.error("Please Choose Color")
      return false
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user?.token) {
        dispatch(
          addProductToCart({
            productId: product?._id,
            quantity,
            color,
            price: product?.price,
          })
        )
        setAlreadyAdded(true)
      } else {
        navigate("/login")
      }
    }
  }

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating")
      return false
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.")
      return false
    } else {
      dispatch(
        rateProduct({
          star,
          comment,
          prodId: id,
        })
      )
      return false
    }
  }

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: product?.images?.[0]?.url
      ? product.images[0].url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  }

  const copyToClipboard = (text) => {
    console.log("text", text)
    var textField = document.createElement("textarea")
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
  }

  return (
    <>
      <Meta title={product?.title} />
      <Breadcrumb title={product?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {product?.images?.map((image, index) => (
                <div key={index}>
                  <img src={image?.url} className="img-fluid" alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{product?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {product?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={product?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{product?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{product?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{product?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div> */}
                {!alreadyAdded && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>
                      <Color setColor={setColor} colorData={product?.color} />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {!alreadyAdded && (
                    <>
                      <h3 className="product-heading">Quantity :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div className="d-flex align-items-center gap-30">
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() =>
                        alreadyAdded ? navigate("/cart") : addToCart()
                      }
                    >
                      {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                    </button>
                    {/* <button className="button signup">Buy It Now</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href)
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description.toString()-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.description.toString(),
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={star}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => setStar(e)}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="button border-0"
                    onClick={addRatingToProduct}
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                <If condition={product?.ratings}>
                  <Then>
                    {product?.ratings?.map((rating, index) => (
                      <div className="review" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">Navdeep</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={rating?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{rating?.comment}</p>
                      </div>
                    ))}
                  </Then>
                </If>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  )
}

export default SingleProduct
