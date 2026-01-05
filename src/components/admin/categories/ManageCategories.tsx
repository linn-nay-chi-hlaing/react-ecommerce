import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/admin/categories.css";
import type { AdminCategoryProps } from "../AdminData";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import DispatcherContext from "../../DispatcherContext";

interface CategoryRowProps {
  cat: AdminCategoryProps;
  onHandleCatAction: (cat: AdminCategoryProps) => void;
}

interface CategoryCreateProps {
  onAdd: () => void;
  onClose: () => void;
}

interface CategoryEditProps {
  cat: AdminCategoryProps;
  onClose: () => void;
}

export function CategoryRow({ cat, onHandleCatAction }: CategoryRowProps) {
  const handleCatAction = () => {
    onHandleCatAction(cat);
  };
  return (
    <tr className="category-row" onClick={handleCatAction}>
      <td>{cat.name}</td>
    </tr>
  );
}

let nextId = 4;

function newCategory(name: string) {
  return {
    id: nextId++,
    name: name,
  };
}

const catSchema = yup.object({
  name: yup.string().required("Category name is required"),
});

// Category Create
export function CategoryCreate({ onAdd, onClose }: CategoryCreateProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(catSchema),
  });

  const onSubmit = (data: any) => {
    const category = newCategory(data.name);
    onAdd(category);
    reset();

    if (onClose) onClose();
  };
  return (
    <div className="createCategory-section">
      <div className="createCategory">
        <div className="create-xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-gp">
            <label htmlFor="create-name">Category</label>
            <br />
            <input
              {...register("name")}
              type="text"
              name="name"
              id="create-name"
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className="create-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Category Edit
export function CategoryEdit({ cat, onClose }: CategoryEditProps) {
  const dispatch = useContext(DispatcherContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cat.name,
    },
    resolver: yupResolver(catSchema),
  });

  const onSubmit = (data: AdminCategoryProps) => {
    const updateCategory = { ...cat, name: data.name };

    dispatch({
      type: "UPDATE_CATEGORY",
      payload: updateCategory,
    });
    onClose();
  };
  return (
    <div className="editCategory-section">
      <div className="editCategory">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Edit Category</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="editForm"
          id="edit-category-form"
        >
          <div className="edit-gp">
            <label htmlFor="name">Category</label>
            <br />
            <input
              {...register("name")}
              type="text"
              name="name"
              id="edit-name"
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className="edit-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reducer
type CategoryAction =
  | { type: "ADD_CATEGORY"; payload: AdminCategoryProps }
  | { type: "UPDATE_CATEGORY"; payload: AdminCategoryProps };

export function categoryReducer(
  state: AdminCategoryProps[],
  action: CategoryAction
) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "UPDATE_CATEGORY":
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    default:
      return state;
  }
}
