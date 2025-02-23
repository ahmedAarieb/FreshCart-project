import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { ConuterContext } from "../../Context/ConuterContext";
// import Products from "./../Products/Products";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; 

export default function Cart() {
  let token = localStorage.getItem("userToken");
  let decoded = token ? jwtDecode(token) : null;
  let {
    getLoggedUserCart,
    updateCart,
    deleteCart,
    clearCart,
    nuberItems,
    setnuberItems,
  } = useContext(ConuterContext);
  const [CartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response?.data);
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateCartProduct(id, count) {
    if (count == 0) {
      deleteCartProduct(id);
    } else {
      let response = await updateCart(id, count);
      // console.log(response.data.data);
      if (response.data.status == "success") {
        setCartDetails(response.data.data);
      }
    }
  }

  async function deleteCartProduct(productId) {
    let response = await deleteCart(productId);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setnuberItems(nuberItems - 1);
    }
  }

  async function clearCartProduct() {
    let response = await clearCart();
    if (response.data.status === "success") {
        setCartDetails(null);
        setnuberItems(0);
    }
};


  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase text-gray-700 bg-slate-100">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <h2 className="text-2xl capitalize font-bold">Cart Shop</h2>
                            <h3 className="py-4 text-sm capitalize">
                                User: <span className="text-emerald-500">{decoded?.name || "Guest"}</span>
                            </h3>
                            <h3 className="py-4 text-sm capitalize">
                                Total price: <span className="text-emerald-500">{CartDetails?.totalCartPrice}</span>
                            </h3>
                        </th>
                        <th scope="col" className=""></th>
                        <th scope="col" className=""></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3 text-end">
                            <Link to={"/checkout"}>
                                <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2  focus:outline-none">
                                    Check out
                                </button>
                            </Link>
                            <h3 className="py-4 text-sm capitalize">
                                Total number of items: <span className="text-emerald-500">{nuberItems}</span>
                            </h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {CartDetails?.products.map((product) => (
                        <tr key={product.product.id} className="bg-slate-100">
                            <td className="p-4">
                                <div className="flex">
                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                    <div className="flex flex-col px-7 justify-center">
                                        <span className="text-lg text-gray-950 font-bold">{product.product.title}</span>
                                        <span className="text-gray-950 py-2 font-bold">{product.price} EGP</span>
                                        <span onClick={() => deleteCartProduct(product.product.id)} className="cursor-pointer font-medium text-red-600">
                                            <i className="fa-solid fa-trash"></i> Remove
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4 text-end">
                                <div className="flex items-center">
                                    <button onClick={() => updateCartProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center h-10 w-8 p-1 ms-3 rounded text-sm font-medium border-2 border-solid border-emerald-500" type="button">
                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <span className="ms-3">{product.count}</span>
                                    <button onClick={() => updateCartProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-10 w-8 p-1 ms-3 rounded text-sm font-medium border-2 border-solid border-emerald-500" type="button">
                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" className="text-center py-4 bg-slate-100">
                            <hr className="py-3" />
                            <button
                                type="button"
                                onClick={clearCartProduct}
                                className="px-4 py-2 text-xl text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition duration-300">
                                Clear Your Cart
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </>
);
}
