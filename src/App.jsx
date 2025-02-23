import React from 'react';
import {createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Forget from './components/Forget/Forget';
import CounterContextProvider from './Context/ConuterContext';
import UserContextProvider, { UserContext } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Wishlist from './components/Wishlist/Wishlist';
import ProductDetails from './components/ProductDetails/ProductDetails';
import  { Toaster } from 'react-hot-toast';
import WishcontextProvider from './Context/WishContext';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import BrandDetails from './components/BrandsDetails/BrandsDetails';

let x = createHashRouter([
  {
    path: "", element: < Layout />, children: [
      { index :true, element: <ProtectedRoute><Home/></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands/></ProtectedRoute>},
      { path: "cart", element: <ProtectedRoute><Cart/></ProtectedRoute>},
      { path: "wishlist", element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
      { path: "categories", element: <ProtectedRoute><Categories/></ProtectedRoute>},
      { path: "products", element: <ProtectedRoute><Products/></ProtectedRoute>},
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails/></ProtectedRoute>}, 
      { path: "checkout", element: < ProtectedRoute> <Checkout /> </ProtectedRoute> },
      { path: "allorders", element: < ProtectedRoute> <Allorders /> </ProtectedRoute> },
      { path: "branddetails/:id/:category", element: < ProtectedRoute> <BrandDetails /> </ProtectedRoute> },
      { path: "login", element: <Login/>}, 
      { path: "*", element: <Notfound/>},
      { path: "verifycode", element: <VerifyCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "register", element: <Register/>},
      { path: "forget", element: <Forget/>},
    ],
  },
]);

 export default function App() {  
  return  (
  <>
    <UserContextProvider>
        <CounterContextProvider>
        <WishcontextProvider>
          <RouterProvider router={x}></RouterProvider>
          <Toaster/>
        </WishcontextProvider>
        </CounterContextProvider>
    </UserContextProvider>
 
 
  </>

  );
 
  
}
// export default App;
