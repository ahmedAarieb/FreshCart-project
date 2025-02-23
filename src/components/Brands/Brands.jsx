import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
    const [Brands, setBrands] = useState([]);


    function getBrands() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then((res) => {
                setBrands(res.data.data);
                console.log(res.data.data);
            })
            .catch((res) => {
                console.log(res);
            });
    };

    useEffect(() => {
        getBrands()
    }, [])

    return (
        <>
        <h2 className="capitalize text-emerald-600 text-center text-4xl font-bold">All Brands</h2>
            <div className="row gap-4 ">
                {Brands?.length > 0 ? Brands?.map((Categorie) => (
                    <div key={Categorie?._id} className="ms-auto  border-[7px] border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div class="w-full bg-white rounded-lg hover:shadow-2xl ">
                            <Link to={`/branddetails/${Categorie?._id}/${Categorie?.name }`}>
                                <div>
                                    <img class="rounded-t-lg w-full" src={Categorie.image} alt="image" />
                                </div>
                            </Link>
                        </div>
                    </div>
                ))  :
                <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
                }
            </div>
        </>
    )
}
