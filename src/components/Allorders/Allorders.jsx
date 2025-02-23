import React, { useEffect, useState } from 'react';
import style from "./Allorders.module.css";
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; 

export default function Allorders() {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState();
    let token = localStorage.getItem("userToken");
    let decoded = token ? jwtDecode(token) : null;

    async function getAllOrder() {
        try {
            if (decoded) {
                let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserId(decoded.id);
                setProducts(response.data);
            } else {
                console.error("No token found or token is invalid.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6">
            {products.length > 0 ? (
                products.map((order, index) => (
                    <div key={index} className="border-2 border-slate-900 p-4 rounded-lg bg-gray-100 shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                            <div className="flex gap-2">
                                <button className="bg-green-700 text-white px-4 py-2 rounded">تم الدفع</button>
                                <button className="bg-blue-700 text-white px-4 py-2 rounded">في التوصيل</button>
                            </div>
                        </div>
                        {order.cartItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4 mt-4">
                                <div>
                                    <img className="w-24 h-24 object-cover rounded" src={item?.product.imageCover} alt="product" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h4 className="text-xl font-semibold">{item?.product.title.split(" ").slice(0, 2).join(" ")}</h4>
                                    <div className="flex justify-between">
                                        <span className="font-bold">Count: {item.count}</span>
                                        <span className="font-bold text-emerald-500">{item.price} LE</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-right mt-4 font-bold text-xl">
                            Total: <span className="text-emerald-500">{order.totalOrderPrice} LE</span>
                        </div>
                    </div>
                ))
            ) : null }
        </div>
    );
}







