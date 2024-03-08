import axios from 'axios';
import React, { useState } from 'react';
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Spinner } from './Spinner';


export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading,setLoading] = useState(false);
  
  const [addProduct, setAddProduct] = useState({ productTitle: "", shortDescription: "", productBrief: "", price: "", discount: "" });

  const AddingProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);  
      const formData = new FormData();
      formData.append('productTitle', addProduct.productTitle);
      formData.append('shortDescription', addProduct.shortDescription);
      formData.append('productBrief', addProduct.productBrief);
      formData.append('price', addProduct.price);
      formData.append('discount', addProduct.discount);
      formData.append('image', imageFile);

      const resProduct = await axios.post('http://localhost:8000/insertData', formData)

      if (resProduct?.status === 200) {
        alert("Product added successfully");
        console.log(resProduct)
      }
      else {
        alert("Product not added");
      }

    } catch (error) {
      console.log(error);

    }finally{
      setLoading(false);
    }
  }

  const handleChange = (e => {
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value })
  })

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImageFile(file)
    loadImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    loadImage(file);
  };

  const loadImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <div className='bg-slate-800 bg-center min-h-screen flex justify-center items-center'>
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center filter-blur-lg bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
    <div
     className= {`bg-slate-800 bg-center min-h-screen flex justify-center items-center ${loading?" filter":""}`}      
        onDrop={handleDrop}
         onDragOver={handleDragOver}
         

    >
      <div className=" sm:max-w-md ml-64 flex justify-center flex-col w-lvw px-4 shadow-md shadow-stone-700 mt-8 mb-11">
        <h1 className="text-xl font-semibold mb-4 text-stone-950">Add New Product</h1>
        <form onSubmit={AddingProduct}
   
        
        className="w-full ">
          <div className="mb-4">
            <label htmlFor="productDetails" className="block mb-2 font-semibold">
              Product Details
            </label>
            <input
              id="productDetails"
              type="text"
              placeholder="Enter product details"
              className="w-full border border-gray-300 text-white rounded px-3 py-2 sm:max-w-md bg-transparent"
              onChange={handleChange}
            />

          </div>
          <div className="mb-4">
            <label htmlFor="shortDescription" className="block mb-2 font-semibold">
              Short Description
            </label>
            <input
              id="shortDescription"
              type="text"
              placeholder="Enter short description"
              className="w-full border border-gray-300 text-white rounded px-3 py-2 bg-transparent"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productBrief" className="block mb-2 font-semibold">
              Product Brief
            </label>
            <textarea
              id="productBrief"
              placeholder="Enter product brief"
              className="w-full border  border-gray-300 pl-2 pt-2 rounded text-white bg-transparent"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 py-2">
            <div className="flex-1 mb-2 font-semibold">
              <label>Price</label>
              <div className="flex items-center mt-2  ">
                <p className="bg-green-400 absolute px-2 py-2 flex items-center text-2xl rounded-sm">
                  <PiCurrencyDollarBold />
                </p>
                <input
                  type="text"
                  placeholder="Price"
                  className="w-full sm:w-32  pl-11 border text-white border-gray-300 rounded bg-transparent py-2  bg-transparentpx-2"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row py-2 -ml-11 ">
            <div className=" mb-4 font-semibold">
              <label className='flex -mt-2'>Discount</label>
              <div className="flex items-center mt-2">
                <p className="bg-rose-400 px-2 absolute py-2 flex items-center text-2xl rounded-sm ">
                  <PiCurrencyDollarBold />
                </p>
                <input
                  type="text"
                  placeholder="discount"
                  className="w-full sm:w-32  border pl-11  text-white border-gray-300 rounded bg-transparent py-2 px-2"
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="productImage" className="block mb-2 font-semibold">
              Product Image
            </label>
            <div className="w-full h-48 border-gray-500 flex border-dotted border-2  justify-center shadow-lg shadow-black rounded-sm items-center mb-2">
              {image ? (
                <img src={image} alt="Product" className="max-h-full max-w-full" />
              ) : (
                <p className="text-gray-400">Drag and drop or click to select an image</p>
              )}
            </div>
            <input
            id='productImage'
              type="file"
              accept="image/*"
              className="hidden text-white"
              onChange={handleFileChange}
              // onClick={handleFileChange}
            />
            <label
              htmlFor="productImage"
              className="bg-blue-500 hover:bg-blue-600 my-3 flex w-32 text-white font-semibold px-4 py-2 rounded cursor-pointer"
            >
              Select Image
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4 mb-4"
            onClick={AddingProduct}
            aria-disabled={loading}
          >   
          {loading ?"Add Product..." : 'Add Product'}  
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};
