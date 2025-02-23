import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CategoriesSlider() {
    const [categoryes, setcategoryes] = useState([])

    // var settings = {
    //     className: "center",
    //     dots: true, // تفعيل النقاط
    //     infinite: true, // السلايدر دائري
    //     speed: 500,
    //     slidesToShow: 7, // عدد العناصر المرئية
    //     slidesToScroll: 1, // العناصر التي يتم تمريرها
    //     dotsClass: "slick-dots custom-dots", // إضافة كلاس للنقاط
    //     appendDots: dots => (
    //       <ul>
    //         {/* اقتصار عرض النقاط على عدد ثابت */}
    //         {dots.slice(0, 2)}
    //       </ul>
    //     ),
    //     customPaging: i => <div className="custom-dot"></div>,
    //   };

    var settings = {
        className: "center",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 800,
        arrows: false,
        dotsClass: "slick-dots custom-dots",
        appendDots: (dots) => (
            <ul style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                {[...Array(2)].map((_, id) => (
                    <li
                        key={id}
                        style={{
                            width: "20px",
                            height: "8px",
                            borderRadius: "5px",
                            backgroundColor: id === 0 ? "#666" : "#ccc", 
                            margin: "0 5px",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </ul>
        ),
        customPaging: ((i) => (<div className='custom-dot' ></div>)
        )


    }

    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((res) => {
                // console.log(res.data.data);
                setcategoryes(res.data.data);
            })
    };

    useEffect(() => {
        getCategories()
    }, [])


    return (
        <>
             <Slider {...settings }>
                    {categoryes.map((category) => <div key={category.id}>
                        <img src={category.image} className='w-full h-[200px] opject-cover ' alt="" />
                        <h4 className='font-bold'>{category.name}</h4>
                    </div>)}
                </Slider>
        </>
    )
}


