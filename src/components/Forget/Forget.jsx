import { useContext, useState } from 'react';
import style from "./Forget.module.css"
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function Forget() {
    let { userLogin, setuserLogin } = useContext(UserContext)
    let navigate = useNavigate();
    const [ApiErrorr, setApiErrorr] = useState("")
    const [isLoading, setisLoading] = useState(false)

    function handleForget(values) {
        setuserLogin(false);
        setisLoading(true);
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            .then((res) => {
                setisLoading(false);
                
                if (res?.data?.message === "Reset code sent to your email") {
                    toast(res.data.message);
                    navigate("/verifycode");
                }
            })
            .catch((error) => { // ✅ إصلاح قراءة الخطأ
                setisLoading(false);
                setApiErrorr(error?.response?.data?.message || "An error occurred");
                toast(error?.response?.data?.message || "An error occurred");
            });
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("Not a valid email").required("Email is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: handleForget,
    });

    return (
        <>
            {ApiErrorr && <div className="w-1/2 bg-red-500 text-white font-bold mx-auto p-3 rounded-lg">{ApiErrorr}</div>}
            <form onSubmit={formik.handleSubmit} className="container">
                <div className="container">
                    <h2 className="mb-2 text-4xl text-gray-900">Please enter your email</h2>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-2 text-lg text-gray-900">Email:</label>
                        <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-md focus:outline-blue-300 w-full p-2.5" required />
                        {formik.errors.email && formik.touched.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <span className="font-medium">{formik.errors.email}</span>
                            </div>
                        )}
                    </div>
                    <div className="py-3">
                        <button type="submit" className="text-gray-400 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 border-2 border-slate-900 rounded-lg text-lg px-5 py-2.5 text-end ml-auto">
                            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

