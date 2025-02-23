import React, { useContext, useEffect, useState } from "react";
import style from "./categories.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ConuterContext } from "../../Context/ConuterContext";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [notFound, setNotFound] = useState(false);
//   const [LOading, setLOading] = useState(false);
  const { id } = useParams();

   let { addProductToCart } = useContext(ConuterContext);
   let { addProductToWishList, deleteFromWishlist, getLoggedUserWishlist } = useContext(WishContext);


  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function getProducts(categoryName) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        const allProducts = res.data?.data;
        const filteredProducts = allProducts.filter(
          (product) => product.category.name === categoryName
        );

        if (filteredProducts.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setProducts(filteredProducts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function getAllCategories(id) {
    setLoading(true);
    setCurrentId(id);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        const categoryName = res.data.data.name;
        setProducts([]);
        getProducts(categoryName); 
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function handleCategoriesClick() {
    setCurrentId(null);
    getCategories();
    navigate("/categories");
  }

  async function loadWishlistState() {
    try {
      let response = await getLoggedUserWishlist();
      if (response.data?.status === "success") {
        let wishlistItems = response.data.data; 
        let wishlistState = {};
        products.forEach((product) => {
          wishlistState[product.id] = wishlistItems.some((item) => item.id === product.id);
        });
        setWishlist(wishlistState);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }


  async function handleAddToCart(id) {
    setLoading(true);
    setCurrentId(id);
  
    try {
      let response = await addProductToCart(id);
  
      if (response?.data?.status === "success") {
        toast.success(response.data.message);
  
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(response.data.message);
    //   console.error("Cart addition error:", error);
    }
  
    setLoading(false);
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
      let response = await addProductToWishList(id);
      if (response.data.status === "success") {
        setWishlist((prev) => ({ ...prev, [id]: true }));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  } 

  useEffect(() => {
    getAllCategories    ();
    }, []);
  
    
    useEffect(() => {
      if (products.length > 0) {
        loadWishlistState();
      }
    }, [products]);


  useEffect(() => {
    getCategories();
    if (id) {
      getAllCategories(id);
    } else {
      setCurrentId(null);
      setProducts([]);
    }
  }, [id]);

  return (
    <div >
      {currentId === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
          {categories.length > 0 ? (
            categories.map((categorie) => (
              <div key={categorie._id} className="flex flex-col items-center">
                <button
                  onClick={() => getAllCategories(categorie._id)}
                  className="w-full h-full bg-white border-8 border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <img
                    className="w-full h-[350px] object-cover p-5"
                    src={categorie.image}
                    alt="image"
                  />
                  <p className="p-4 text-center font-bold text-xl text-emerald-500">
                    {categorie.name}
                  </p>
                </button>
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
      )}

      {currentId !== null && (
        <div className="row  m-9">
          {loading ? (
            <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
          ) : products?.length > 0 ? (
            products?.map((product) => (
              <div key={product?.id} className="w-full md:w-1/4 lg:w-1/6 ">
                <div className="product hover:shadow-2xl p-2 py-10 my-2">
                  <img src={product?.imageCover} className="w-full" alt="" />
                  <h3 className=" text-emerald-600">
                    {product?.category.name}
                  </h3>
                  <h3 className="md-1 font-semibold">
                    {product?.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product?.price}EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product?.ratingsAverage}
                    </span>
                  </div>

                  <div className="flex justify-between">

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="px-4 py-2 ml-4 text-xl text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition duration-300"
                  >{loading && currentId === product.id ? <i className="fas fa-spinner fa-spin"></i> : "+ Add"}
                    
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
            <div className="flex flex-col bg-gray-200 p-8 items-center justify-center mx-auto">
              <p className="text-xl font-bold text-red-500">
                Oops! No Products In this Category
              </p>
              <button
                onClick={() => setCurrentId(null)}
                className="text-center mx-auto mt-4 bg-green-500 text-white p-2 rounded"
              >
                Back To Categories
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
