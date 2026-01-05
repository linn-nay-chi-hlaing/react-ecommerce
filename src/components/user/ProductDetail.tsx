import { Link, useLocation } from "react-router";
import "../../css/user/product-detail.css";
import {
  adminCategory,
  adminProduct,
  type AdminCategoryProps,
  type AdminProductProps,
} from "../admin/AdminData";
import { useState } from "react";
import UserLayout from "./UserLayout";

export function ProductDetail() {
  const location = useLocation();

  interface LocationState {
    product: AdminProductProps;
  }

  const state = location.state as LocationState | undefined;
  const product = state.product;

  const [products, setProducts] = useState<AdminProductProps[]>(adminProduct);
  const relatedProducts = adminProduct.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.quantity === 0;

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <UserLayout>
      <div className="productDetail-container">
        <div id="cartAlertSuccess" className="alert alert-success">
          <i className="fa-regular fa-circle-check"></i>
          You have successfully added the product to the cart!
        </div>
        <div className="productDetail-main">
          <div className="productDetail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="productDetail-details">
            <div>
              <h2>{product.name}</h2>
              <p className="category">
                Category: <span className="highlight">{product.category}</span>
              </p>
              <p className="price">${product.sell_price}</p>
              <div className="quantity">
                <div>
                  <label>Quantity : </label>
                  <button id="decrease" onClick={decreaseQuantity}>
                    -
                  </button>
                  <input type="number" id="quantity" value={quantity} />

                  <button
                    id="increase"
                    disabled={quantity >= product.quantity || isOutOfStock}
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <div>
                  <p className="availability">
                    {isOutOfStock
                      ? "Out of Stock"
                      : `${product.quantity} Available`}
                  </p>
                </div>
              </div>

              <Link to="/shopping-cart" state={{ product, quantity }}>
                <button
                  className={isOutOfStock ? "disabled-btn" : "add-cart"}
                  disabled={isOutOfStock}
                >
                  Add to Cart
                </button>
              </Link>
              <button
                className={isOutOfStock ? "disabled-btn" : "buy-now"}
                disabled={isOutOfStock}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="productDetail-description">
          <h3>Product Description</h3>
          <p>{product.description || "No description available."}</p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h3>Related Products</h3>
            <div className="productDetail-grid">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="productDetail-card">
                  <Link to="/product-detail" state={{ product: rel }}>
                    <img src={rel.image} alt={rel.name} />
                  </Link>
                  <div className="related-productDetail">
                    <p className="name">{rel.name}</p>
                    <p className="category">{rel.category}</p>
                    <p className="price">{rel.sell_price}</p>

                    <form
                      action="{{ route('cart.add', $related->id) }}"
                      method="POST"
                    >
                      <button
                        type="submit"
                        className={
                          rel.quantity === 0 ? "disabled-btn" : "add-cart-btn"
                        }
                        disabled={rel.quantity === 0}
                      >
                        Add to Cart
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
