import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./ProductDashBoard.css";
import { FaTrashAlt } from "react-icons/fa";


const ProductDashBoard = ({ category }) => {
  const [productList, setProductList] = useState({ products: [] });
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productsPerPage = 10;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    url: "",
    description: "",
    category: {
      id: "",
    },
  });

  const onCheckCategoryById = (categoryId) => {
    setNewProduct((newProduct) => ({
      ...newProduct,
      category: {
        id: categoryId,
      },
    }));
    const selectedCategory = category.find((cat) => cat.id === categoryId);
    if (selectedCategory) {
      setSelectedCategory(selectedCategory.name);
    }
  };

  const [updateProductData, setUpdateProductData] = useState({
    id: "",
    name: "",
    price: "",
    url: "",
    description: "",
    categoryId: "",
  });

  const getProduct = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch(
      `http://107.172.81.104:8080/api/v1/products/list?page=${pageNumber}&size=${productsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Danh sách sản phẩm:", data);
        setProductList(data);
        // setProductList(data.products);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  };

  const createProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    try {
      const response = await fetch("http://107.172.81.104:8080/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log("Danh mục đã được tạo.");
        await getProduct();
      } else {
        console.error("Lỗi khi tạo danh mục.");
        console.log("categoryId", newProduct);
      }
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
      console.log("categoryId", newProduct);
    }
  };

  const selectProductToUpdate = (product) => {
    setUpdateProductData({
      id: product.id,
      name: product.name,
      url: product.url,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
    });
  };

  const updateProduct = (productId, updatedProductData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch(`http://107.172.81.104:8080/api/v1/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sản phẩm đã được cập nhật:", data);

        setUpdateProductData({
          id: "",
          name: "",
          url: "",
          price: "",
          description: "",
        });

        getProduct();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      });
  };

  const deleteProduct = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch(`http://107.172.81.104:8080/api/v1/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("sản phẩm đã được xóa thành công. Id = ", productId);

        setProductList((prevProductList) => ({
          ...prevProductList,
          products: prevProductList.products.filter(
            (product) => product.id !== productId
          ),
        }));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sản phẩmc:", error);
      });
  };

  useEffect(
    () => {
      getProduct(pageNumber);
    },
    [pageNumber],
    productList
  );

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage); // Khi người dùng chọn trang mới, cập nhật pageNumber
  };

  return (
    <div className="category-dashboard-container">
      <div className="form-container">
        <h2 className="form-heading">Tạo mới Sản Phẩm</h2>
        <h4>Tên sản phẩm:</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Tên danh mục"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory ? selectedCategory : 'Sản phẩm thuộc danh mục'}
          </button>
          <ul class="dropdown-menu">
            {category.map((categories) => (
              <li key={categories.id} className="dropdown-item">
                <div
                  onClick={() => onCheckCategoryById(categories.id)}
                  className="card-textt"
                >
                  <p>{categories.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h4>Link ảnh sản phẩm:</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Link ảnh danh mục"
          value={newProduct.url}
          onChange={(e) =>
            setNewProduct({ ...newProduct, url: e.target.value })
          }
        />
        <h4>Giá sản phẩm:</h4>
        <input
          type="number"
          className="input-field"
          placeholder="Giá sản phẩm"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <h4>Mô tả sản phẩm:</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Mô tả sản phẩm"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <button className="create-button" onClick={createProduct}>
          Tạo sản phẩm
        </button>
      </div>

      <div className="category-list">
        <h2>Danh sách toàn bộ sản phẩm </h2>
        {productList &&
          productList.products &&
          productList.products.length > 0 ? (
          productList.products.map((product) => (
            <div key={product.id} className="category-list-form">
              <li>{product.name}</li>
              <button onClick={() => selectProductToUpdate(product)}>
                Cập nhật
              </button>
              <FaTrashAlt
                className="button-delete"
                onClick={() => deleteProduct(product.id)}
              >
                Xóa
              </FaTrashAlt>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
        <ReactPaginate
          pageCount={productList.totalPages}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"} />

        {updateProductData.id && (
          <div className="update-form">
            <h2>Cập nhật sản phẩm</h2>
            <h4>Tên sản phẩm:</h4>
            <input
              type="text"
              className="input-field"
              placeholder="Tên sản phẩm"
              value={updateProductData.name}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  name: e.target.value,
                })
              }
            />
            <h4>Link ảnh sản phẩm:</h4>
            <input
              type="text"
              className="input-field"
              placeholder="Link ảnh sản phẩm"
              value={updateProductData.url}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  url: e.target.value,
                })
              }
            />
            <h4>Giá sản phẩm:</h4>
            <input
              type="number"
              className="input-field"
              placeholder="Giá sản phẩm"
              value={updateProductData.price}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  price: e.target.value,
                })
              } />
            <h4>Mô tả sản phẩm:</h4>
            <input
              type="text"
              className="input-field"
              placeholder="Mô tả sản phẩm"
              value={updateProductData.description}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  description: e.target.value,
                })
              } />
            <button
              className="update-button"
              onClick={() =>
                updateProduct(updateProductData.id, updateProductData)
              }
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>



    </div>
    // className="pageable-product
  );
};

export default ProductDashBoard;
