import React from "react";
import "./Login.css";
import Header from "../../Component/Header/Header";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useLoginData } from "../../Context/LoginDataContext";

const Login = ({ category, product }) => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useLoginData();

  // Register
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone_number: "",
    retype_password: "",
    facebookId: "",
    googleId: "",
    role_id: "",
  });

  const handleRegister = () => {
    // Kiểm tra dữ liệu hợp lệ trước khi gửi yêu cầu đăng ký
    if (
      formData.name &&
      formData.password &&
      formData.phone_number &&
      formData.retype_password
    ) {
      if (!formData.role_id) {
        formData.role_id = 1;
      }
      fetch("http://107.172.81.104:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Đăng ký thành công:");
          console.log("Đăng ký thành công:", data);
        })
        .catch((error) => {
          console.error("Lỗi đăng ký:", error);
        });
    } else {
      alert("Dữ liệu không hợp lệ. Vui lòng điền đầy đủ thông tin.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Login

  const handleLogin = () => {
    const { username, password } = loginData;

    fetch("http://107.172.81.104:8080/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Đăng nhập thành công");
          return response.text();
        } else {
          throw new Error("Đăng nhập thất bại");
        }
      })
      .then((data) => {
        const tokenFromService = data;

        navigate("/");

        localStorage.setItem("token", tokenFromService);

        const decodedToken = jwt_decode(tokenFromService);

        // Truy cập thông tin trong payload
        const userId = decodedToken.userId;
        const username = decodedToken.userName;
        const roleId = decodedToken.roleId;

        setLoginData({
          userId: userId,
          username: username,
          roleId: roleId,
        });
      })
      .catch((error) => {
        alert("Đăng nhập thất bại");
        console.error("Lỗi đăng nhập:", error);
      });
  };

  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInUp = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="form-login">
      <Header category={category} product={product} />
    
      <div className="content">
        <div className="container-login">
          <div className="menu">
            <Link
              to="/login"
              className={`btn-connexion ${isSignIn ? "active" : ""}`}
              onClick={() => toggleSignInUp()}
            >
              <h2>Đăng Ký</h2>
            </Link>
            <Link
              to="/login"
              className={`btn-enregistrer ${isSignIn ? "" : "active"}`}
              onClick={() => toggleSignInUp()}
            >
              <h2>Đăng Nhập</h2>
            </Link>
          </div>
          {isSignIn ? (
            <div className="connexion">
              <div className="contact-form">
                <label>USERNAME</label>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                />
                <label>PASSWORD</label>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                
                <button className="submit"
                  defaultValue="SIGN IN"
                  type="submit"
                  onClick={handleLogin}> 
                  Đăng nhập
                  </button>
                  
                  
              </div>
              <hr />
            </div>
          ) : (
            <div className="enregistrer active-section">
              <div className="contact-form">
                <label>USERNAME</label>
                <input
                  placeholder="Enter your username"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label>PHONE NUMBER</label>
                <input
                  placeholder
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />

                <label>PASSWORD</label>
                <input
                  placeholder
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label>CONFIRM PASSWORD</label>
                <input
                  name="retype_password"
                  value={formData.retype_password}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  type="password"
                />
                <button className="submit"
                  defaultValue="SIGN UP"
                  type="submit"
                  onClick={handleRegister}>
                    Đăng ký
                  </button>
                  
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
