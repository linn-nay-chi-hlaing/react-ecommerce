import { useState } from "react";
import "../../css/user/products.css";
import UserLayout from "./UserLayout";
import { adminProduct, type AdminProductProps } from "../admin/AdminData";
import { Link } from "react-router";
import ProductList from "./ProductList";

export default function MenCategory() {
  const [products, setProducts] = useState<AdminProductProps[]>(adminProduct);

  let menProducts = products.filter((p) => p.category === "Men");
  let womenProducts = products.filter((p) => p.category === "Women");
  let unisexProducts = products.filter((p) => p.category === "Unisex");

  const [filters, setFilters] = useState({
    searchInput: "",
    minPrice: "",
    maxPrice: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    searchInput: "",
    minPrice: "",
    maxPrice: "",
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      searchInput: filters.searchInput.trim(),
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      searchInput: "",
      minPrice: "",
      maxPrice: "",
    });

    setAppliedFilters({
      searchInput: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const filteredProducts = womenProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(appliedFilters.searchInput.toLowerCase());

    const matchesPrice =
      (!appliedFilters.minPrice ||
        product.sell_price >= parseFloat(filters.minPrice)) &&
      (!appliedFilters.maxPrice ||
        product.sell_price <= parseFloat(filters.maxPrice));

    return matchesSearch && matchesPrice;
  });
  return (
    <UserLayout>
      <section
        className="perfume-banner"
        style={{ backgroundImage: `url("public/images/woman-perfume.jpg")` }}
      >
        <div className="overlay"></div>
        <div className="perfume-content">
          <h1>Womens’ Perfume</h1>
          <p>
            Women's perfume, often referred to as parfum or eau de parfum, is a
            captivating blend of essential oils, aromatic compounds, and
            fixatives crafted to highlight a woman's unique scent. It typically
            features feminine notes such as floral, fruity, sweet, powdery, or
            fresh citrus accords.
          </p>
        </div>
      </section>
      <div className="catProduct-container">
        <div>
          <aside className="filter-section">
            <h3>Filter Products</h3>
            <input
              value={filters.searchInput}
              onChange={(e) => updateFilter("searchInput", e.target.value)}
              type="text"
              id="keyword"
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
              id="apply-filters"
              className="filter-search"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              id="clear-filters"
              className="clear-btn"
            >
              Clear Filters
            </button>
            <div className="categoryFilter-options">
              <Link to="/men-products">
                <div className="man">
                  <span>Men</span>
                  <div className="totalNum">
                    <span>{menProducts.length}</span>
                  </div>
                </div>
              </Link>

              <Link to="/unisex-products">
                <div className="unisex">
                  <span>Unisex</span>
                  <div className="totalNum">
                    <span>{unisexProducts.length}</span>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>

        <div className="search-container">
          <div className="search-div">
            <input type="text" id="search" placeholder="Search" />
            <button className="search-box" id="apply-filters">
              Search
            </button>
          </div>
        </div>

        <main className="catProducts-section">
          <h2>
            <span id="product-count">{filteredProducts.length}</span> Products
            available
          </h2>

          <div id="product-list">
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </UserLayout>
  );
}
