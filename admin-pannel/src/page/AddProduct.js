import React, { useState } from "react";
import axios from "axios";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Spinner } from "./Spinner";
import RichTextEditor from "react-rte";

export const AddProduct = ({ reloadProductList }) => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addProduct, setAddProduct] = useState({
    productTitle: "",
    quantity: "",
    productBrief: "",
    price: "",
    discount: "",
    sizes: [],
  });
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const categories = ["Electronics", "Fashion","Home","Toys","Sports"]
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (size, e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    }

    // Update addProduct state with selected sizes
    setAddProduct({ ...addProduct, size: selectedSizes });
  };

  const AddingProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("productTitle", addProduct.productTitle);
      formData.append("quantity", addProduct.quantity);
      formData.append("productBrief", editorValue.toString("html"));
      formData.append("price", addProduct.price);
      formData.append("discount", addProduct.discount);
      formData.append("size", selectedSizes);
      formData.append("image", imageFile);

      const resProduct = await axios({
        method: "post",
        url: "http://localhost:8000/insertData",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resProduct?.status === 200) {
        alert("Product added successfully");
        setAddProduct({
          productTitle: "",
          quantity: "",
          productBrief: "",
          price: "",
          discount: "",
          category:"",
          sizes: [],
        });
        setImage(null);
        setEditorValue(RichTextEditor.createEmptyValue()); //
        reloadProductList();
      } else {
        alert("Product not added");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImageFile(file);
    loadImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    loadImage(file);
  };

  const loadImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // const handleSizeSelection = (selectedSize) => {
  //   setAddProduct({ ...addProduct, size: selectedSize });

  //   // Call API to update size selection
  //   updateProductSize(selectedSize, addProduct.productId);
  // }
  return (
    // <div className={`bg-white ${bgcolor}`}>
    <div className="bg-slate-800 bg-center min-h-screen flex justify-center items-center relative">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center filter-blur-lg bg-opacity-50 z-50">
            <Spinner />
          </div>
        )}
        <div
          className={`bg-slate-800 flex w-[32vw]  ${
            loading ? " filter" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="sm:max-w-md ml-7 flex justify-center flex-col w-lvw px-4  shadow-md shadow-stone-600 mt-8 mb-11">
            <h1 className="text-xl font-semibold mb- text-white">
              Add New Product
            </h1>
            <form onSubmit={AddingProduct} className="w-full ">
              <div className="mb-4">
                <label
                  htmlFor="productDetails"
                  className="block mb-2 font-semibold"
                >
                  Product Details
                </label>
                <input
                  id="productDetails"
                  type="text"
                  placeholder="Enter product details"
                  value={addProduct.productTitle}
                  name="productTitle"
                  className="w-full border border-gray-300 text-white rounded px-3 py-2 sm:max-w-md bg-transparent"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2 font-semibold">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  placeholder="Quantity"
                  value={addProduct.quantity}
                  name="quantity"
                  className="w-full border border-gray-300 text-white rounded px-3 py-2 bg-transparent"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
            <label htmlFor="category" className="block mb-2 font-semibold">
              Category
            </label>
            <select
              id="category"
              value={addProduct.category}
              name="category"
              className="w-full border border-gray-300 text-gray-500 rounded px-3 py-2 bg-transparent"
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
              <div className="mb-4">
                <label
                  htmlFor="productBrief"
                  className="block mb-2 font-semibold"
                >
                  Product Brief
                </label>

                <RichTextEditor value={editorValue} onChange={setEditorValue} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 py-2">
                <div className="flex-1 mb-2 font-semibold">
                  <label>Price</label>
                  <div className="flex items-center mt-2">
                    <p className="bg-green-400 absolute px-2 py-2 flex items-center text-2xl rounded-sm">
                      <PiCurrencyDollarBold />
                    </p>

                    <input
                      type="text"
                      placeholder="Price"
                      value={addProduct.price}
                      name="price"
                      className="w-full sm:w-32 pl-11 border text-white border-gray-300 rounded bg-transparent py-2 px-2"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row py-2 -ml-11">
                  <div className=" mb-4 font-semibold">
                    <label className="flex -mt-2">Discount</label>
                    <div className="flex items-center mt-2">
                      <p className="bg-rose-400 px-2 absolute py-2 flex items-center text-2xl rounded-sm">
                        <PiCurrencyDollarBold />
                      </p>
                      <input
                        type="text"
                        placeholder="discount"
                        value={addProduct.discount}
                        name="discount"
                        className="w-full sm:w-32 border pl-11 text-white border-gray-300 rounded bg-transparent py-2 px-2"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Select Size</label>
                <div>
                  {availableSizes.map((size) => (
                    <label
                      key={size}
                      htmlFor={`size${size}`}
                      className="mr-2 text-gray-400"
                    >
                      <input
                        type="checkbox"
                        id={`sizes${size}`}
                        value={addProduct.sizes}
                        checked={selectedSizes.includes(size)}
                        onChange={(e) => handleSizeChange(size, e)}
                      />
                      {size}
                    </label>
                  ))}
                </div>

                <p className="mt-2 text-slate-600">
                  Selected Sizes: {selectedSizes.join(", ")}
                </p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block mb-2 font-semibold"
                >
                  Product Image
                </label>
                <div className="w-full h-48 border-gray-500 flex border-dotted border-2  justify-center shadow-lg shadow-black rounded-sm items-center mb-2">
                  {image ? (
                    <img
                      src={image}
                      alt="Product"
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <p className="text-gray-400">
                      Drag and drop or click to select an image
                    </p>
                  )}
                </div>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  className="hidden text-white"
                  onChange={handleFileChange}
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
                aria-disabled={loading}
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div> 
                  )};