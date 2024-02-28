import React, { useState, useEffect } from "react";
import Header from "../../Component/Header/Header";
import "./Dashboard.css";
import ProductDashBoard from "./ProductDashBoard";
import CategoryDashBoard from "./CategoryDashBoard";
import OrderDashBoard from "./OrderDashBoard";

const Dashboard = ({ product, loginData, category, setLoginData }) => {
  const [selectedOption, setSelectedOption] = useState("category");

  return (
    <div>
      <Header
        product={product}
        loginData={loginData}
        setLoginData={setLoginData}
        category={category}
      />

      <div className="container-dashboard">
        <div className="dashboard-option">
          <span onClick={() => setSelectedOption("category")}>Danh Mục</span>
          <span onClick={() => setSelectedOption("product")}>Sản Phẩm</span>
          <span onClick={() => setSelectedOption("order")}>Đơn Hàng</span>
        </div>

        {selectedOption === "category" && <CategoryDashBoard />}
        {selectedOption === "product" && (
          <ProductDashBoard category={category} />
        )}
        {selectedOption === "order" && <OrderDashBoard />}
      </div>
    </div>
  );
};

export default Dashboard;
