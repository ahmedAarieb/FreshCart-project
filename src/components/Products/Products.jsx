import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ConuterContext } from "../../Context/ConuterContext";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  let { addProductToCart } = useContext(ConuterContext);
  let { addProductToWishList, deleteFromWishlist, getLoggedUserWishlist } = useContext(WishContext);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      loadWishlistState();
    }
  }, [products]);

  async function getProducts() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(res?.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function loadWishlistState() {
    try {
      let response = await getLoggedUserWishlist();
      if (response.data?.status === "success") {
        let wishlistItems = response.data.data;
        let wishlistState = wishlistItems.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
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
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      let response = await toggleWishlist(id);
      if (response.data.status === "success") {
        setWishlist((prev) => ({ ...prev, [id]: true }));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  }

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    try {
      let response = await addProductToCart(id);
      if (response.data?.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(response.data.message);
      console.error("Cart addition error:", error);
    }
    setLoading(false);
  }

  return (
    <>
      <form className="container w-lvw  my-10">
        <input type="search" id="default-search" className="border text-sm mb-3 rounded-md block w-full p-2.5" placeholder="Search ..." required />
      </form>

      <div className="row ">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 lg:w-1/4">
              <div className="product hover:shadow-2xl p-2 py-10 my-2">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" alt={product.title} />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="md-1 font-semibold">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}</span>
                  </div>
                </Link>
                <div className="flex justify-between">
                  <button onClick={() => addToCart(product.id)} className="btn text-center mx-auto">
                    {loading && currentId === product.id ? ( <i className="fas fa-spinner fa-spin"></i>) : ("+ Add to Cart")}
                  </button>
                  <button onClick={() => toggleWishlist(product.id)} className={`text-2xl transition-opacity duration-300 ml-4  ${wishlist[product.id] ? "text-red-500" : "text-black"} cursor-pointer`}>
                    <i className={`fa${wishlist[product.id] ? "-solid" : "-regular"} fa-heart`}></i>
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
    </>
  );
}
