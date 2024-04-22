import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, FAQS, Services ,DetailProducts, Products, Blogs, FinalRegister } from "./Pages/public";
import { AdminLayout, ManageProducts,ManageUser,CreateProducts, Dashboard } from './Pages/admin'
import { MemberLayout, Personal} from './Pages/member'
import path from "./Ultils/path";

function App() {
    
  return (
    <div className="min-h-screen  font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProducts />} />
          <Route path={path.FAQS} element={<FAQS />} />
          <Route path={path.OUT_SERVICES} element={<Services />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
              <Route path={path.DASHBOARD} element={<Dashboard />} />
              <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
              <Route path={path.MANAGE_USER} element={<ManageUser/>} />
              <Route path={path.CREATE_PRODUCTS} element={<CreateProducts/>} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
              <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
