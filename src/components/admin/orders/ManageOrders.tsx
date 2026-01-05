import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/admin/orders.css";
import type { AdminOrderProps } from "../AdminData";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import DispatcherContext from "../../DispatcherContext";

interface OrderRowProps {
  order: AdminOrderProps;
  onHandleOrderAction: (order: AdminOrderProps) => void;
}

interface OrderEditProps {
  order: AdminOrderProps;
  onClose: () => void;
}

export function OrderRow({ order, onHandleOrderAction }: OrderRowProps) {
  const handleOrderAction = () => {
    onHandleOrderAction(order);
  };
  return (
    <tr className="order-row" onClick={handleOrderAction}>
      <td>{order.id}</td>
      <td>{order.user}</td>
      <td>{order.product}</td>
      <td>{order.quantity}</td>
      <td>{order.category}</td>
      <td>${order.price}</td>
      <td>{order.date}</td>
      <td className={`order-status ${order.status.toLowerCase()}`}>
        {order.status}
      </td>
    </tr>
  );
}

export function OrderEdit({ order, onClose }: OrderEditProps) {
  const dispatch = useContext(DispatcherContext);

  const { register, handleSubmit } = useForm<AdminOrderProps>({
    defaultValues: {
      user: order.user,
      product: order.product,
      quantity: order.quantity,
      category: order.category,
      price: order.price,
      date: order.date,
      status: order.status,
    },
  });

  const onSubmit = (data: AdminOrderProps) => {
    console.log(data);

    const updateOrder = { ...order, status: data.status };

    dispatch({
      type: "UPDATE_ORDER",
      payload: updateOrder,
    });
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="orderUpdate-section">
      <div className="orderUpdate">
        <div className="xmark-icon">
          <button className="defaultXmark-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="orderTitle">Name</span>:{" "}
            <span id="user-name">{order.user}</span>
          </div>
          <br />

          <div>
            <span className="orderTitle">Email</span>:{" "}
            <span id="user-email">{order.email}</span>
          </div>
          <br />

          <div>
            <span className="orderTitle">Quantity</span>:{" "}
            <span id="quantity">{order.quantity}</span>
          </div>
          <br />

          <div>
            <span className="orderTitle">Amount</span>:{" "}
            <span id="amount">{order.price}</span>
          </div>
          <br />

          <div>
            <span className="orderTitle">Time</span>:
            <span id="time">{order.date}</span>
          </div>
          <br />

          <div>
            <span className="orderTitle">Status</span>:{" "}
            {order.status === "Pending" ? (
              <select
                {...register("status")}
                name="status"
                id="status-select"
                className="status"
              >
                <option className="order-status pending" value="Pending">
                  Pending
                </option>
                <option className="order-status completed" value="Completed">
                  Completed
                </option>
                <option className="order-status cancelled" value="Cancelled">
                  Cancelled
                </option>
              </select>
            ) : (
              <span
                id="status-span"
                className={`order-status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>
            )}
          </div>
          <br />

          {order.status === "Pending" && (
            <div className="orderEdit-btn">
              <button type="submit">Save</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

type OrderAction = {
  type: 'UPDATE_ORDER';
  payload: AdminOrderProps;
};

export function orderReducer(state: AdminOrderProps[], action: OrderAction) {
  switch (action.type) {
    case "UPDATE_ORDER":
      return state.map((order: { id: number }) =>
        order.id === action.payload.id ? action.payload : order
      );
    default:
      return state;
  }
}
