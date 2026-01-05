import AdminLayout from "../AdminLayout";
import "../../../css/admin/orders.css";
import { useReducer, useState } from "react";
import { adminOrder, type AdminOrderProps } from "../AdminData";
import { OrderEdit, orderReducer, OrderRow } from "./ManageOrders";
import DispatcherContext from "../../DispatcherContext";

export default function Orders() {
  const [orders, dispatch] = useReducer(orderReducer, adminOrder);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderProps | null>(
    null
  );

  const [filterStatus, setFilterStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders: AdminOrderProps[] = orders.filter((order) => {
    const matchesSearch = order.user
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus
      ? order.status.toLowerCase() === filterStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  const handleOpenModel = (order: AdminOrderProps) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  const handleCloseModel = () => {
    setSelectedOrder(null);
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <DispatcherContext.Provider value={dispatch}>
        <div className="table-container">
          <div className="filter-bar">
            <div>
              <h3>Order List</h3>
            </div>
            <div className="filter-group">
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  name="status"
                  id="filter_status"
                >
                  <option value="">Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
                <button className="search-btn" onClick={() => setSearchTerm(searchInput.trim())}>Search</button>
              </div>
            </div>
          </div>

          <div id="order-list-wrapper">
            <table className="userTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="user-table-body">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onHandleOrderAction={handleOpenModel}
                    />
                  ))
                ) : (
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No orders found.
                  </td>
                )}
              </tbody>
            </table>
          </div>
          {isEditing && selectedOrder && (
            <OrderEdit order={selectedOrder} onClose={handleCloseModel} />
          )}
        </div>
      </DispatcherContext.Provider>
    </AdminLayout>
  );
}
