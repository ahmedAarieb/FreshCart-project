import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from './../../Context/UserContext';




export default function Login() {
  let {userLogin , setuserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [ApiErrorr, setApiErrorr] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleLogin(values) {
    setisLoading(true);
 
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res?.data?.token);
          setuserLogin(res?.data?.token)  
          navigate("/"); 
        }
      })
      .catch((res) => {
        setisLoading(false);
        // console.log(res.response.data.message);
        setApiErrorr(res?.response?.data.message);
      });
  }

  // async function handleRegister(values) {
  //   console.log(values);

  //  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
  //  console.log(data);

  //  if(data.message == "success"){

  //   navigate("/")

  //  }
  // //  else{

  // //  }
  // }

  let myValidation = yup.object().shape({
    email: yup
      .string()
      .email(" not valid email")
      .matches(
        /^[a-zA-Z0-9]{2,}@gmail.com$/,
        "email must be like example@gmail.com"
      )
      .required(" email is required"),
    password: yup
      .string()
      .required(" password is required")
      .min(6, " password min length is 6"),
  });

  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    // validate: myValidation,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={Formik.handleSubmit} className=" container  ">
      {ApiErrorr ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3">
          {ApiErrorr}
        </div>
      ) : null}

      <h1 className="font-medium text-3xl p-6">Login Now</h1>

     

      <div className=" mb-5">
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          id="email"
          className="border dark:focus:outline-blue-500 text-sm mb-3  rounded-md block w-full p-2.5  "
          required
        />
        {Formik.errors.email && Formik.touched.email ? (
          <div
            className=" p-4 mb-4 rounded-md dark:text-red-400 bg-red-200"
            role="alert"
          >
            <span className="font-medium">{Formik.errors.email}</span>
          </div>
        ) : null}
      </div>

      <div className=" mb-5">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          id="password"
          className="border dark:focus:outline-blue-500 text-sm mb-3  rounded-md block w-full p-2.5 "
          required
        />
        {Formik.errors.password && Formik.touched.password ? (
          <div
            className=" p-4 mb-4 rounded-md dark:text-red-400 bg-red-200"
            role="alert"
          >
            <span className="font-medium">{Formik.errors.password}</span>
          </div>
        ) : null}
      </div>



      <div className="flex justify-between">
      <Link to={"/forget"}><span className=" hover:text-emerald-700 font-medium">Forget your password ?</span></Link>
      <button
        type="submit"
        className=" text-end focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5  dark:bg-gray-200">
        {isLoading ? (
          <i className="fas fa-spinner fa-spin "></i>
        ) : (
          "Login Now"
        )}
      </button>
      </div>
    </form>
  );
}
