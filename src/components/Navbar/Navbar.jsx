
import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { ConuterContext } from "../../Context/ConuterContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { nuberItems } = useContext(ConuterContext);
  let navigate = useNavigate();

  // التحقق من وجود المستخدم عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setuserLogin(token);
    }
  }, [setuserLogin]);

  function Signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }
  
  return (
    <>
      <nav className="bg-slate-100 py-2 fixed top-0 left-0 right-0 border-gray-200 z-30 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="freshcart Logo" />
            </Link>
          </div>

          <div className="">
            {userLogin ? (
              <ul className="flex gap-3 ">
                <Link className="text-slate-500 focus:border-b-2 " to="/">Home</Link>
                <Link className="text-slate-500 focus:border-b-2" to="/cart">Cart</Link>
                <Link className="text-slate-500 focus:border-b-2 " to="/wishlist">Wish List</Link>
                <Link className="text-slate-500 focus:border-b-2" to="/products">Products</Link>
                <Link className="text-slate-500 focus:border-b-2" to="/categories">Categories</Link>
                <Link className="text-slate-500 focus:border-b-2" to="/brands">Brands</Link>
                <Link className="text-slate-500 focus:border-b-2" to="/allorders">All Orders</Link>
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {userLogin ? (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-slate-600 ps-6 relative">
                  <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                  <div className="absolute top-[-10px] right-[-10px] size-5 bg-emerald-600 text-white rounded-md flex items-center justify-center">
                    {nuberItems}
                  </div>
                </div>
                <span onClick={Signout} className="cursor-pointer px-8 hover:text-emerald-500">
                  <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
                </span>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}





// import React, { useContext } from "react";
// import style from "./Navbar.module.css";
// import logo from "../../assets/freshcart-logo.svg";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "./../../Context/UserContext";
// import { ConuterContext } from "../../Context/ConuterContext";
// // import Login from './../Login/Login';

// export default function Navbar() {
//   let { userLogin, setuserLogin } = useContext(UserContext);
//   let { nuberItems } = useContext(ConuterContext);
//   let navigate = useNavigate();

//   function Signout() {
//     localStorage.removeItem("userToken");
//     setuserLogin(null);
//     navigate("/Login");
//   }
//   return (
//     <>
//       <nav className="bg-slate-100 py-2 fixed top-0 left-0 right-0 border-gray-200 z-30 ">
//         <div className="flex flex-wrap justify-between   items-center mx-auto max-w-screen-xl p-4">
//           <div className="flex items-center gap-5">
//             <Link
//               to=""
//               className="flex items-center space-x-3 rtl:space-x-reverse"
//             >
//               <img src={logo} className="h-8" alt="freshcart Logo" />
//             </Link>
//           </div>

//           <div className="">
//             {userLogin !== null ? (
//               <>
//                 <ul className="flex gap-3 ">
//                   <Link className="text-slate-500    focus:border-b-2 " to="">
//                     Home
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2"
//                     to="cart"
//                   >
//                     Cart
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2 "
//                     to="wishlist"
//                   >
//                     Wish List
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2"
//                     to="products"
//                   >
//                     Products
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2"
//                     to="categories"
//                   >
//                     Categories
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2   "
//                     to="brands"
//                   >
//                     Brands
//                   </Link>
//                   <Link
//                     className="text-slate-500    focus:border-b-2"
//                     to="allorders"
//                   >
//                     Allorders
//                   </Link>
//                 </ul>
//               </>
//             ) : null}
//           </div>

//           <div className="flex items-center space-x-3 rtl:space-x-reverse">
//             {userLogin !== null ? (
//               <>
//                 <div className="flex items-center space-x-3 rtl:space-x-reverse">
//                   <div className="text-slate-600 ps-6 relative">
//                     <i className="fa-solid fa-cart-shopping fa-2xl"></i>
//                     <div className="absolute top-[-10px] right-[-10px] size-5 bg-emerald-600 text-white rounded-md flex items-center justify-center">
//                       {nuberItems}
//                     </div>
//                   </div>
//                   <span
//                     onClick={Signout}
//                     className="cursor-pointer px-8 hover:text-emerald-500"
//                   >
//                     <i class="fa-solid fa-right-from-bracket fa-2xl"></i>
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <div className="flex gap-4">
//                 <Link to="register">Register</Link>
//                 <Link to="login">Login</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
