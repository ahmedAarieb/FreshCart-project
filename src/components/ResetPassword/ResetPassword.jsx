import style from "./ResetPassword.module.css";
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function ResetPassword() {
    let { userLogin, setuserLogin } = useContext(UserContext);
    let navigate = useNavigate();
    const [ApiErrorr, setApiErrorr] = useState("");
    const [isLoading, setisLoading] = useState(false);

    function handleResetPassword(values) {
        setuserLogin(false);
        setisLoading(true);
        
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            .then((res) => {
                setisLoading(false);
                if (res.status === 200) {
                    toast.success("Password reset successfully");
                    navigate("/login");
                }
            })
            .catch((err) => {
                setisLoading(false);
                setApiErrorr(err?.response?.data?.message || "An error occurred");
                toast.error(err?.response?.data?.message || "An error occurred");
            });
    }

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: handleResetPassword,
    });

    return (
        <>
            {ApiErrorr && <div className="w-1/2 bg-red-500 text-white font-bold mx-auto p-3 rounded-lg">{ApiErrorr}</div>}
            <form onSubmit={formik.handleSubmit} className="container">
                <div className="container">
                    <h2 className="mb-2 text-4xl text-gray-900">Reset Your Account Password</h2>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-2 text-lg text-gray-900">Email:</label>
                        <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-md focus:outline-blue-300 w-full p-2.5" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="newPassword" className="mb-2 text-lg text-gray-900">New Password:</label>
                        <input type="password" id="newPassword" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-md focus:outline-blue-300 w-full p-2.5" required />
                    </div>
                    <div className="py-3">
                        <button type="submit" className="text-gray-400 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 border-2 border-slate-900 rounded-lg text-lg px-5 py-2.5 text-end ml-auto">
                            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Reset Password"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

