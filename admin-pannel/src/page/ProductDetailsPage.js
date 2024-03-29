import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from "react-router";
import { UpdateDetails } from "../components/modals/UpdateDetails";

export const ProductDetailsPage = () => {
  const [productDetail, setProductsDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  

  const { product } = useParams();

  const getDetails = async () => {
    try {
      const responseProduct = await axios({
        method: "get",
        url: "http://localhost:8000/gettingProduct/" + product,
      });

      setProductsDetails(responseProduct.data.data);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };
  useEffect(() => {
    getDetails();
  },[]);

  const openModal =(product)=>{
    setSelectedProduct(product)
    setIsModalOpen(true);

  }

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const stripHtmlTags = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };



  return (
    <>
      <div className=" flex bg-gray-100 justify-between dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 justify-center flex dark:bg-gray-700 mb-4">
                    <img className="w-[30vw] h-full object-cover "  src={`http://localhost:8000/${productDetail.url}`} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                        onClick={()=>openModal(productDetail)}
                        >Edit</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Delete</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{productDetail.productTitle}</h2>
                
                <div className="flex mb-4">
                    <div className="mr-4 flex ">
                        <span className="font-bold flex text-gray-700 dark:text-gray-300">Price:
                        </span>
                        <p className="flex ml-2 mt-2 text-xs text-white"> <FaRupeeSign /></p>
                        
                        <span className="text-gray-600 dark:text-gray-300">{productDetail.price}
                        
                        </span>
                        
                    </div>
                  
                </div>
              
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">availableSizes</span>
                    <div className="flex items-center mt-2">
                        <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{productDetail.size}</button>
                       
                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 overflow-ellipsis">
                    {stripHtmlTags (productDetail.productBrief)}
                    </p>
                </div>
            </div>
        </div>
    </div>

</div>
<UpdateDetails
isOpen={isModalOpen}
onClose={closeModal}
product={selectedProduct}
onSubmit={getDetails}
>

</UpdateDetails> 
</>


  );
};
