import "./CartModal.css";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";


const CartModal = ({ product, setProduct, loginData, category, setLoginData }) => {
  const [cartItems, setCartItems] = useState(product);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let newTotalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPrice(newTotalPrice);

    setProduct([...cartItems]);
  }, [cartItems]);

  const handleRemoveCartItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };
  const onAddCart = (productId) => {
    const updatedCart = [...cartItems];
    const productToAdd = updatedCart.find((item) => item.id === productId);
    if (productToAdd) {
      setCartItems(updatedCart, (productToAdd.quantity += 1));
    }
  };

  const onRemoveCart = (productId) => {
    const updatedCart = [...cartItems];
    const productToUpdate = updatedCart.find((item) => item.id === productId);
    if (productToUpdate && productToUpdate.quantity > 1) {
      productToUpdate.quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  return (
    <div>
      <Header loginData={loginData} product={product}
        setLoginData={setLoginData}
        category={category} />
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sản phẩm đã đặt hàng</h5>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <th scope="row"></th>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.url} alt="Cart image" height={"50px"} />
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        onClick={() => onRemoveCart(item.id)}
                        className="btn btn-primary"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => onAddCart(item.id)}
                        className="btn btn-primary"
                      >
                        +
                      </button>
                    </td>
                    <td>{item.quantity * item.price}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveCartItem(item.id)}
                        className="btn btn-danger"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total price</td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <Link to={loginData.username ? "/checkout" : "/login"}>
              <button>Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;

