import "./ProductsItem.css";
import { useState, useContext } from "react";
import React from "react";
import ProductContext from "../../Context/ProductContext";
import { Link, useNavigate } from "react-router-dom";

function ProductsItem({ latestProduct }) {
  const { product, setProduct } = useContext(ProductContext);

  const onAddToCart = (productt) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng
    const existingProductIndex = product.findIndex(
      (item) => item.id === productt.id
    );

    if (existingProductIndex !== -1) {
      // cập nhật số lượng
      const updatedProduct = [...product];
      updatedProduct[existingProductIndex].quantity += 1;
      setProduct(updatedProduct);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới với số lượng là 1
      setProduct([...product, { ...productt, quantity: 1 }]);
    }
  };

  const history = useNavigate();

  const onAddToDetail = (product) => {
    const productDetailLink = `/product/${product.id}`;
    history(productDetailLink);
  };

  return (

    <div className="container-product">
      <div className="text-product">
        <h2 >Sản phẩm mới</h2>
      </div>

      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {latestProduct &&
            latestProduct.products &&
            latestProduct.products.length > 0 ? (
            latestProduct.products
              .reduce((acc, product, index) => {
                if (index % 4 === 0) {
                  acc.push([]);
                }
                acc[acc.length - 1].push(product);
                return acc;
              }, [])
              .map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-item${index === 0 ? ' active' : ''}`}
                >
                  <div className="row list-card-row">
                    {slide.map((product) => (
                      <div key={product.id} className="list-card">



                        <div className="card">
                          <img
                            src={product.url}
                            className="card-img-top"
                            alt={product.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.price}.000 vnđ</p>
                            <div className="add-to-cart-detail">
                              <button
                                type="button"
                                className="add-to-cart"
                                onClick={() => onAddToCart(product)}
                              >
                                Mua hàng
                              </button>
                              <button
                                onClick={() => onAddToDetail(product)}
                                className="product-detail"
                              >
                                Chi tiết
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
        <a
          className="carousel-control-prev"
          href="#productCarousel"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#productCarousel"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}

export default ProductsItem;
