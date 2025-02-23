import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export default function VerifyCode() {
    let { setuserLogin } = useContext(UserContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // التحقق من صحة المدخلات
    const validationSchema = yup.object().shape({
        resetCode: yup.string()
            .matches(/^\d+$/, "Code يجب أن يحتوي على أرقام فقط")
            .required("Code is required"),
    });

    async function handleVerifyCode(values) {
        setIsLoading(true);
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
            setIsLoading(false);
            if (res?.data?.status === "Success") {
                toast.success("Code verified successfully!");
                
                // ✅ تحديث حالة المستخدم بعد نجاح التحقق
                setuserLogin(true);
                
                // ✅ إعادة توجيه المستخدم إلى الصفحة الرئيسية
                navigate("/ResetPassword");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response?.data?.message || "Invalid code, please try again.");
        }
    }

    let formik = useFormik({
        initialValues: { resetCode: "" },
        validationSchema,
        onSubmit: handleVerifyCode,
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="container">
                <div className="container">
                    <h2 className="mb-2 text-4xl text-gray-900">Please enter your code</h2>
                    <div className="mb-5">
                        <label htmlFor="resetCode" className="mb-2 text-lg text-gray-900">Verification Code</label>
                        <input 
                            type="tel"
                            name="resetCode"
                            id="resetCode"
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border rounded-md focus:outline-blue-300 w-full p-2.5"
                            required
                        />
                        {formik.errors.resetCode && formik.touched.resetCode && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                                <span className="font-medium">{formik.errors.resetCode}</span>
                            </div>
                        )}
                    </div>
                    <div className="py-3">
                        <button 
                            type="submit" 
                            className="text-gray-400 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 border-2 border-slate-900 rounded-lg text-lg px-5 py-2.5 text-end ml-auto"
                        >
                            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}


