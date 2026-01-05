import type { AdminProductProps } from "../admin/AdminData";
import "../../css/user/products.css";
import { Link } from "react-router";

interface ProductListProps {
  product: AdminProductProps;
}

export default function ProductList({ product }: ProductListProps) {
  const quantity = 1;
  return (
    <div className="product-card">
      <Link to="/product-detail" state={{ product }}>
        <img src={product.image} />
      </Link>
      <div className="product-detail">
        <h4>{product.name}</h4>
        <p>{product.category}</p>
        <p className="price">${product.sell_price}</p>

        <Link to="/shopping-cart" state={{ product, quantity }}>
          <button
            type="submit"
            className={product.quantity === 0 ? "disabledBtn" : "addToCard-btn"}
            disabled={product.quantity === 0}
          >
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}


