import { useContext} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ConuterContext } from '../../Context/ConuterContext';



export default function Checkout() {
    let { cartId } = useContext(ConuterContext);
    let { checkout } = useContext(ConuterContext);

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: ()=> handleCheckout(cartId, `http://localhost:5173`),
    });

    async function handleCheckout(cardId, url) {
        let {data} = await checkout(cardId, url, formik.values);
        // console.log(data);
        window.location.href =data.session.url
        
    };




    return (
        <>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
                <div className=" mb-5">
                    <label htmlFor=" details" className=" mb-2 text-sm font-medium text-gray-900 ">details:</label>
                    <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 " required />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className=" mb-2 text-sm font-medium text-gray-900 ">phone:</label>
                    <input type="tel" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5   dark:focus:ring-emerald-500 " required />
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className=" mb-2 text-sm font-medium text-gray-900 ">city:</label>
                    <input type="text" id="city" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5   dark:focus:ring-emerald-500 " required />
                </div>
                <div className="flex gap-3 items-center">
                    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-end">
                        pay Now
                    </button>
                </div>
            </form>
        </>
    )
}


