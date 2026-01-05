import "../../../css/admin/products.css";
import AdminLayout from "../AdminLayout.tsx";
import {
  adminCategory,
  adminProduct,
  type AdminCategoryProps,
  type AdminProductProps,
} from "../AdminData.tsx";
import {
  ProductCreate,
  ProductEdit,
  productReducer,
  ProductRow,
} from "./ManageProducts.tsx";
import { useState, useReducer } from "react";
import DispatcherContext from "../../DispatcherContext.tsx";

export default function Products() {
  const [products, dispatch] = useReducer(productReducer, adminProduct);
  const [categories, setCategories] =
    useState<AdminCategoryProps[]>(adminCategory);
  const [selectedProduct, setSelectedProduct] =
    useState<AdminProductProps | null>(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts: AdminProductProps[] = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = filterCategory
      ? product.category.toLowerCase() === filterCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCat;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const addHandlerOpenModel = () => {
    setIsAdding(true);
  };

  const addHandlerCloseModel = () => {
    setIsAdding(false);
  };

  const handleOpenModel = (product: AdminProductProps) => {
    setSelectedProduct(product);
    setIsEditting(true);
  };

  const handleCloseModel = () => {
    setSelectedProduct(null);
    setIsEditting(false);
  };
  return (
    <AdminLayout>
      <DispatcherContext.Provider value={dispatch}>
        <div className="table-container">
          <div className="filter-bar">
            <div>
              <h3>Product List</h3>
            </div>
            <div className="filter-group">
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  name="category"
                  id="filter_status"
                >
                  <option value="">Category</option>
                  {categories.map((cat) => (
                    <option value={cat.name} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="searchDiv">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search....."
                />
                <button
                  className="search-btn"
                  onClick={() => setSearchTerm(searchInput.trim())}
                >
                  Search
                </button>
              </div>

              <div className="addBtnDiv">
                <button className="add-btn" onClick={addHandlerOpenModel}>
                  Add Product
                </button>
              </div>
            </div>
          </div>

          <div id="product-list-wrapper">
            <table className="productTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Buy Price</th>
                  <th>Sell Price</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody id="product-table-body">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product: AdminProductProps) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onHandleProductAction={handleOpenModel}
                    />
                  ))
                ) : (
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No products found.
                  </td>
                )}
              </tbody>
            </table>
          </div>
          {isAdding && (
            <ProductCreate
              onClose={addHandlerCloseModel}
              onAdd={(product) =>
                dispatch({ type: "ADD_PRODUCT", payload: product })
              }
            />
          )}

          {isEditting && (
            <ProductEdit product={selectedProduct} onClose={handleCloseModel} />
          )}
        </div>
      </DispatcherContext.Provider>
    </AdminLayout>
  );
}
