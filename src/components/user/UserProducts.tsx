import UserLayout from "./UserLayout";
import "../../css/user/products.css";
import { useState } from "react";
import {
  adminCategory,
  adminProduct,
  type AdminCategoryProps,
  type AdminProductProps,
} from "../admin/AdminData";
import ProductList from "./ProductList";

export default function UserProducts() {
  const [products, setProducts] = useState<AdminProductProps[]>(adminProduct);
  const [categories, setCategories] =
    useState<AdminCategoryProps[]>(adminCategory);

  const [filters, setFilters] = useState({
    category: [] as string[],
    searchInput: "",
    minPrice: "",
    maxPrice: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setFilters((prev) => {
      const filteredCategories = prev.category.includes(selected);
      const newCats = filteredCategories
        ? prev.category.filter((cat) => cat !== selected)
        : [...prev.category, selected];
      return { ...prev, category: newCats };
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      searchTerm: filters.searchInput.trim(),
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      searchInput: "",
      minPrice: "",
      maxPrice: "",
    });

    setAppliedFilters({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(appliedFilters.searchTerm.toLowerCase());

    const matchesCat =
      filters.category.length > 0
        ? filters.category
            .map((cat) => cat.toLowerCase())
            .includes(product.category.toLowerCase())
        : true;

    const matchesPrice =
      (!appliedFilters.minPrice ||
        product.sell_price >= parseFloat(filters.minPrice)) &&
      (!appliedFilters.maxPrice ||
        product.sell_price <= parseFloat(filters.maxPrice));

    return matchesSearch && matchesCat && matchesPrice;
  });

  return (
    <UserLayout>
      <div className="product-container">
        <div id="cartAlertSuccess" className="alert alert-success">
          <i className="fa-regular fa-circle-check"></i>
          You have successfully added the product to the cart!
        </div>

        <div>
          <aside className="filter-section">
            <h3>Filter Products</h3>
            <input
              value={filters.searchInput}
              onChange={(e) => updateFilter("searchInput", e.target.value)}
              type="text"
              id="search"
              placeholder="Search"
            />
            <div className="price-range">
              <label>Price Range</label>
              <div className="priceRange-box">
                <div>
                  <input
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                    type="text"
                    id="min_price"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <input
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                    type="text"
                    id="max_price"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className="filter-search"
              id="apply-filters"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="clear-btn"
              id="clear-filters"
            >
              Clear Filters
            </button>

            <div className="filter-options">
              {categories.map((cat) => (
                <label key={cat.id ?? cat.name}>
                  <input
                    type="checkbox"
                    className="gender"
                    value={cat.name}
                    checked={filters.category.includes(cat.name)}
                    onChange={handleCategoryChange}
                  />
                  <span> {cat.name}</span>
                  <br />
                </label>
              ))}
            </div>
          </aside>
        </div>

        <div className="search-container">
          <div className="search-div">
            <input
              value={filters.searchInput}
              onChange={(e) => updateFilter("searchInput", e.target.value)}
              type="text"
              id="search"
              placeholder="Search"
            />
            <button
              onClick={handleApplyFilters}
              className="search-box"
              id="apply-filters"
            >
              Search
            </button>
          </div>
        </div>

        <main className="products-section">
          <h2>
            Products ( <span id="product-count">{filteredProducts.length}</span>{" "}
            )
          </h2>
          <div id="product-list">
            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductList key={product.id} product={product} />
                ))
              ) : (
                <div>No products found.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </UserLayout>
  );
}
