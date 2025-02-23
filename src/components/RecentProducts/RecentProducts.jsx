import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConuterContext } from "../../Context/ConuterContext";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function RecentProducts() {
  const [Products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  let { addProductToCart } = useContext(ConuterContext);
  let {
    addProductToWishList,
    deleteFromWishlist,
    numofwishlistItems,
    setnumofwishlistItems,
    getLoggedUserWishlist,
  } = useContext(WishContext);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (Products.length > 0) {
      loadWishlistState();
    }
  }, [Products]);

  async function loadWishlistState() {
    try {
      let response = await getLoggedUserWishlist();
      if (response.data?.status === "success") {
        let wishlistItems = response.data.data;
        let wishlistState = {};
        Products.forEach((product) => {
          wishlistState[product.id] = wishlistItems.some(
            (item) => item.id === product.id
          );
        });
        setWishlist(wishlistState);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }

  async function toggleWishlist(id) {
    setCurrentId(id);
    let isInWishlist = wishlist[id];

    if (isInWishlist) {
      let response = await deleteFromWishlist(id);
      if (response.data.status === "success") {
        setWishlist((prev) => ({ ...prev, [id]: false }));
        setnumofwishlistItems(numofwishlistItems - 1);
        toast.success(response.data.message);
      }
      {
        toast.error(response.data.message);
      }
    } else {
      let response = await addProductToWishList(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setWishlist((prev) => ({ ...prev, [id]: true }));
        setnumofwishlistItems(numofwishlistItems + 1);
      } else {
        toast.error(response.data.message);
      }
    }
  }

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response && response?.data?.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setProducts(res?.data?.data);
      })
      .catch(() => {});
  }

  return (
    <div className="row p-5">
      {Products.length > 0 ? (
        Products.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 relative">
            <div className="product hover:shadow-2xl p-2 my-2">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3 className="font-semibold mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between p-2">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => addToCart(product.id)}
                  className="btn text-center mx-auto"
                >
                  {loading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "+ Add to Cart"
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`text-2xl transition-opacity duration-300 ml-4 
                    ${
                      wishlist[product.id] ? "text-red-500" : "text-black"
                    } cursor-pointer`}
                >
                  <i
                    className={`fa${
                      wishlist[product.id] ? "-solid" : "-regular"
                    } fa-heart`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      )}
    </div>
  );
}
