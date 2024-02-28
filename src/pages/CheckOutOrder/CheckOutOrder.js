import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Component/Header/Header";
import jwt_decode from "jwt-decode";
import "./CheckOutOrder.css"

const CheckOutOrder = ({ loginData, product,category}) => {


    const CheckTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < product.length; i++) {
          totalPrice += product[i].price * product[i].quantity;
        }
        return totalPrice;
      };
      const totalPrice = CheckTotalPrice();


 

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    try {
      const response = await fetch("http://107.172.81.104:8080/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        console.log("Bạn đã đặt hàng thành công .");
      } else {
        console.error("Lỗi khi tạo order.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo order:", error);
    }
  };



const checkUserIdToken =() => {
  const jwtDecode = require('jwt-decode');

const token = localStorage.getItem("token");

if (token) {
  try {
    const decodedToken = jwt_decode(token);

    const user = decodedToken.userId;

    
    return user;

  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
  }
} 
}

const [newOrder, setNewOrder] = useState({
  name: "",
  phoneNumber: "",
  address: "",
  note: "",
  totalMoney: totalPrice,
  status: "pending",
  oderDate:"",
  active: 1,
  userId: 
     checkUserIdToken()
  
  
});





  return (
    <div>
      <Header product={product}  loginData={loginData} category={category}/>
      <div className="form-container-checkout">
        <h2 className="form-heading">Thông tin người nhận</h2>
        <h6>Tên người nhận</h6>
        <input
          type="text"
          className="input-field"
          placeholder="Tên người nhận"
          value={newOrder.name}
          onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
        />
      <h6>Số điện thoại người nhận</h6>

        <input
          type="text"
          className="input-field"
          placeholder="Số điện thoại người nhận"
          value={newOrder.phoneNumber}
          onChange={(e) =>
            setNewOrder({ ...newOrder, phoneNumber: e.target.value })
          }
        />
        <h6>Địa chỉ người nhận</h6>
        <input
          type="text"
          className="input-field"
          placeholder="Địa chỉ"
          value={newOrder.address}
          onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
        />
        <h6>Ghi chú:</h6>
        <input
          type="text"
          className="input-field"
          placeholder="Ghi chú"
          value={newOrder.note}
          onChange={(e) => setNewOrder({ ...newOrder, note: e.target.value })}
        />
        <div className="total-money">Tổng tiền đơn hàng: {newOrder.totalMoney}.000 vnđ</div>
        <div className="total-money">Phương thức thanh toán: Khi nhận hàng </div>

        <button className="create-button" onClick={createOrder}>
          Đặt Hàng
        </button>
      </div>
    </div>
  );
};

export default CheckOutOrder;
