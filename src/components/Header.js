import React, { useEffect, useState } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import compare from "../images/compare.svg"
import wishlist from "../images/wishlist.svg"
import userImg from "../images/user.svg"
import cart from "../images/cart.svg"
import menu from "../images/menu.svg"
import { useDispatch, useSelector } from "react-redux"
import { Else, If, Then } from "react-if"
import { Typeahead } from "react-bootstrap-typeahead"
import "react-bootstrap-typeahead/css/Typeahead.css"
import { getSingleProduct } from "@features/products/productSlice"

const Header = () => {
  const [total, setTotal] = useState(null)
  const [paginate, setPaginate] = useState(true)
  const [productOpt, setProductOpt] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth)
  const { cartProducts, user } = authState
  const productState = useSelector((state) => state.product)
  const { products } = productState
  useEffect(() => {
    let sum = 0
    for (let index = 0; index < cartProducts?.length; index++) {
      sum =
        sum +
        Number(cartProducts?.[index]?.quantity) *
          Number(cartProducts?.[index]?.price)
      setTotal(sum)
    }
  }, [cartProducts])

  useEffect(() => {
    let data = []
    for (let i = 0; i < products?.length; i++) {
      const element = products?.[i]
      data.push({
        id: i,
        prod: element?._id,
        name: element?.title,
      })
    }
    setProductOpt(data)
  }, [products])

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+977 9806633335">
                  +977 9806633335
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  MSRD
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="search-product"
                  onPaginate={() => console.log("Products List")}
                  onChange={(selected) => {
                    navigate(`/product/${selected?.[0]?.prod}`)
                    dispatch(getSingleProduct(selected?.[0]?.prod))
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey="name"
                  minLength={2}
                  placeholder="Search for Products here..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {/* <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link> */}
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={userImg} alt="user" />
                    <If condition={user}>
                      <Then>
                        <p className="mb-0">Welcome {user?.firstname}</p>
                      </Then>
                      <Else>
                        <p className="mb-0">
                          Login <br /> My Account
                        </p>
                      </Else>
                    </If>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-02">
                      <span className="badge bg-white text-dark">
                        {cartProducts?.length ?? 0}
                      </span>
                      <p className="mb-0">$ {total ?? 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop Categories
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="text-white" to="/">
                      Home
                    </NavLink>
                    <NavLink className="text-white" to="/product">
                      Our Store
                    </NavLink>
                    <NavLink className="text-white" to="/my-orders">
                      My Orders
                    </NavLink>
                    <NavLink className="text-white" to="/blogs">
                      Blogs
                    </NavLink>
                    <NavLink className="text-white" to="/contact">
                      Contact
                    </NavLink>
                    <If condition={user}>
                      <Then>
                        <button
                          className="border border-0 bg-transparent text-white text-uppercase font-size-14"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </Then>
                    </If>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
