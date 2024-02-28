import React from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";


function Category({ category }) {

  const navigate = useNavigate();

  const onFindCategoryById = (categoryId) => {
    navigate(`/category/${categoryId}`);

  }
  return (
    <>
      <div className="text-category">
        <h2 >Danh mục sản phẩm</h2>
      </div>

      <div className="product-category">

        {category.map((categories) => (
          <div key={categories.id}
            onClick={() => onFindCategoryById(categories.id)}
            className="product-item col-md-2">
            <div className="card-img">
              <img src={categories.image} alt={categories.name} />
            </div>
            <div className="card-textt">
              <p>{categories.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>

  );
}

export default Category;
