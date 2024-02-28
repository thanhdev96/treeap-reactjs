import React from "react";
import { useState, useEffect } from "react";
import "./CategoryDashBoard.css";
import { FaTrashAlt } from "react-icons/fa";

const CategoryDashBoard = () => {
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
  });

  const [updateCategoryData, setUpdateCategoryData] = useState({
    id: "",
    name: "",
    image: "",
  });

  const getCategories = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch("http://107.172.81.104:8080/api/v1/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Danh sách danh mục:", data);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      });
  };

  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("Không có token trong localStorage");
  //       return;
  //     }

  //     fetch("http://localhost:8080/api/v1/categories", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(newCategory),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Danh mục đã được tạo:", data);
  //         getCategories();
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi tạo danh mục:", error);
  //       });
  //   };
  const createCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    try {
      const response = await fetch("http://107.172.81.104:8080/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        console.log("Danh mục đã được tạo.");
        await getCategories();
      } else {
        console.error("Lỗi khi tạo danh mục.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
    }
  };

  const selectCategoryToUpdate = (category) => {
    setUpdateCategoryData({
      id: category.id,
      name: category.name,
      image: category.image,
    });
  };

  const updateCategory = (categoryId, updatedCategoryData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch(`http://107.172.81.104:8080/api/v1/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCategoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Danh mục đã được cập nhật:", data);
        getCategories();
        setUpdateCategoryData({
          id: "",
          name: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật danh mục:", error);
      });
  };

  const deleteCategory = (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không có token trong localStorage");
      return;
    }

    fetch(`http://107.172.81.104:8080/api/v1/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Danh mục đã được xóa thành công. Id = ", categoryId);

        getCategories();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa danh mục:", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="category-dashboard-container">
      <div className="form-container">
        <h2 className="form-heading">Tạo mới danh mục</h2>
        <h4>Tên danh mục:</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Tên danh mục"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <h4>Link ảnh danh mục:</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Link ảnh danh mục"
          value={newCategory.image}
          onChange={(e) =>
            setNewCategory({ ...newCategory, image: e.target.value })
          }
        />
        <button className="create-button" onClick={createCategory}>
          Tạo danh mục
        </button>
      </div>
      <div className="category-instruct"><h4>Để test với Rule Admin vui lòng 
        Login tk: userName: admin, passWord:12345</h4>
      </div>

      <div className="category-list">
        <h2>Danh sách Category</h2>
        {categories.map((category) => (
          <div key={category.id} className="category-list-form">
            <li>{category.name}</li>
            <button onClick={() => selectCategoryToUpdate(category)}>
              Cập nhật
            </button>
            <FaTrashAlt
              className="button-delete"
              onClick={() => deleteCategory(category.id)}
            >
              Xóa
            </FaTrashAlt>
          </div>
        ))}

        {updateCategoryData.id && (
          <div className="update-form">
            <h2>Cập nhật danh mục</h2>
            <h4>Tên danh mục</h4>
            <input
              type="text"
              className="input-field"
              placeholder="Tên danh mục"
              value={updateCategoryData.name}
              onChange={(e) =>
                setUpdateCategoryData({
                  ...updateCategoryData,
                  name: e.target.value,
                })
              }
            />
            <h4>Link ảnh danh mục</h4>
            <input
              type="text"
              className="input-field"
              placeholder="Link ảnh danh mục"
              value={updateCategoryData.image}
              onChange={(e) =>
                setUpdateCategoryData({
                  ...updateCategoryData,
                  image: e.target.value,
                })
              }
            />
            <button
              className="update-button"
              onClick={() =>
                updateCategory(updateCategoryData.id, updateCategoryData)
              }
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDashBoard;
