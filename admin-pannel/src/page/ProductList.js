import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaRupeeSign } from "react-icons/fa";
import { DeleteModal } from "../components/modals/deleteModal";
import { useNavigate } from "react-router";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [emptySpace, setEmptySpace] = useState(false);
  const [expand, setExpand] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      const getRes = await axios.get("http://localhost:8000/getData");
      setProducts(getRes?.data?.products);
      setError(null);
      setEmptySpace(getRes?.data?.products.length === 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleSearchIconClick = () => {
    setExpand(!expand);
  };

  const handleSearch = async () => {
    try {
      const searchRes = await axios.get(`http://localhost:8000/searching?query=${searchQuery}`);
      setFilteredProducts(searchRes?.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Something went wrong with search:', error);
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const respone = await axios({
        method: "DELETE",
        url: "http://localhost:8000/deleteData/" + selectedProductId,
      });
      console.log("Product deleted successfully", respone.data);
      closeModal();
      getProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div>
        {!expand ? (
          <button
            onClick={handleSearchIconClick}
            className="absolute top-24 right-2 transform -translate-y-1/2 bg-purple-200 hover:bg-purple-400 text-white px-2 py-1 rounded-md"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setExpand(false)}
              className="absolute top-24 right-4 z-10 transform -translate-y-1/2 bg-white px-4 py-1 rounded-md border border-gray-300"
            />
          </>
        )}
      </div>

      <div className="ml-64">
        <div className="h-14 mt-2 text-blue-700 font-semibold">
          <h1>Product List</h1>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        {loading && <div>Loading...</div>}

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Dis
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery.trim() !== '' ? filteredProducts : products).map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={"http://localhost:8000/" + item.url}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.productTitle}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.productTitle}
                  </td>
                  <td className="px-6 py-4 font-semibold ">{item.quantity}</td>
                  <td className="px-6 py-4 flex font-semibold mt-11 text-gray-900 dark:text-white">
                    <p className="flex items-center">
                      <FaRupeeSign />
                    </p>
                    {item.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.discount}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      onClick={() => openModal(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      onClick={() => navigate("/product-details/" + item?._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {searchQuery.trim() !== '' && filteredProducts.length === 0 && (
          <div className="text-zinc-800 bg-zinc-200 flex justify-center items-center font-semibold h-80 text-lg">
            No matching products found.
          </div>
        )}
        {/* Render the "Products are not added yet." message */}
        {!loading && searchQuery.trim() === '' && emptySpace && (
          <div className="text-zinc-800 bg-zinc-200 flex justify-center items-center font-semibold h-80 text-lg">
            Products are not added yet.
          </div>
        )}
      </div>

        <DeleteModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          handleDelete={handleDelete}
          productId={selectedProductId}
        />
      </div>
    </div>
  );
};
