import React, { useState } from "react";

import ImageUploader from "../Data/DragDropData";
import axios from "axios";

export const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [imagesFile, setImagesFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expand, setExpand] = useState(false);

  const handleSearchIconClick = () => {
    setExpand(!expand);
  };

  const handleImageChange = (image) => {
    console.log(image)
    setProductImage(image);
    setImagesFile(image);
  };

  const UploadingImage = async () => {
   
    // const userId = id; 
    try {
      // console.log("User ID:", id);
      setLoading(true);
      
      const formData = new FormData();
      formData.append("image", imagesFile);

      const uploadRes = await axios({
        method:'post',
        url: "http://localhost:8000/banner",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data:formData,

      })

      if (uploadRes?.status === 200) {
        alert("Added successfully");
        setImagesFile(null);
        console.log("uploaded done");
      } else {
        alert("Error: Image not added");
      }
    } catch (error) {
      console.error("Error while adding", error);
      alert("Error: Image not added");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="ml-64 w-[80vw] relative">
      <h1 className=" font-bold flex justify-center items-center bg-orange-500 mb-6 mt-6">
        Add Banner
      </h1>

      <ImageUploader setImage={handleImageChange} setImageFile={handleImageChange} />
      
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4 mb-4"
        disabled={loading}
        onClick={UploadingImage}
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </div>
  );
};
