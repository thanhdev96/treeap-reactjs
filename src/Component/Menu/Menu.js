import "./Menu.css";
import { Link, useNavigate } from "react-router-dom";


const Menu = ({
  categoryTableTree,
  setCategoryTableTree,
  product,
  setProduct,
}) => {

  const onAddToCart = (TableTree) => {
    const checkProduct = product.findIndex((item) => item.id === TableTree.id);

    if (checkProduct !== -1) {
      const updatedProduct = [...product];
      updatedProduct[checkProduct].quantity += 1;
      setProduct(updatedProduct);
    } else {
      setProduct([...product, { ...TableTree, quantity: 1 }]);
    }
  };

  const history = useNavigate();


  const onAddToDetail = (productId) => {
    const productDetailLink = `/product/${productId}`;
    history(productDetailLink);
  };

  // const onAddToCategoryMenu =() {

  // }

  return (
    <div className="menu-container">
      <div className="category-tilte">
        <h3>Cây trong nhà</h3>
      </div>

      <div className="table-tree-container">
        {categoryTableTree &&
          categoryTableTree.content &&
          categoryTableTree.content.map((TableTree) => (
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
      <Link to="/category/5"><h4 >Xem toàn bộ sản phẩm</h4></Link>

    </div>
  );
};

export default Menu;
