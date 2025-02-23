import React from 'react'
import style from "./MainSlider.module.css"
import Slider1 from "../../assets/41nN4nvKaAL._AC_SY200_.jpg";
import Slider2 from "../../assets/61cSNgtEISL._AC_SY200_.jpg";
import Slider3 from "../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import Slider4 from "../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplayspeed: 1500,
        customPaging:(i) => (
            <div 
            style={{
                width: "15px",
                height: "8px",
                borderRadius: "15px",
                backgroundColor: "#ccc",
                margin: " 20px 5px",
            }}>
            </div>
        ),
    }


    return (
    <>
        <div className="row mt-0 pt-0  my-20">
            <div className="w-1/4 ms-60">
            <Slider {...settings}>
                <img src={Slider1} className="w-full " alt="" />
                <img src={Slider2} className="w-full " alt="" />
            </Slider>
            </div>
            <div className="w-1/4  ">
            <img src={Slider3} alt="" />
            <img src={Slider4} alt="" />
            </div>
        </div>
    </>
    )
}
