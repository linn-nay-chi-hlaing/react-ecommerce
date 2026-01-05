import { useState, useReducer } from "react";
import AdminLayout from "../AdminLayout.tsx";
import { adminUser, type AdminUserProps } from "../AdminData";
import "../../../css/admin/users.css";
import { UserEdit, userReducer, UserRow } from "./ManageUsers";
import DispatcherContext from "../../DispatcherContext.tsx";

export default function Users() {
  const [users, dispatch] = useReducer(userReducer, adminUser);
  const [isOpen, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserProps | null>(null);

  const [filterStatus, setFilterStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (user: AdminUserProps) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    // setSelectedUser(null);
  };

  const filteredUsers: AdminUserProps[] = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus
      ? user.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <DispatcherContext value={dispatch}>
        <div className="table-container">
          <div className="filter-bar">
            <div>
              <h3>User List</h3>
            </div>
            <div className="filter-group">
              <div>
                <select
                  name="filter_status"
                  id="filter_status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="searchDiv">
                <input
                  type="search"
                  name="search"
                  id="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search....."
                />
                <button
                  className="search-btn"
                  onClick={() => setSearchTerm(searchInput.trim())}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div id="user-list-wrapper">
            <table className="userTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody id="user-table-body">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserRow
                      user={user}
                      key={user.id}
                      onHandleUserAction={handleOpenModal}
                    />
                  ))
                ) : (
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No users found.
                  </td>
                )}
              </tbody>
            </table>
          </div>
          {isOpen && selectedUser && (
            <UserEdit user={selectedUser} onClose={handleCloseModal} />
          )}
        </div>
      </DispatcherContext>
    </AdminLayout>
  );
}
