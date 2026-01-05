import { Link, useLocation } from "react-router";
import "../../css/user/shopping-cart.css";
import UserLayout from "./UserLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ShoppingCart() {
  const location = useLocation();
  const { product, quantity: initialQuantity } = location.state || {};
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const [cartItems, setCartItems] = useState(
    product ? [{ ...product, quantity: initialQuantity || 1 }] : []
  );

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <UserLayout>
      <div className="cart-section">
        <div
          id="cartAlert"
          className="alert alert-warning"
          style={{ display: "none" }}
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          Please enter a quantity for all products before proceeding to
          checkout.
        </div>
        <div className="cart-heading">
          <h2>Shopping Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div>
              <p>Your cart is empty.</p>
              <Link to="/products">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-box">
              <div className="cart-div">
                <div className="cart-item">
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-details">
                    <p>{product.name}</p>
                    <small>Eau de parfum</small>
                  </div>

                  <div
                    className="item-total-price"
                    style={{ color: "#FF0303" }}
                  >
                    ${subtotal.toFixed(2)}
                  </div>
                  <div>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      min="1"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= product.quantity) {
                          setQuantity(value);
                        }
                      }}
                    />
                  </div>
                  <form>
                    <button
                      type="submit"
                      className="productDelete-btn"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          id="bin"
                          onClick={handleClearCart}
                        />
                      </div>
                    </button>
                  </form>
                </div>

                <div className="cart-footer">
                  <form>
                    <button className="delete-btn">
                      <i className="fa-solid fa-trash"></i>
                      Clear Cart
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <div className="orderCart-summary">
                <h4>Order Summary</h4>
                <div className="summary">
                  <div className="summary-line subtotal">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line tax">
                    <span>Tax (10%):</span>
                    <span>$ {tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-line total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Link to="/payment" state={total}>
                    <button className="checkout-btn" id="checkoutBtn">
                      Proceed to Checkout
                    </button>
                  </Link>

                  <a href="{{ route('user.products') }}">
                    <button className="continue-btn">Continue Shopping</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
