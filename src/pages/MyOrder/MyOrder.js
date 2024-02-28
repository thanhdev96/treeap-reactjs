import { useState, useEffect } from "react";
import Header from "../../Component/Header/Header";
import "./MyOrder.css";

const MyOrder = ({ loginData, category, cartItems, setLoginData, product }) => {
  const [MyOrder, setMyOrder] = useState([]);

  useEffect(() => {
    // fetch API My Order
    fetch(`http://localhost:8080/api/v1/orders/orderByUser/${loginData.userId}`)
      .then((response) => response.json())
      .then((data) => setMyOrder(data));
  }, []);

  return (
    <div>
      <Header
        category={category}
        setLoginData={setLoginData}
        product={product}
        loginData={loginData}
        cartItems={cartItems}
      />

      <div className="myOrder-container">
        <h2>Đơn hàng đã đặt</h2>
        {MyOrder.map((myOrder) => (
          <li key={myOrder.id} className="dropdown-item">
            <div className="card-textt">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Ngày đặt hàng</th>
                    <th scope="col">Tên người nhận</th>
                    <th scope="col">Địa chỉ nhận</th>
                    <th scope="col">Tổng tiền đơn hàng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{myOrder.oderDate}</th>
                    <td>{myOrder.name}</td>
                    <td>{myOrder.address}</td>
                    <td>{myOrder.totalMoney}vnđ</td>
                  </tr>
                  
                </tbody>
              </table>
             
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
