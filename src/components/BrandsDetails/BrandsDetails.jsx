// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { WishContext } from "../../Context/WishContext";
// import toast from "react-hot-toast";
// import { ConuterContext } from "../../Context/ConuterContext";

// export default function BrandDetails() {
//   let { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [loadingProducts, setLoadingProducts] = useState({});
//   const [currentId, setcurrentId] = useState(0);
//   const [wishlist, setWishlist] = useState({});
//   let { addProductToCart } = useContext(ConuterContext);
//   let { addProductToWishList, deleteFromWishlist, getLoggedUserWishlist } =
//     useContext(WishContext);

//   function getProducts(brandName) {
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/products`)
//       .then((res) => {
//         const allProducts = res?.data?.data;
//         const filteredProducts = allProducts.filter(
//           (product) =>
//             product?.brand?.name?.toLowerCase() === brandName?.toLowerCase()
//         );
//         console.log("Filtered Products:", filteredProducts);
//         setProducts(filteredProducts);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setError(err);
//         setLoading(false);
//       });
//   }

//   function getProduct(brandId) {
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
//       .then((res) => {
//         const brandName = res?.data?.data?.name;
//         if (!brandName) {
//           throw new Error("Brand name not found for this ID.");
//         }
//         console.log("Brand Name:", brandName);
//         setProducts([]); // تأكد من أن المنتجات القديمة لا تظهر أثناء التحديث
//         getProducts(brandName);
//       })
//       .catch((err) => {
//         console.error("Error fetching brand details:", err);
//         setError(err); 
//         setLoading(false);
//       });
//   }
  

//   async function toggleWishlist(id) {
//     try {
//       let response = await addProductToWishList(id);
//       if (response.data.status === "success") {
//         setWishlist((prev) => ({ ...prev, [id]: true }));
//         toast.success(response.data.message, {
//           position: "right-top",
//           style: { backgroundColor: "#51A351" },
//           icon: "✔ 💖",
//         });
//       } else {
//         toast.error(response.data.message, {
//           position: "right-top",
//           style: { backgroundColor: "#E53935" },
//         });
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       toast.error("Something went wrong!", {
//         position: "right-top",
//         style: { backgroundColor: "#E53935" },
//       });
//     }
//   }

//   async function addToCart(id) {
//     setLoadingProducts(true);
//     setcurrentId(id);
//     let response = await addProductToCart(id);
//     console.log("Response:", response);
//     if (response && response?.data && response?.data.status) {
//       // console.log(response.data);
//       if (response.data.status == "success") {
//         toast(response.data.message, {
//           position: "right-top",
//           style: { backgroundColor: "#51A351" },
//           icon: "👏",
//         });
//         setLoadingProducts(false);
//         setnuberItems(nuberItems + 1);
//       } else {
//         setLoading(false);
//         toast(response.data.message, {
//           position: "right-top",
//           style: { backgroundColor: "#51A351" },
//           icon: "❌",
//         });
//       }
//     }
//   }

//   useEffect(() => {
//     if (id) {
//       getProduct(id);
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="text-center">
//         <div className="sk-folding-cube">
//           <div className="sk-cube1 sk-cube"></div>
//           <div className="sk-cube2 sk-cube"></div>
//           <div className="sk-cube4 sk-cube"></div>
//           <div className="sk-cube3 sk-cube"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500">Error: {error.message}</div>
//     );
//   }

//   return (
//     <div className="row m-9">
//       {products?.length > 0 ? (
//         products?.map((product) => (
//           <div key={product.id} className="w-full md:w-1/3 lg:w-1/4">
//             <div className="product hover:shadow-2xl hover:shadow-slate-900 rounded-md p-2 py-10 my-2">
//               <img
//                 src={product.imageCover}
//                 className="w-full"
//                 alt={product.title}
//               />
//               <h3 className="text-center text-emerald-600">
//                 {product?.brand?.name}
//               </h3>
//               <h3 className="text-center md-1 font-semibold">
//                 {product.title.split(" ").slice(0, 2).join(" ")}
//               </h3>
//               <div className="flex justify-between p-3">
//                 <span>{product.price} EGP</span>
//                 <span>
//                   <i className="fas fa-star text-yellow-400"></i>
//                   {product.ratingsAverage}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => addToCart(product.id)}
//                   className="btn text-center mx-auto"
//                 >
//                   {loadingProducts && currentId === product.id ? (
//                     <i className="fas fa-spinner fa-spin"></i>
//                   ) : (
//                     "+ Add to Cart"
//                   )}
//                 </button>
//                 <div className="text-end cursor-pointer">
//                   <button
//                     onClick={() => toggleWishlist(product.id)}
//                     className={`text-2xl transition-opacity duration-300 ml-4 
//                     ${
//                       wishlist[product.id] ? "text-red-500" : "text-black"
//                     } cursor-pointer`}
//                   >
//                     <i
//                       className={`fa${
//                         wishlist[product.id] ? "-solid" : "-regular"
//                       } fa-heart`}
//                     ></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="flex flex-col bg-gray-200 p-8 items-center justify-center mx-auto">
//           <p className="text-xl font-bold text-red-500">
//             Oops! No Products In this Brands
//           </p>
//           <Link to={"/brands"}>
//             <button
//               type="submit"
//               className="text-center mx-auto mt-4 bg-green-500 text-white p-2 rounded"
//             >
//               Back To Brands
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';
import { ConuterContext } from './../../Context/ConuterContext';

export default function BrandDetails() {
    let { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Loading, setLoadingProducts] = useState({});
    const [currentId, setcurrentId] = useState(0);
    const [wishlist, setWishlist] = useState({});
    let { addProductToCart } = useContext(ConuterContext);
    let { addProductToWishList, deleteFromWishlist, getLoggedUserWishlist } = useContext(WishContext);


    function getProducts(brandName) {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((res) => {
                const allProducts = res?.data?.data ;
                const filteredProducts = allProducts.filter(
                    (product) => product?.brand?.name?.toLowerCase() === brandName?.toLowerCase()
                );
                console.log("Filtered Products:", filteredProducts);
                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err);
                setLoading(false);
            });
    };

    function getProduct(brandId) {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
            .then((res) => {
                const brandName = res?.data?.data?.name;
                console.log("Brand Name:", brandName);
                if (!brandName) {
                    throw new Error("Brand name not found for this ID.");
                }
                setProducts([]);
                getProducts(brandName);
            })
            .catch((err) => {
                console.error("Error fetching brand details:", err);
                setError(err);
                setLoading(false);
            });
    };

    async function toggleWishlist(id) {
        try {
            let response = await addProductToWishList(id);
            if (response.data.status === "success") {
                setWishlist((prev) => ({ ...prev, [id]: true }));
                toast.success(response.data.message, {
                    position: 'right-top',
                    style: { backgroundColor: "#51A351" },
                });
            } else {
                toast.error(response.data.message, {
                    position: 'right-top',
                    style: { backgroundColor: "#E53935" },
                });
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Something went wrong!", {
                position: 'right-top',
                style: { backgroundColor: "#E53935" },
            });
        }
    };


    async function addToCart(id) {
        setLoadingProducts(true);
        setcurrentId(id)
        let response = await addProductToCart(id);
        console.log("Response:", response);
        if (response && response?.data && response?.data.status) {
            // console.log(response.data);
            if (response.data.status == "success") {
                toast(response.data.message, {
                    position: 'right-top',
                    style: { backgroundColor: "#51A351" },
                })
                setLoadingProducts(false);
                setnuberItems(nuberItems + 1);
            } else {
                setLoading(false);
                toast(response.data.message, {
                    position: 'right-top',
                    style: { backgroundColor: "#51A351" },
                })
            }
        }
    };

    useEffect(() => {
        if (id) {
            getProduct(id);
        }
    }, [id]);

    if (loading) {
        return <div className="text-center">
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
                </div>
        </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="row m-9">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="w-full md:w-1/3 lg:w-1/4">
                        <div className="product hover:shadow-2xl hover:shadow-slate-900 rounded-md p-2 py-10 my-2">
                            <img src={product.imageCover} className="w-full" alt={product.title} />
                            <h3 className="text-center text-emerald-600">{product?.brand?.name}</h3>
                            <h3 className="text-center md-1 font-semibold">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <div className="flex justify-between p-3">
                                <span>{product.price} EGP</span>
                                <span>
                                    <i className="fas fa-star text-yellow-400"></i>
                                    {product.ratingsAverage}
                                </span>
                            </div>
                            <div className="flex justify-between">
                            <button onClick={() => addToCart(product.id)} className="btn text-center mx-auto">
                                    {Loading && currentId === product.id ? ( <i className="fas fa-spinner fa-spin"></i>) : ("+ Add to Cart")}
                                </button>
                                <button onClick={() => toggleWishlist(product.id)} className={`text-2xl transition-opacity duration-300 ml-4  ${wishlist[product.id] ? "text-red-500" : "text-black"} cursor-pointer`}>
                                    <i className={`fa${wishlist[product.id] ? "-solid" : "-regular"} fa-heart`}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col bg-gray-200 p-8 items-center justify-center mx-auto">
                    <p className="text-xl font-bold text-red-500">
                        Oops! No Products In this Brands
                    </p>
                    <Link to={"/brands"}>
                    <button type='submit' className="text-center mx-auto mt-4 bg-green-500 text-white p-2 rounded">
                        Back To Brands
                    </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

