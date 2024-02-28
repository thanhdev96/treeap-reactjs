import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../Component/Header/Header';
import "./Detail.css"
import { useState,useEffect } from 'react';


 

const Detail = ({ product,setProduct, loginData, category }) => {
  const { productId } = useParams();
  const [productById, setProductById] = useState([]);

  useEffect(() => {
    // Fetch API Product by Id
    fetch(`http://107.172.81.104:8080/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProductById(data));

  }, [productId]);

  const onAddToCart = (productById) => {
    const checkProduct = product.findIndex((item) => item.id === productById.id);

    if (checkProduct !== -1) {
      const updatedProduct = [...product];
      updatedProduct[checkProduct].quantity += 1;
      setProduct(updatedProduct);
    } else {
      setProduct([...product, { ...productById, quantity: 1 }]);
    }
  };



  return (

    <>
    <Header product={product} loginData={loginData} category={category} />
    <div style={{ marginBottom: "100px" }} className="container">
        <div className="row mt-5 product-container">
          <div className="product-image-container col-md-6">
            <img className="product-image" src={productById.url} />
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{productById.name}</div>
                <div className="product-price-discount">
                  <span>{productById.price}.000 vnđ</span>
                </div>
                <p className="product-description">{productById.description}</p>
              <button
              onClick={() => onAddToCart(productById)} 
              className="round-black-btn rounded-pill">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>
      
  );
}

export default Detail;
