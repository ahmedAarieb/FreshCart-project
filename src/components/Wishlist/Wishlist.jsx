import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishContext";
import { ConuterContext } from "../../Context/ConuterContext";
import toast from "react-hot-toast";


export default function Wishlist() {
  const [Wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  let { deleteWishList, getLoggedUserWishlist } = useContext(WishContext);
  let { addProductToCart } = useContext(ConuterContext);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      let response = await getLoggedUserWishlist();
      if (response.data?.status === "success") {
        setWishlist(response.data.data);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }

  async function handleDeleteWishList(id) {
    try {
      let response = await deleteWishList(id);
      if (response.data?.status === "success") {
        setWishlist((prevItems) => prevItems.filter((product) => product._id !== id));
        toast.success("Item removed from wishlist");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item from wishlist");
      console.error("Wishlist removal error:", error);
    }
  }

  async function handleAddToCart(id) {
    setLoading(true);
    setCurrentId(id);
    try {
      let response = await addProductToCart(id);
      if (response.data?.status === "success") {
        toast.success("Added to cart successfully");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
      console.error("Cart addition error:", error);
    }
    setLoading(false);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase text-gray-700 bg-slate-100">
          <tr>
            <th scope="col" className="px-16 py-3">
              <h2 className="text-2xl capitalize font-bold">Wishlist</h2>
              <h3 className="py-4 text-sm capitalize">
                Total items: <span className="text-emerald-500">{Wishlist.length}</span>
              </h3>
            </th>
            <th scope="col" className="px-6 py-3 text-end"></th>
          </tr>
        </thead>
        <tbody>
          {Wishlist.length > 0 ? (
            Wishlist.map((product) => (
              <tr key={product._id} className="bg-slate-100">
                <td className="p-4">
                  <div className="flex">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Product"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-end">
                  <button
                    onClick={() => handleDeleteWishList(product._id)}
                    className="px-4 py-2 text-xl text-red-700 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white transition duration-300"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="px-4 py-2 ml-4 text-xl text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition duration-300"
                  >{loading && currentId === product.id ? <i className="fas fa-spinner fa-spin"></i> : "+ Add to Cart"}
                    
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 bg-slate-100">
                <h3 className="text-gray-500">Your wishlist is empty</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
