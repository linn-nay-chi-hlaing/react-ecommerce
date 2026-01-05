import { useForm } from "react-hook-form";
import { useContext } from "react";
import type { AdminStaffProps, AdminUserProps } from "../AdminData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/admin/users.css";
import DispatcherContext from "../../DispatcherContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLoggedIn } from "../../../useLoggedIn";

interface UserRowProps {
  user: AdminUserProps;
  onHandleUserAction: (user: AdminUserProps) => void;
  onClose: () => void;
}

export function UserRow({ user, onHandleUserAction }: UserRowProps) {
  const handleUserAction = () => {
    onHandleUserAction(user);
  };
  return (
    <tr className="user-row" onClick={handleUserAction}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="truncate">{user.address}</td>
      <td>{user.phone}</td>
      <td
        className="status-toggle"
        style={{
          color: user.status === "Active" ? "#469223" : "#f3721c",
        }}
      >
        {user.status}
      </td>
    </tr>
  );
}

//User Edit
export function UserEdit({ user, onClose }: UserRowProps) {
  const dispatch = useContext(DispatcherContext);
  const { isLoggedIn } = useLoggedIn();

  const { register, handleSubmit } = useForm<AdminUserProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      status: user.status,
    },
  });

  const onSubmit = (data: AdminUserProps) => {
    console.log(data);

    const updateUser = { ...user, status: data.status };

    dispatch({
      type: "UPDATE_USER",
      payload: updateUser,
    });
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="editUser-section">
      <div className="editUser">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-gp">
            <label htmlFor="name">Name</label>
            <br />
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              readOnly
            />
          </div>
          <div className="edit-gp">
            <label htmlFor="email">Email</label>
            <br />
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              readOnly
            />
          </div>
          <div className="edit-gp">
            <label htmlFor="address">Address</label>
            <br />
            <input
              {...register("address")}
              type="text"
              name="address"
              id="address"
              readOnly
            />
          </div>
          <div className="edit-gp">
            <label htmlFor="phone">Phone</label>
            <br />
            <input
              {...register("phone")}
              type="text"
              name="phone"
              id="phone"
              readOnly
            />
          </div>

          <div className="edit-gp">
            <label htmlFor="status">Status</label>
            <br />

            <select {...register("status")} name="status" id="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {"role" in (isLoggedIn ?? {}) &&
            (isLoggedIn as AdminStaffProps).role === "Admin" && (
              <div className="edit-btn">
                <button type="submit">Save</button>
              </div>
            )}
        </form>
      </div>
    </div>
  );
}

type UserAction = {
  type: "UPDATE_USER";
  payload: AdminUserProps;
};

export function userReducer(state: AdminUserProps[], action: UserAction) {
  switch (action.type) {
    case "UPDATE_USER":
      return state.map((user: { id: number }) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
}
