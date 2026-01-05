import { useReducer, useState } from "react";
import "../../../css/admin/categories.css";
import DispatcherContext from "../../DispatcherContext";
import AdminLayout from "../AdminLayout";
import {
  CategoryCreate,
  CategoryEdit,
  categoryReducer,
  CategoryRow,
} from "./ManageCategories";
import { adminCategory, type AdminCategoryProps } from "../AdminData";

export default function Categories() {
  const [categories, dispatch] = useReducer(categoryReducer, adminCategory);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [selectedCat, setSelectedCat] = useState<AdminCategoryProps | null>(
    null
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories: AdminCategoryProps[] = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addHandlerOpenModel = () => {
    setIsAdding(true);
  };

  const addHandlerCloseModel = () => {
    setIsAdding(false);
  };

  const handleOpenModel = (cat: AdminCategoryProps) => {
    setSelectedCat(cat);
    setIsEditting(true);
  };

  const handleCloseModel = () => {
    setSelectedCat(null);
    setIsEditting(false);
  };
  return (
    <AdminLayout>
      <DispatcherContext.Provider value={dispatch}>
        <div className="table-container">
          <div className="filter-bar">
            <div>
              <h3>Category List</h3>
            </div>
            <div className="filter-group">
              <div className="searchDiv">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search....."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  onClick={() => setSearchTerm(searchInput.trim())}
                  className="search-btn"
                >
                  Search
                </button>
              </div>
              <div className="addBtnDiv">
                <button className="add-btn" onClick={addHandlerOpenModel}>
                  Add Category
                </button>
              </div>
            </div>
          </div>

          <table className="categoryTable">
            <thead>
              <tr>
                <th>Category</th>
              </tr>
            </thead>
            <tbody id="category-table-body">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat: AdminCategoryProps) => (
                  <CategoryRow
                    key={cat.id}
                    cat={cat}
                    onHandleCatAction={handleOpenModel}
                  />
                ))
              ) : (
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No categories found.
                </td>
              )}
            </tbody>
          </table>
          {isEditting && selectedCat && (
            <CategoryEdit cat={selectedCat} onClose={handleCloseModel} />
          )}
          {isAdding && (
            <CategoryCreate
              onAdd={(cat) => dispatch({ type: "ADD_CATEGORY", payload: cat })}
              onClose={addHandlerCloseModel}
            />
          )}
        </div>
      </DispatcherContext.Provider>
    </AdminLayout>
  );
}
