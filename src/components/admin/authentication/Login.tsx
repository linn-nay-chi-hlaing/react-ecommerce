import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../css/admin/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { adminStaff, type AdminStaffProps } from "../AdminData";
import { useLoggedIn } from "../../../useLoggedIn";

const loginSchema = yup.object({
  email: yup.string().email().required("Email Address is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required("Password is required."),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isStaffs, setIsStaffs] = useState<AdminStaffProps[]>(adminStaff);
  const [loginError, setLoginError] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const { setIsLoggedIn } = useLoggedIn();

  const onSubmit = (data: { email: string; password: string }) => {
    const matchedStaff = isStaffs.find(
      (staff) => staff.email === data.email && staff.password === data.password
    );

    if (matchedStaff) {
      setIsLoggedIn(matchedStaff);
      setLoginError("");
      navigate("/admin-dashboard");
      reset();
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {loginError && <p className="error-message">{loginError}</p>}

            <div className="user-input" style={{ marginBottom: "50px" }}>
              <input
                {...register("email")}
                type="email"
                className="username"
                placeholder="Email"
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <span className="focus-input" data-symbol=""></span>
            </div>

            <div className="user-input" style={{ marginBottom: "50px" }}>
              <div className="passwordInput">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="username"
                  id="password"
                  placeholder="Password"
                />

                <FontAwesomeIcon
                  id="eye-icon"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
              <span className="focus-input" data-symbol=""></span>
            </div>

            <div className="checkbox-detail">
              <label>
                <input
                  type="checkbox"
                  value="remember_email"
                  id="flexCheckDefault"
                />
                <span className="remember-me">Remember Me</span>
              </label>

              <div className="forgot-password">
                <a href="">Forgot password?</a>
              </div>
            </div>
            <br />

            <button type="submit" className="submit-btn">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
