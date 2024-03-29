import React, { useState } from 'react';


const ImageUploader = ({ setImageFile }) => {
  // const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
 
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

  return (
    <div>
      <div
        className="w-full h-48 border-gray-200 flex border-dotted bg-slate-100 border-2 justify-center shadow-lg shadow-slate-200 rounded-sm items-center mb-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img src={image} alt="Product" className="max-h-full max-w-full" />
        ) : (
          <p className="text-gray-400">Drag and drop or click to select an image</p>
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
  );
};

export default ImageUploader;
