import { useReducer, useState } from "react";
import "../../../css/admin/staffs.css";
import AdminLayout from "../AdminLayout";
import { adminStaff, type AdminStaffProps } from "../AdminData";
import { StaffCreate, StaffEdit, staffReducer, StaffRow } from "./ManageStaffs";
import DispatcherContext from "../../DispatcherContext";
import { useLoggedIn } from "../../../useLoggedIn";

export default function Staffs() {
  const [staffs, dispatch] = useReducer(staffReducer, adminStaff);
  const [isOpen, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<AdminStaffProps | null>(
    null
  );

  const { isLoggedIn } = useLoggedIn();

  const [filterRole, setFilterRole] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaffs: AdminStaffProps[] = staffs.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole ? staff.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleOpenAddModal = () => {
    setIsAdding(true);
  };

  const handleCloseAddModal = () => {
    setIsAdding(false);
  };

  const handleOpenModal = (staff: AdminStaffProps) => {
    setSelectedStaff(staff);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedStaff(null);
  };

  return (
    <AdminLayout>
      <DispatcherContext.Provider value={dispatch}>
        <div className="table-container">
          <div className="filter-bar">
            <div>
              <h3>Staff List</h3>
            </div>
            <div className="filter-group">
              <div>
                <select
                  name="filter_status"
                  id="filter_status"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="">Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
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

              {"role" in (isLoggedIn ?? {}) &&
                (isLoggedIn as AdminStaffProps).role === "Admin" && (
                  <div className="addBtnDiv">
                    <button
                      className="addStaff-btn"
                      onClick={handleOpenAddModal}
                    >
                      Add Staff
                    </button>
                  </div>
                )}
            </div>
          </div>

          <div id="staff-list-wrapper">
            <table className="staffTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody id="staff-table-body">
                {filteredStaffs.length > 0 ? (
                  filteredStaffs.map((staff) => (
                    <StaffRow
                      key={staff.id}
                      staff={staff}
                      onHandleStaffAction={handleOpenModal}
                    />
                  ))
                ) : (
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No staffs found.
                  </td>
                )}
              </tbody>
            </table>
          </div>

          {isOpen && selectedStaff && (
            <StaffEdit staff={selectedStaff} onClose={handleCloseModal} />
          )}

          {isAdding && (
            <StaffCreate
              onAddStaff={(staff: AdminStaffProps) =>
                dispatch({ type: "ADD_STAFF", payload: staff })
              }
              onClose={handleCloseAddModal}
            />
          )}
        </div>
      </DispatcherContext.Provider>
    </AdminLayout>
  );
}
