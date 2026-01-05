import { useNavigate } from "react-router";
import "../../../css/user/auth.css";
import Header from "../navigation/Header";

export default function UserRegister() {
    const navigate = useNavigate();
  return (
    <main className="user-layout">
      <Header />
      <div style={{ marginTop: "60px" }}>
        <div className="limiter">
          <div className="container-login">
            <div className="wrap-login">
              <form className="login-form">
                <div className="user-input" style={{ marginBottom: "30px" }}>
                  <input
                    type="text"
                    name="name"
                    className="username"
                    placeholder="Name"
                  />

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <div className="user-input" style={{ marginBottom: "30px" }}>
                  <input
                    type="email"
                    name="email"
                    className="username"
                    placeholder="Email"
                  />

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <div className="user-input" style={{ marginBottom: "30px" }}>
                  <input
                    type="text"
                    name="address"
                    className="username"
                    required
                    placeholder="address"
                  />

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <div className="user-input" style={{ marginBottom: "30px" }}>
                  <input
                    type="text"
                    name="phone"
                    className="username"
                    placeholder="Phone"
                  />

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <div
                  className="user-input passwordInput"
                  style={{ marginBottom: "30px" }}
                >
                  <input
                    type="password"
                    name="password"
                    className="username"
                    id="password"
                    required
                    placeholder="Password"
                  />

                  <i className="fa-solid fa-eye-slash" id="eye-icon"></i>

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <div className="user-input" style={{ marginBottom: "20px" }}>
                  <input
                    type="file"
                    name="image"
                    className="username"
                    placeholder="Image"
                  />

                  <span className="focus-input" data-symbol=""></span>
                </div>

                <button
                  onClick={() => navigate("/user-login")}
                  type="submit"
                  className="submit-btn"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
