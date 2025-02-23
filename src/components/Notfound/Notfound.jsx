import React from 'react'
import style from "./Notfound.module.css"
import photo from "../../assets/error.svg"


export default function Notfound() {
    return (
    <>
        <div className="flex justify-center  ">
        <img src={photo} className="w-[50%] " alt="image404" />
        </div>
    </>
    )
}
