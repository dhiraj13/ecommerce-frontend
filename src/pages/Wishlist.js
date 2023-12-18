import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useEffect } from "react";
import { getUserProductWishlist } from "@features/user/userSlice";
import { addToWishlist } from "@features/products/productSlice";
import { Else, If, Then } from "react-if";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { wishlist } = authState;

  console.log({ wishlist });

  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const removeFromWishlist = async (id) => {
    await dispatch(addToWishlist(id));
    getWishlistFromDb();
  };

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <If
          condition={
            wishlist && wishlist?.wishlist && wishlist?.wishlist?.length > 0
          }
        >
          <Then>
            <div className="row">
              {wishlist?.wishlist?.map((item, index) => (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => removeFromWishlist(item?._id)}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/watch.jpg"
                        }
                        className={`img-fluid w-100 ${styles.wishlistCardImage}`}
                        alt="watch"
                        width={160}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Then>
          <Else>
            <div className="text-center fs-3">No Data</div>
          </Else>
        </If>
      </Container>
    </>
  );
};

export default Wishlist;
