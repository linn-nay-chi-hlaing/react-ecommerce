import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserLayout from "./UserLayout";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import "../../css/user/payment-success.css";

export default function PaymentSuccess() {
  return (
    <UserLayout>
      <div className="success-container">
        <div className="success-box">
          <div>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <h3>Your Payment was Successful</h3>
          <p>Thanks for being there with us</p>
          <div>
            <Link to="/home">Go Back Home</Link>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
