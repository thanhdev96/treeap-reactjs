import "./Header.css";
import { FaSearch, FaRegAddressBook } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ product, loginData, category,setLoginData }) => {
  let total = 0;

  if (Array.isArray(product)) {
    total = product.length;
  }

  const navigate = useNavigate();
  loginData = loginData || {};


  // Logout
  let loginButtons;
  let myOrder;

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setLoginData({});
    navigate("/");
  };


  
  if (loginData.username) {
    // Nếu đã đăng nhập, hiển thị tên người dùng và nút đăng xuất
    loginButtons = (
      <div className="header-username">
        Hi, {loginData.username}!
        <p onClick={handleLogout} >Đăng Xuất</p>
      </div>
    );
    // myOrder = (
    //   <div className="header-myorder">
    //     <p >Đơn hàng của tôi</p>
    //   </div>
    // );
  } else {
    // Nếu chưa đăng nhập, hiển thị nút Đăng Nhập và Đăng Ký
    loginButtons = (
      <div className="header-login">
        <Link to="/login">Đăng Nhập</Link>
        <Link to="/login">Đăng Ký</Link>
      </div>
    );
  }

  const onCheckCategoryById = (categoryId) => {
    console.log("categoryId:", categoryId);
    const navigateLink = `/category/${categoryId}`;
    navigate(navigateLink);
  };

  const [expanded, setExpanded] = useState(false);

  const handleCollapse = () => {
    setExpanded(!expanded);
  };

  // search

  const [name, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async () => {
    if (name.trim() !== "") { // Kiểm tra nếu biến name không rỗng hoặc chỉ chứa khoảng trắng
      try {
        const response = await fetch(
          `http://107.172.81.104:8080/api/v1/products/search-name/${name}?page=0&&size=5`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Error searching for products:", error);
      }
    }
  };
  

  useEffect(() => {
    if (name) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [name]);

  const checkProductById = useNavigate();

  const onCheckProductById = (productId) => {
    if (productId) { 
      checkProductById(`/product/${productId}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          <h2 className="text-warning">TREE 247</h2>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mob-navbar"
          aria-label="Toggle"
          onClick={handleCollapse}
          aria-expanded={expanded}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse mt-1  " id="mob-navbar">
          <form className="d-flex">
            <div>
              <input
                className="form-control me-1"
                type="text"
                aria-label="Search"
                placeholder="Search"
                value={name}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="btn btn-warning"
              type="submit"
            >
              <FaSearch />
            </button>

            <div className="header-img-login">
              <Link to="/dashboard">
                <img className="img-login"
                  src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/user.png?1676649124511"
                />
                </Link>
                {loginButtons}
              
            </div>
            <Link to="/myOrder">{myOrder}</Link>
            

            <Link to="/cart-order" type="button" className="header-cart">
              <div>
                <img src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/cart.png?1676649124511"></img>
              </div>
              <div className="cart-amoutn">
                <span>{total}</span>
              </div>
            </Link>
          </form>

          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Trang chủ
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sản Phẩm
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Giới thiệu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Search product Name */}
      {searchResults.length > 0 ? (
        <ul className="list-group">
          {searchResults.map((product) => (
            <li key={product.id} 
            onClick={()=> onCheckProductById(product.id)} 
            className="list-group-item">
              
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        name.trim() !== "" && <p className="text-muted">Không tìm thấy kết quả</p>
      )}
    </nav>
  );
};

export default Header;
