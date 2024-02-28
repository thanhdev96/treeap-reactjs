import "./App.css";
import { useEffect, useState } from "react";
import CartModal from "./Component/CartModal/CartDetail";
import ProductContext from "./Context/ProductContext";
import HomePage from "./pages/HomePage/HomePage";
import Detail from "./pages/Detail/Detail";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import LoginDataContext from "./Context/LoginDataContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import CheckOutOrder from "./pages/CheckOutOrder/CheckOutOrder";
import CategoryMenu from "./pages/AllCategory/CategoryMenu";
import MyOrder from "./pages/MyOrder/MyOrder";

function App() {
  // fetch API
  const [latestProduct, SetLatestProduct] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // fetch API Product
    fetch("http://107.172.81.104:8080/api/v1/products/list?page=0&size=12")
      .then((response) => response.json())
      .then((data) => SetLatestProduct(data));

    // fetch API category

    fetch("http://107.172.81.104:8080/api/v1/categories")
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, []);

  // Add to cart
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const isUserLogIn = (loginData) => {
    return !!loginData.username;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <LoginDataContext.Provider value={{ loginData, setLoginData }}>
          <ProductContext.Provider value={{ product, setProduct }}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    latestProduct={latestProduct}
                    product={product}
                    setProduct={setProduct}
                    loginData={loginData}
                    setLoginData={setLoginData}
                    category={category}
                  />
                }
              />
              <Route
                path="/product/:productId"
                element={
                  <Detail
                    category={category}
                    product={product}
                    setProduct={setProduct}
                    latestProduct={latestProduct}
                  />
                }
              />

              <Route
                path="/login"
                element={<Login product={product} category={category} />}
              />

              <Route
                path="/cart-order"
                element={
                  <CartModal
                    category={category}
                    product={product}
                    setProduct={setProduct}
                    setLoginData={setLoginData}
                    loginData={loginData}
                  />
                }
              />

              <Route
                path="/checkout"
                element={
                  <CheckOutOrder
                    category={category}
                    setLoginData={setLoginData}
                    product={product}
                    loginData={loginData}
                    cartItems={cartItems}
                  />
                }
              />

              <Route
                path="/myOrder"
                element={
                  <MyOrder
                    category={category}
                    setLoginData={setLoginData}
                    product={product}
                    loginData={loginData}
                    cartItems={cartItems}
                  />
                }
              />

              <Route
                path="/dashboard"
                element={
                  isUserLogIn(loginData) ? (
                    <Dashboard
                      setLoginData={setLoginData}
                      product={product}
                      category={category}
                      loginData={loginData}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                path="/category/:categoryId"
                element={
                  <CategoryMenu
                    setLoginData={setLoginData}
                    category={category}
                    product={product}
                    setProduct={setProduct}
                    loginData={loginData}
                  />
                }
              />
            </Routes>
          </ProductContext.Provider>
        </LoginDataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
