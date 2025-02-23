import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ConuterContext } from "../../Context/ConuterContext";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlist, setWishlist] = useState({});
  let { id, category } = useParams();
  let { addProductToWishList, deleteFromWishlist, getLoggedUserWishlist } =
    useContext(WishContext);
  let { addProductToCart } = useContext(ConuterContext);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
    if (category) {
      getAllProducts(category);
    }
    loadWishlist();
  }, [id, category]);

  async function getProduct(id) {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  async function getAllProducts(category) {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log("All Products:", res.data.data); // طباعة جميع المنتجات

      let related = res.data.data.filter((product) => {
        console.log("Checking product:", product.title, product.category?.name);
        return product.category?.name?.toLowerCase() === category.toLowerCase();
      });

      console.log("Filtered Products:", related); // طباعة المنتجات بعد الفلترة
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  async function loadWishlist() {
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
      let response = await addProductToWishList(id);
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
      toast.error("Error adding to cart");
      console.error("Cart addition error:", error);
    }
    setLoading(false);
  }

  return (
    <>
      {product ? (
        <div className="row items-center">
          <div className="w-1/4">
            <img
              src={product.imageCover}
              className="w-full"
              alt={product.title}
            />
          </div>
          <div className="w-3/4 p-5">
            <h2 className="font-semibold capitalize text-2xl">
              {product.title}
            </h2>
            <h4 className="text-gray-400 my-5">{product.description}</h4>
            <h4 className="text-gray-700 mt-3">{product.category?.name}</h4>
            <div className="flex justify-between my-2">
              <span className="text-gray-600">{product.price} EGP</span>
              <span className="text-gray-600">
                <i className="fas fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <diلاv className="flex justify-between py-4">
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
                className={`text-2xl transition-opacity duration-300 ml-4 ${
                  wishlist[product.id] ? "text-red-500" : "text-black"
                } cursor-pointer`}
              >
                <i
                  className={`fa${
                    wishlist[product.id] ? "-solid" : "-regular"
                  } fa-heart`}
                ></i>
              </button>
            </diلاv>
          </div>
        </div>
      ) : (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      )}

      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 lg:w-1/4">
              <div className="product hover:shadow-2xl p-2 my-2">
                <Link
                  to={`/productdetils/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className=" text-emerald-600">{product.category.name}</h3>
                  <h3 className="md-1 font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between">
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
                    className={`text-2xl transition-opacity duration-300 ml-4  ${
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
    </>
  );
}

// import React, { useContext, useEffect, useState } from 'react';
// import style from "./ProductDetails.module.css";
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Slider from "react-slick";
// import { ConuterContext } from "../../Context/ConuterContext";
// import { WishContext } from '../../Context/WishContext';
// import toast from 'react-hot-toast';

// var settings = {
//     className: "center",
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplayspeed: 1000,
//     arrows: false,
//     dotsClass: "slick-dots custom-dots",
//     appendDots: (dots) => (
//         <ul style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
//             {[...Array(2)].map((_, id) => (
//                 <li
//                     key={id}
//                     style={{
//                         width: "20px",
//                         height: "8px",
//                         borderRadius: "5px",
//                         backgroundColor: id === 0 ? "#666" : "#ccc",
//                         margin: "0 5px",
//                         cursor: "pointer",
//                     }}
//                 />
//             ))}
//         </ul>
//     ),
//     customPaging: ((i) => (<div className='custom-dot' ></div>)
//     )
// };

// export default function ProductDetails() {
//     const [product, setproduct] = useState(null);
//     const [relatedProduct, setrelatedProduct] = useState([]);
//     const [Loading, setLoading] = useState(false);
//     const [currentId, setcurrentId] = useState(0);
//     const [wishlist, setWishlist] = useState({});
//     let { id , category } = useParams();
//     let { addProductToCart } = useContext(ConuterContext);
//     let { addProductToWishList, deleteFromWishlist } = useContext(WishContext);

//     function getProduct(id) {
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//             .then((res) => {
//                 // console.log(res.data.data);
//                 setproduct(res.data.data);
//             })
//             .catch((res) => {
//                 console.log(res);

//             })
//     };

//     function getAllProducts(){
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//         .then((res)=>{
//             // console.log(res.data.data)
//             let related =res.data.data.filter((product)=> product.category.name == category);
//             setrelatedProduct(related);
//         })
//     };

//     async function toggleWishlist(id) {
//         setcurrentId(id);
//         let isInWishlist = wishlist[id];

//         if (isInWishlist) {
//           let response = await deleteFromWishlist(id);
//           if (response.data.status === "success") {
//             setWishlist((prev) => ({ ...prev, [id]: false }));
//             setnumofwishlistItems(numofwishlistItems - 1);
//             toast.success(response.data.message);
//           }
//           {
//             toast.error(response.data.message);
//           }
//         } else {
//           let response = await addProductToWishList(id);
//           if (response.data.status === "success") {
//             toast.success(response.data.message);
//             setWishlist((prev) => ({ ...prev, [id]: true }));
//             setnumofwishlistItems(numofwishlistItems + 1);
//           } else {
//             toast.error(response.data.message);
//           }
//         }
//       }

//     async function addToCart(id) {
//         setLoading(true);
//         setcurrentId(id)
//         let response = await addProductToCart(id);
//         if (response && response?.data && response?.data.status) {
//             // console.log(response.data);
//             if (response.data.status == "success") {
//                 toast(response.data.message, {
//                     position: 'right-top',
//                     style: { backgroundColor: "#51A351" },
//                     icon: '👏',
//                 })
//                 setLoading(false);
//                 setnuberItems(nuberItems + 1);
//             } else {
//                 setLoading(false);
//                 toast(response.data.message, {
//                     position: 'right-top',
//                     style: { backgroundColor: "#51A351" },
//                     icon: '❌',
//                 })
//             }
//         }
//     };

//     useEffect(() => {
//         getProduct(id)
//         getAllProducts()
//     }, [ id , category ]);

//     return (
//         <>
//             <div className="row  items-center">
//                 <div className="w-1/4">
//                     <Slider {...settings}>
//                         {product?.images.map((src) => <img src={src} className='w-full' alt="imageCover" />)}
//                     </Slider>
//                 </div>
//                 <div className="w-3/4 p-5">
//                     <h2 className="font-semibold capitalize text-2xl">{product?.title}</h2>
//                     <h4 className="text-gray-400 my-5">{product?.description}</h4>
//                     <h4 className="text-gray-700 mt-3">{product?.category.name}</h4>
//                     <div className="flex justify-between  my-2">
//                         <span className='text-gray-600'>{product?.price}  EGP</span>
//                         <span className='text-gray-600'><i className="fas fa-star text-yellow-400"></i>{product?.ratingsAverage}</span>
//                     </div>
//                     <div className="flex justify-between">
//                                 <button onClick={() => addToCart(product.id)} className="btn text-center mx-auto">
//                                     {Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "+ Add"}
//                                 </button>
//                                 <div className="text-end cursor-pointer">
//                                     <span onClick={() => addToWishList(product?.id)}>
//                                         <i className={`fa-solid fa-heart fa-2xl ${wishlist[product?.id] ? "text-red-500" : "text-gray-400"}`}
//                                         ></i>
//                                     </span>
//                                 </div>

//                                 <button onClick={() => addToCart(product.id)} className="btn text-center mx-auto">
//                                     {Loading && currentId === product.id ? ( <i className="fas fa-spinner fa-spin"></i>) : ("+ Add to Cart")}
//                                 </button>
//                                 <button
//                   onClick={() => toggleWishlist(product.id)}
//                   className={`text-2xl transition-opacity duration-300 ml-4
//                     ${
//                       wishlist[product.id] ? "text-red-500" : "text-black"
//                     } cursor-pointer`}
//                 >
//                   <i
//                     className={`fa${
//                       wishlist[product.id] ? "-solid" : "-regular"
//                     } fa-heart`}
//                   ></i>
//                 </button>

//                             </div>
//                 </div>
//             </div>

//             <div className="row">
//                 {relatedProduct.length > 0 ? relatedProduct.map((product) => (
//                     <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 ">
//                         <div className="product hover:shadow-2xl hover:shadow-slate-900 rounded-md  p-2 py-10 my-2">

//                             <Link to={`/productdetils/${product.id}/${product.category.name}`}>

//                                 <img src={product.imageCover} className="w-full" alt="" />
//                                 <h3 className=" text-emerald-600">{product.category.name}</h3>
//                                 <h3 className="md-1 font-semibold">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
//                                 <div className="flex justify-between p-3">
//                                     <span>{product.price}EGP</span>
//                                     <span><i className="fas fa-star text-yellow-400"></i>{product.ratingsAverage}</span>
//                                 </div>
//                             </Link>
//                            <div className="row">
//                 {relatedProduct.length > 0 ? relatedProduct.map((product) => (
//                     <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 ">
//                         <div className="product hover:shadow-2xl hover:shadow-slate-900 rounded-md  p-2 py-10 my-2">

//                             <Link to={`/productdetils/${product.id}/${product.category.name}`}>

//                                 <img src={product.imageCover} className="w-full" alt="" />
//                                 <h3 className=" text-emerald-600">{product.category.name}</h3>
//                                 <h3 className="md-1 font-semibold">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
//                                 <div className="flex justify-between p-3">
//                                     <span>{product.price}EGP</span>
//                                     <span><i className="fas fa-star text-yellow-400"></i>{product.ratingsAverage}</span>
//                                 </div>
//                             </Link>
//                             <div className="flex justify-between">
//                                 <button onClick={() => addToCart(product.id)} className="btn text-center mx-auto">
//                                     {Loading && currentId === product.id ? ( <i className="fas fa-spinner fa-spin"></i>) : ("+ Add to Cart")}
//                                 </button>
//                                 <button onClick={() => toggleWishlist(product.id)} className={`text-2xl transition-opacity duration-300 ml-4  ${wishlist[product.id] ? "text-red-500" : "text-black"} cursor-pointer`}>
//                                     <i className={`fa${wishlist[product.id] ? "-solid" : "-regular"} fa-heart`}></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )) :
//                 <div className="sk-folding-cube">
//                 <div className="sk-cube1 sk-cube"></div>
//                 <div className="sk-cube2 sk-cube"></div>
//                 <div className="sk-cube4 sk-cube"></div>
//                 <div className="sk-cube3 sk-cube"></div>
//                 </div>
//                 }
//             </div>
//                         </div>
//                     </div>
//                 )) :
//                 <div className="sk-folding-cube">
//                 <div className="sk-cube1 sk-cube"></div>
//                 <div className="sk-cube2 sk-cube"></div>
//                 <div className="sk-cube4 sk-cube"></div>
//                 <div className="sk-cube3 sk-cube"></div>
//                 </div>
//                 }
//             </div>
//         </>
//     )
// }
