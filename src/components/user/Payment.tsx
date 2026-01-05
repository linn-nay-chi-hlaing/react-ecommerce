import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/user/payment.css";
import UserLayout from "./UserLayout";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";

export default function Payment() {
  const location = useLocation();
  const total = location.state?.total ?? 0;

  const navigate = useNavigate();
  return (
    <UserLayout>
      <div className="payment-section">
        <div className="payment-container">
          <h2>Payment</h2>

          <form className="payment-form" id="my-payment-form">
            <label htmlFor="email">Email</label>
            <div className="email-field">
              <input type="email" id="email" value="" readOnly />
              <span className="checkmark">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            </div>

            <label htmlFor="card">Card Information</label>
            <input type="text" placeholder="" />
            {/* <div id="card-number" className="stripe-input"></div> */}

            <div
              id="card-errors"
              role="alert"
              style={{ color: "red", marginTop: "10px" }}
            ></div>

            <div className="payment-row">
              <div className="payment-col">
                <label htmlFor="expiry">MM / YY</label>
                {/* <div id="card-expiry" className="stripe-input"></div> */}
                <input type="text" placeholder="" />
              </div>
              <div className="payment-col">
                <label htmlFor="cvc">CVC</label>
                {/* <div id="card-cvc" className="stripe-input"></div> */}
                <input type="text" placeholder="" />
              </div>
            </div>

            <label htmlFor="name">Name on card</label>
            <input type="text" id="name" placeholder="" />

            <label htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" placeholder="" />

            <button type="submit" onClick={() => navigate("/payment-success")}>
              Pay
            </button>
            <div
              id="card-errors"
              style={{ color: "red", marginTop: "10px" }}
            ></div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
