import React from "react";
import "./Content.css";


const Content = () => {
  return (
    <div className="container-content">
      <div className="content-img">
        <img src="https://mowgarden.com/wp-content/uploads/2022/08/vuon-cay-trong-nha-mowgarden.jpg" />
      </div>

      <div className="content-card1">
        <div className="content-text">
          <h3>Lý do chọn TREE 247 ?</h3>
        </div>
        <div className="content-card">
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2022/01/soil.png" />
            <p>TUYỂN CHỌN</p>
            <span>Mọi cây xanh đều phải được chọn lọc kỹ lưỡng</span>
          </div>
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2021/04/018-watering.png" />

            <p>ĐA DẠNG</p>
            <span>Dễ dàng tìm được sản phẩm mà bạn mong muốn</span>
          </div>
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2022/01/gardening-1.png" />

            <p>ĐỒNG HÀNH</p>
            <span>Luôn đồng hành và giúp đỡ bạn về mặt kỹ thuật</span>
          </div>
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2022/01/gardener.png" />

            <p>ĐÚNG CHUẨN</p>
            <span>Sử dụng hình ảnh chụp thực tế giúp dễ hình dung</span>
          </div>
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2022/01/gardening-2.png" />

            <p>TIN CẬY</p>
            <span>Gửi ảnh thực tế và cụ thể trước khi giao hàng</span>
          </div>
          <div className="card-element">
            <img src="https://mowgarden.com/wp-content/uploads/2021/04/006-turf.png" />
            <p>CẠNH TRANH</p>

            <span>Tối ưu hóa ngân sách nhờ mức giá cực kì cạnh tranh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

