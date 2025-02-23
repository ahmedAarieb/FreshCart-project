import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ConuterContext = createContext();

export default function ConuterContextProvider(props) {
  const [cartId, setcartId] = useState(0);
  const [nuberItems, setnuberItems] = useState(0);

  let getHeaders = () => {
    return { token: localStorage.getItem("userToken") };
};

  async function addProductToCart(productId) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: getHeaders() }
      );
      console.log("addProductToCart response:", response);
      return response;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return undefined;
    }
  }

  async function getLoggedUserCart() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
        { headers :getHeaders() }
    );
      setcartId(response.data.data._id);
      setnuberItems(response.data.numOfCartItems);
      return response; // ✅ تأكد من إعادة البيانات هنا
    } catch (err) {
      console.error("Error fetching cart:", err); // ✅ في حال حدوث خطأ، قم بإرجاع `null`
    }
  }

  async function updateCart(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers :getHeaders() }
      )
      .then((res) => console.log(res))
      .catch((err) => err);
  }

  async function deleteCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/car`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function checkout(cardId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
        { shippingAddress: formData },
        { headers :getHeaders() }
      )
      .then((res) => res)
      .catch((err) => err);
  }


  
  useEffect(()=>{
    getLoggedUserCart()
},[])

  return (
    <ConuterContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCart,
        deleteCart,
        clearCart,
        checkout,
        cartId,
        nuberItems,
        setnuberItems,
      }}
    >
      {props.children}
    </ConuterContext.Provider>
  );
}
