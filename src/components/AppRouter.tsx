import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import Users from "./admin/users/Users";
import Products from "./admin/products/Products";
import Staffs from "./admin/staffs/Staffs";
import Categories from "./admin/categories/Categories";
import Orders from "./admin/orders/Orders";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/authentication/Login";
import Home from "./user/Home";
import UserProducts from "./user/UserProducts";
import { ProductDetail } from "./user/ProductDetail";
import ShoppingCart from "./user/ShoppingCart";
import Payment from "./user/Payment";
import PaymentSuccess from "./user/PaymentSuccess";
import MenCategory from "./user/MenCategory";
import WomenCategory from "./user/WomenCategory";
import UnisexCategory from "./user/UnisexCategory";
import UserLogin from "./user/authentication/UserLogin";
import UserRegister from "./user/authentication/UserRegister";
import Contact from "./user/Contact";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Side */}
        <Route path="/" element={<App />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-users" element={<Users />} />
        <Route path="/admin-staffs" element={<Staffs />} />
        <Route path="/admin-login" element={<Login />} />

        <Route path="/admin-products" element={<Products />} />
        <Route path="/admin-categories" element={<Categories />} />
        <Route path="/admin-orders" element={<Orders />} />

        {/* User Side */}
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<UserProducts />} />
        <Route path="/men-products" element={<MenCategory />} />
        <Route path="/women-products" element={<WomenCategory />} />
        <Route path="/unisex-products" element={<UnisexCategory />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
