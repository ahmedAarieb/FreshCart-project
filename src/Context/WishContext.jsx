import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  const getHeaders = () => {
    return { token: localStorage.getItem("userToken") };
};

  async function addProductToWishList(productId) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers :getHeaders() }
      );
      console.log("addProductToCart response:", response);
      return response;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return undefined;
    }
  }

  async function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers :getHeaders() })
      .then((res) => res)
      .catch((err) => err);
  }

  async function deleteWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers :getHeaders() })
      .then((res) => res)
      .catch((err) => err);
  }



  return (
    <WishContext.Provider
      value={{
        addProductToWishList,
        getLoggedUserWishlist,
        deleteWishList,
      }}
    >
      {props.children}
    </WishContext.Provider>
  );
}