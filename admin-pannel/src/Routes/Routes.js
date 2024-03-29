import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../components/Loginpage/Login";
import { SignUp } from "../components/signup/SignUp";
import MainTemplate from "../page/MainTemplate";
import { Dashboard } from "../components/dashboard/DashBoard";
import Cookies from "js-cookie";
import { Orders } from "../page/Orders";

import { Customers } from "../page/Customers";
import { Coupon } from "../page/Coupon";
import { Transition } from "../page/Transition";
import { Brand } from "../page/Brand";
import { AddProduct } from "../page/AddProduct";
import { ProductList } from "../page/ProductList";
import { ManageAdmin } from "../page/ManageAdmin";
import { AdminRole } from "../page/AdminRole";
import { Category } from "../page/Category";
import { ProductDetailsPage } from "../page/ProductDetailsPage";
import { Banner } from "../page/Banner";

const Auth = () => {
  const isAuthenticated = Cookies.get("token") || false;

  return (
    <Routes>
      
      {isAuthenticated ? (
        <Route path="/" element={<MainTemplate/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/customer" element={<Customers/>}/>
          <Route path="/coupon" element={<Coupon/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/transitions" element={<Transition/>}/>
          <Route path="/brand" element={<Brand/>}/>
          <Route path="/Products" element={<AddProduct/>}/>
          <Route path="/List" element={<ProductList/>}/>
          <Route path="/Banners" element={<Banner/>}/>
          <Route path="/Manage" element={<ManageAdmin/>}/>
          <Route path="/Adminrole" element={<AdminRole/>}/>
          <Route path="/product-details/:product" element={<ProductDetailsPage/>}/>
        </Route>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
};

export default Auth;
