import type { AdminStaffProps } from "../AdminData";
import "../../../css/admin/staffs.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import DispatcherContext from "../../DispatcherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLoggedIn } from "../../../useLoggedIn";

interface StaffRowProps {
  staff: AdminStaffProps;
  onHandleStaffAction: (staff: AdminStaffProps) => void;
}

interface StaffEditProps {
  staff: AdminStaffProps;
  onClose: () => void;
}

interface StaffCreateProps {
  onAddStaff: () => void;
  onClose: () => void;
}

export function StaffRow({ staff, onHandleStaffAction }: StaffRowProps) {
  const handlerStaffAction = () => {
    onHandleStaffAction(staff);
  };
  return (
    <tr className="staff-row" onClick={handlerStaffAction}>
      <td>
        <img src={staff.image} alt={staff.name} />
      </td>
      <td>{staff.name}</td>
      <td>{staff.email}</td>
      <td className="truncate">{staff.address}</td>
      <td>{staff.phone}</td>
      <td>{staff.role}</td>
    </tr>
  );
}

type NewStaffInput = Omit<AdminStaffProps, "id">;

let nextId = 4;

function newStaff({
  image,
  name,
  email,
  address,
  phone,
  role,
}: NewStaffInput): AdminStaffProps {
  let imageUrl = "";

  if (image instanceof FileList && image.length > 0) {
    imageUrl = URL.createObjectURL(image[0]);
  } else if (typeof image === "string") {
    imageUrl = image;
  }
  return {
    id: nextId++,
    image: imageUrl,
    name,
    email,
    address,
    phone,
    role,
  };
}

const staffSchema = yup.object({
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value) => value && value.length > 0
    ),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
  role: yup.string().required("Role is required"),
});

// Create Staff
export function StaffCreate({ onAddStaff, onClose }: StaffCreateProps) {
  const [preview, setPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(staffSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onAddStaff(newStaff(data));
    reset();
    if (onClose) {
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="editStaff-section">
      <div className="editStaff">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Create Staff</h2>
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="editStaff-detail">
            <div>
              <div className="edit-gp">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="phone">Phone</label>
                <br />
                <input
                  {...register("phone")}
                  type="text"
                  name="phone"
                  id="phone"
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone.message}</p>
                )}
              </div>
              <div className="editStaff-gp">
                <label htmlFor="role">Role</label>
                <br />
                <select {...register("role")} name="role" id="role">
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
                {errors.role && (
                  <p className="error-message">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="edit-gp">
                <label htmlFor="address">Address</label>
                <br />
                <input
                  {...register("address")}
                  type="text"
                  name="address"
                  id="address"
                />
                {errors.address && (
                  <p className="error-message">{errors.address.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <br />
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="error-message">{errors.image.message}</p>
                )}
                <br />

                {preview && (
                  <img
                    id="previewImage"
                    src={preview}
                    alt="Preview"
                    width="80"
                    style={{ marginTop: "10px", borderRadius: "50%" }}
                  />
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="ud-btn">
          <div className="editStaff-btn">
            <button type="submit" form="updateForm">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Edit Staff
export function StaffEdit({ staff, onClose }: StaffEditProps) {
  const dispatch = useContext(DispatcherContext);
  const [preview, setPreview] = useState<string>(staff?.image || "");
  const { isLoggedIn } = useLoggedIn();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this staff?")) {
      dispatch({
        type: "DELETE_STAFF",
        payload: staff,
      });
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdminStaffProps>({
    defaultValues: {
      image: staff.image,
      name: staff.name,
      email: staff.email,
      address: staff.address,
      phone: staff.phone,
      role: staff.role,
    },
    resolver: yupResolver(staffSchema),
  });

  const watchImage = watch("image");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const onSubmit = (data: AdminStaffProps) => {
    console.log(data);
    let updatedImage = staff.image;

    if (data.image instanceof FileList && data.image.length > 0) {
      updatedImage = URL.createObjectURL(data.image[0]);
    }

    const updateStaff = { ...staff, ...data, image: updatedImage };

    dispatch({
      type: "UPDATE_STAFF",
      payload: updateStaff,
    });
    onClose();
  };

  return (
    <div className="editStaff-section">
      <div className="editStaff">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Edit Staff</h2>
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="editStaff-detail">
            <div>
              <div className="edit-gp">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="phone">Phone</label>
                <br />
                <input
                  {...register("phone")}
                  type="text"
                  name="phone"
                  id="phone"
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone.message}</p>
                )}
              </div>
              <div className="editStaff-gp">
                <label htmlFor="role">Role</label>
                <br />
                <select {...register("role")} name="role" id="role">
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
                {errors.role && (
                  <p className="error-message">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="edit-gp">
                <label htmlFor="address">Address</label>
                <br />
                <input
                  {...register("address")}
                  type="text"
                  name="address"
                  id="address"
                />
                {errors.address && (
                  <p className="error-message">{errors.address.message}</p>
                )}
              </div>
              <div className="edit-gp">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <br />
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="error-message">{errors.image.message}</p>
                )}
                <br />

                <img
                  id="previewImage"
                  src={preview}
                  alt="Current Image"
                  width="80"
                  style={{ marginTop: "10px", borderRadius: "50%" }}
                />
              </div>
            </div>
          </div>
        </form>

        {"role" in (isLoggedIn ?? {}) &&
          (isLoggedIn as AdminStaffProps).role === "Admin" && (
            <div className="ud-btn">
              <form id="deleteForm">
                <div className="editStaff-btn">
                  <button
                    type="submit"
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </form>
              <div className="editStaff-btn">
                <button type="submit" form="updateForm">
                  Update
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

// Reducer
type StaffAction =
  | { type: "ADD_STAFF"; payload: AdminStaffProps }
  | { type: "UPDATE_STAFF"; payload: AdminStaffProps }
  | { type: "DELETE_STAFF"; payload: AdminStaffProps };

export function staffReducer(state: AdminStaffProps[], action: StaffAction) {
  switch (action.type) {
    case "ADD_STAFF":
      return [...state, action.payload];
    case "UPDATE_STAFF":
      return state.map((staff) =>
        staff.id === action.payload.id ? action.payload : staff
      );
    case "DELETE_STAFF":
      return state.filter((staff) => staff.id !== action.payload.id);
    default:
      return state;
  }
}
