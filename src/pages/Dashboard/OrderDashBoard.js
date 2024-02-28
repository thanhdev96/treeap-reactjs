import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import "./OrderDashBoard.css"


const OrderDashBoard = () => {
    const [orderList, setOrderList] = useState({ orders: [] });
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 10;

    const getOrders = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không có token trong localStorage");
        return;
      }
  
      fetch(
        `http://107.172.81.104:8080/api/v1/orders/list?page=${pageNumber}&size=${productsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Danh sách Orders:", data);
          setOrderList(data);
          // setProductList(data.products);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        });
    };

    const deleteOrder = (orderId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không có token trong localStorage");
        return;
      }
  
      fetch(`http://107.172.81.104:8080/api/v1/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          console.log("Danh mục đã được xóa thành công. Id = ", orderId);
  
          getOrders();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa danh mục:", error);
        });
    };

    useEffect(() => {
      getOrders(pageNumber);
    }, [pageNumber],orderList);
  
    const handlePageClick = (data) => {
      const selectedPage = data.selected;
      setPageNumber(selectedPage); 
    };
  
    
    return (
      <div className="order-container">
  
        <div className="category-list">
          <h2>Danh sách tất cả Orders</h2>
          {orderList &&
          orderList.orders &&
          orderList.orders.length > 0 ? (
            orderList.orders.map((order) => (
              <div key={order.id} className="category-list-form">
                 <li>{order.name}</li>
                 <button> {order.active ? 'True' : 'False'}</button>
            <FaTrashAlt
              className="button-delete"
              onClick={() => deleteOrder(order.id)}
            >
            </FaTrashAlt>
            
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
          <h6>Note: False: Đã xóa thành công (Xóa mềm)</h6>
        </div>
  
        <ReactPaginate
          pageCount={orderList.totalPages}
          marginPagesDisplayed={2} 
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    );
};

export default OrderDashBoard;
