import React from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";


export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <form class="container pt-20">
                <label htmlForfor="default-search" ></label>
                <input type="search" id="default-search"  className="border rounded-md focus:outline-blue-300  w-full p-2.5"  placeholder="Search ..." required />
            </form>
      <RecentProducts />
    </>
  );
}
