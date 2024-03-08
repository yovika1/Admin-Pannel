
import { AddProduct } from "../page/AddProduct";

export const ProductData = () => {

  const productData =
    "https://img.freepik.com/free-ph oto/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=996&t=st=1709751723~exp=1709752323~hmac=b605731b5afe6eb08bb4d0e4ff2cdcfe43f401c536ddb15a0cb4e61ebdeb65bf";
  return(
    
    <AddProduct imageUrl={productData} />
    ) 
  };
