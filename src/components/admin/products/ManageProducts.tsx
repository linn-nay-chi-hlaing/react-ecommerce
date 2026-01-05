import "../../../css/admin/products.css";
import {
  adminCategory,
  type AdminCategoryProps,
  type AdminProductProps,
} from "../AdminData.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import DispatcherContext from "../../DispatcherContext.tsx";

interface ProductRowProps {
  product: AdminProductProps;
  onHandleProductAction: (product: AdminProductProps) => void;
}

interface ProductCreateProps {
  product: AdminProductProps;
  onAdd: () => void;
  onClose: () => void;
}

interface ProductEditProps {
  product: AdminProductProps;
  onClose: () => void;
}

export function ProductRow({
  product,
  onHandleProductAction,
}: ProductRowProps) {
  const handleProductAction = () => {
    onHandleProductAction(product);
  };
  return (
    <tr className="product-row" onClick={handleProductAction}>
      <td>
        <img src={product.image} alt="{product.name}" />
      </td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td className="truncate">{product.description}</td>
      <td>${product.buy_price}</td>
      <td>${product.sell_price}</td>
      <td>{product.category}</td>
    </tr>
  );
}

type NewProductInput = Omit<AdminProductProps, "id">;

let nextId = 5;

function newProduct({
  name,
  image,
  quantity,
  description,
  buy_price,
  sell_price,
  category,
}: NewProductInput): AdminProductProps {
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
    quantity,
    description,
    buy_price,
    sell_price,
    category,
  };
}

const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  buy_price: yup
    .number()
    .positive("Buy price must be positive")
    .required("Buy price is required"),
  sell_price: yup
    .number()
    .positive("Sell price must be positive")
    .required("Sell price is required"),
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value) => value && value.length > 0
    ),
});

// Create Products
export function ProductCreate({ onClose, onAdd }: ProductCreateProps) {
  const [categories, setCategories] =
    useState<AdminCategoryProps[]>(adminCategory);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    onAdd(newProduct(data));
    // dispatch({
    //     type: "ADD_PRODUCT",
    //     payload: newProduct(data),
    // })
    reset();
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="createProduct-section">
      <div className="createProduct">
        <div className="create-xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="createProduct-detail">
            <div>
              <div className="create-gp">
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

              <div className="create-gp">
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  name="quantity"
                  id="stock"
                />
                {errors.quantity && (
                  <p className="error-message">{errors.quantity.message}</p>
                )}
              </div>

              <div className="create-gp">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  {...register("description")}
                  name="description"
                  id="description"
                ></textarea>
                {errors.description && (
                  <p className="error-message">{errors.description.message}</p>
                )}
              </div>

              <div className="create-gp">
                <label htmlFor="category">Category</label>
                <br />
                <select
                  {...register("category")}
                  name="category"
                  id="category_id"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="error-message">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="create-gp">
                <label htmlFor="buy_price">Buy Price</label>
                <br />
                <input
                  {...register("buy_price")}
                  type="text"
                  name="buy_price"
                  id="buy_price"
                />
              </div>

              <div className="create-gp">
                <label htmlFor="sell_price">Sell Price</label>
                <br />
                <input
                  {...register("sell_price")}
                  type="text"
                  name="sell_price"
                  id="sell_price"
                />
              </div>

              <div className="create-gp">
                <label htmlFor="image">Image</label>
                <br />
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                />
              </div>
            </div>
          </div>

          <div className="create-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Products
export function ProductEdit({ product, onClose }: ProductEditProps) {
  const dispatch = useContext(DispatcherContext);
  const [categories, setCategories] =
    useState<AdminCategoryProps[]>(adminCategory);
  const [preview, setPreview] = useState<string>(product?.image || "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdminProductProps>({
    defaultValues: {
      image: product.image,
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      buy_price: product.buy_price,
      sell_price: product.sell_price,
      category: product.category,
    },
    resolver: yupResolver(productSchema),
  });

  const watchImage = watch("image");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const onSubmit = (data: AdminProductProps) => {
    console.log(data);
    let updatedImage = product.image;

    if (data.image instanceof FileList && data.image.length > 0) {
      updatedImage = URL.createObjectURL(data.image[0]);
    }

    const updateProduct = { ...product, ...data, image: updatedImage };

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: updateProduct,
    });
    onClose();
  };

  return (
    <div className="editProduct-section">
      <div className="editProduct">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="editProduct-detail">
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
                <label htmlFor="stock">Quantity</label>
                <br />
                <input
                  {...register("quantity")}
                  type="text"
                  name="stock"
                  id="stock"
                />
                {errors.quantity && (
                  <p className="error-message">{errors.quantity.message}</p>
                )}
              </div>

              <div className="edit-gp">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  {...register("description")}
                  name="description"
                  id="description"
                ></textarea>
                {errors.description && (
                  <p className="error-message">{errors.description.message}</p>
                )}
              </div>

              <div className="edit-gp">
                <label htmlFor="category">Category</label>
                <br />
                <select
                  {...register("category")}
                  name="category_id"
                  id="category_id"
                >
                  {errors.category && (
                    <p className="error-message">{errors.category.message}</p>
                  )}
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="edit-gp">
                <label htmlFor="buy_price">Buy Price</label>
                <br />
                <input
                  {...register("buy_price")}
                  type="text"
                  name="buy_price"
                  id="buy_price"
                />
                {errors.buy_price && (
                  <p className="error-message">{errors.buy_price.message}</p>
                )}
              </div>

              <div className="edit-gp">
                <label htmlFor="sell_price">Sell Price</label>
                <br />
                <input
                  {...register("sell_price")}
                  type="text"
                  name="sell_price"
                  id="sell_price"
                />
                {errors.sell_price && (
                  <p className="error-message">{errors.sell_price.message}</p>
                )}
              </div>

              <div className="edit-gp">
                <label htmlFor="image">Image</label>
                <br />
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
                <br />
                <img
                  id="image-preview"
                  src={preview}
                  alt="Current Image"
                  width="80"
                  style={{ marginTop: "10px", borderRadius: "5px" }}
                />
              </div>
            </div>
          </div>

          <div className="edit-btn">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reducer
type ProductAction =
  | { type: "ADD_PRODUCT"; payload: AdminProductProps }
  | { type: "UPDATE_PRODUCT"; payload: AdminProductProps };

export function productReducer(
  state: AdminProductProps[],
  action: ProductAction
) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    default:
      return state;
  }
}
