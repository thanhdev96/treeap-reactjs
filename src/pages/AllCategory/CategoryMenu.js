import React from "react";
import Header from "../../Component/Header/Header";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./CategoryMenu.css";
import Footer from "../../Component/Footer/Footer";

const CategoryMenu = ({ loginData, product,setProduct ,category,setLoginData}) => {
  const { categoryId } = useParams();
  const [categoryById, setCategoryId] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // Gọi API product theo category
    fetch(`http://107.172.81.104:8080/api/v1/products/findCategory/${categoryId}`)
      .then((response) => response.json())
      .then((data) => setCategoryId(data));
  }, [categoryId]);


  const onAddToCart = (categoryById) => {
    const checkProduct = product.findIndex((item) => item.id === categoryById.id);

    if (checkProduct !== -1) {
      const updatedProduct = [...product];
      updatedProduct[checkProduct].quantity += 1;
      setProduct(updatedProduct);
    } else {
      setProduct([...product, { ...categoryById, quantity: 1 }]);
    }
  };

  const onAddToDetail = (productId) => {
    const navigateLink = `/product/${productId}`;
    navigate(navigateLink)
  };

  const checkCategoryById= useNavigate();
  const onCheckCategoryById =(categoryId) => {
    const navigateLink = `/category/${categoryId}`;
    checkCategoryById(navigateLink)

  }

  return (
    <div>
      <Header loginData={loginData} product={product} category={category} setLoginData={setLoginData}/>
      <div className="menu-container">
        <div className="form-menu">


        <ul className="menu-list-category">
                {category.map((categories) => (
                  <li key={categories.id} className="menu-list-item">
                    <div 
                    onClick={() =>onCheckCategoryById(categories.id)}
                    className="menu-list-text">
                      <p>{categories.name}</p>
                    </div>
                  </li>
                ))}
              </ul>


        <h3>
          {categoryById.content && categoryById.content.length > 0
            ? categoryById.content[0].category.name
            : "Danh mục không tồn tại"}
        </h3>
        <div className="table-tree-container">
          {categoryById &&
            categoryById.content &&
            categoryById.content.map((TableTree) => (
              <div key={TableTree.id} className="list-card">
                <div className="card">
                  <img
                    src={TableTree.url}
                    className="card-img-top"
                    alt={TableTree.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{TableTree.name}</h5>
                    <p className="card-text">{TableTree.price}.000 vnđ</p>
                    <div className="add-to-cart-detail">
                      <button
                        type="button"
                        className="add-to-cart"
                          onClick={() => onAddToCart(TableTree)}
                      >
                        Mua hàng
                      </button>
                      <button
                          onClick={() => onAddToDetail(TableTree.id)}
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
      </div>
      <Footer/>
    </div>
  );
};

export default CategoryMenu;
