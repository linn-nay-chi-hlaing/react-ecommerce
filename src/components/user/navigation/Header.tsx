import { Link, NavLink, useNavigate } from "react-router";
import "../../../css/user/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLoggedIn } from "../../../useLoggedIn";
import type { AdminUserProps } from "../../admin/AdminData";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const { isLoggedIn } = useLoggedIn();
  return (
    <header>
      <div className="nav-container border-bottom">
        <nav>
          <div id="header-menu">
            <Link to="/home" className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 46 45"
                fill="none"
              >
                <path
                  d="M31.8554 0C31.1425 0 30.4296 0.0986329 29.9804 0.248047C29.785 0.31543 29.6679 0.388672 29.6093 0.428711V5.66406H34.1015V4.6875L32.6366 3.22266L34.1015 1.75781V0.428711C34.0429 0.388672 33.9257 0.31543 33.7304 0.248047C33.2811 0.0986329 32.5585 0 31.8554 0ZM27.2265 2.29688C24.1796 2.28125 21.5624 2.96094 19.3261 4.17969C16.3378 5.80566 14.0624 8.35937 12.2265 11.3672C9.99989 15.0293 8.4081 19.375 7.02431 23.7402C7.07899 23.7402 7.13466 23.75 7.19032 23.75C7.43153 23.7695 7.66591 23.8086 7.91005 23.8867C8.20302 23.9746 8.47645 24.0918 8.72059 24.248C10.0975 19.9414 11.6405 15.7227 13.7304 12.2852C15.4491 9.45312 17.5292 7.1582 20.1659 5.72363C22.2948 4.56641 24.7948 3.94434 27.8515 4.06641V2.31055C27.6366 2.30078 27.4315 2.29785 27.2265 2.29688ZM28.0468 7.42188V8.78906H35.664V7.42188H28.0468ZM26.1034 10.5469C25.0585 12.1875 23.203 13.2617 21.6503 14.4629C19.9511 15.791 18.6718 17.0898 18.6718 19.043C18.6718 25.1855 19.8143 29.3457 20.9667 32.6172C21.9921 35.5176 23.0761 37.7344 23.3104 40.0391H40.4003C40.6347 37.7344 41.7186 35.5176 42.744 32.6172C43.8964 29.3457 45.039 25.1855 45.039 19.043C45.039 17.0898 43.7597 15.791 42.0604 14.4629C40.5077 13.2617 38.6522 12.1875 37.6073 10.5469H26.1034ZM6.91493 25.4785C6.63661 25.4785 6.41005 25.5566 6.16102 25.7129C5.78309 25.9473 5.3788 26.3965 5.01161 27.0215C4.77235 27.4219 4.55556 27.8809 4.35536 28.3789C4.61708 28.3008 4.88466 28.252 5.15614 28.2324C5.6161 28.1934 6.08876 28.2324 6.56825 28.3789C7.33388 28.6133 7.93934 29.043 8.41786 29.6094C8.52528 29.082 8.60341 28.5742 8.62294 28.0957C8.65224 27.373 8.56434 26.7773 8.36903 26.3672C8.18349 25.9668 7.93934 25.7324 7.40224 25.5664C7.27431 25.5273 7.14931 25.5078 7.037 25.4883C6.99501 25.4883 6.95399 25.4785 6.91395 25.4785H6.91493ZM5.45985 29.9707C5.39149 29.9707 5.32313 29.9707 5.25575 29.9805C4.44032 30.0586 3.61513 30.5762 2.80849 31.4355C1.73427 32.5879 0.840712 34.2676 0.436415 35.625C0.0311418 36.9824 -0.139757 38.877 0.131728 40.4199C0.403212 41.9629 1.02919 43.0371 2.10634 43.3594C3.18153 43.6719 4.28895 43.125 5.3622 41.9824C6.43642 40.8301 7.32411 39.1504 7.73427 37.793C8.13466 36.4453 8.29091 34.541 8.0077 32.9883C7.7245 31.4355 7.08876 30.3711 6.06727 30.0586C5.8661 30 5.66298 29.9707 5.45985 29.9707ZM22.4804 41.7969C21.914 41.7969 21.6112 41.9727 21.3768 42.2363C21.1522 42.4902 21.0155 42.8711 21.0155 43.2617C21.0155 43.6523 21.1522 44.0332 21.3768 44.2871C21.6112 44.5508 21.914 44.7266 22.4804 44.7266H41.2304C41.7968 44.7266 42.0995 44.5508 42.3339 44.2871C42.5585 44.0332 42.6952 43.6523 42.6952 43.2617C42.6952 42.8711 42.5585 42.4902 42.3339 42.2363C42.0995 41.9727 41.7968 41.7969 41.2304 41.7969H22.4804Z"
                  fill="black"
                />
              </svg>
              <span className="text">Amara</span>
            </Link>
            
            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <div className="dropdown">
                  <button
                    type="button"
                    className="nav-link dropdown-btn"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Categories
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>

                  {isOpen && (
                    <div className="category-dropdown">
                      <div>
                        <NavLink to="/women-products">Women</NavLink>
                        <br />

                        <NavLink to="/men-products">Men</NavLink>
                        <br />

                        <NavLink to="/unisex-products">Unisex</NavLink>
                        <br />
                      </div>
                    </div>
                  )}
                </div>
              </li>

              <li className="nav-item">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>

          <div className="second-header-menu">
            <div className="hamburger" id="hamburger">
              <i className="fa-solid fa-bars"></i>
            </div>

            <NavLink to="/shopping-cart" className="orderCart">
              <span className="orderCart-noti">
                {/* style="display: {{ $cartCount == 0 ? 'none' : '' }};" */}0
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 34 34"
                fill="none"
              >
                <path
                  d="M27.3333 27C28.2173 27 29.0652 27.3512 29.6903 27.9763C30.3154 28.6014 30.6666 29.4493 30.6666 30.3333C30.6666 31.2174 30.3154 32.0652 29.6903 32.6904C29.0652 33.3155 28.2173 33.6667 27.3333 33.6667C26.4492 33.6667 25.6014 33.3155 24.9763 32.6904C24.3511 32.0652 24 31.2174 24 30.3333C24 28.4833 25.4833 27 27.3333 27ZM0.666626 0.333332H6.11663L7.68329 3.66667H32.3333C32.7753 3.66667 33.1992 3.84226 33.5118 4.15482C33.8244 4.46738 34 4.8913 34 5.33333C34 5.61667 33.9166 5.9 33.8 6.16667L27.8333 16.95C27.2666 17.9667 26.1666 18.6667 24.9166 18.6667H12.5L11 21.3833L10.95 21.5833C10.95 21.6938 10.9939 21.7998 11.072 21.878C11.1501 21.9561 11.2561 22 11.3666 22H30.6666V25.3333H10.6666C9.78257 25.3333 8.93472 24.9821 8.3096 24.357C7.68448 23.7319 7.33329 22.8841 7.33329 22C7.33329 21.4167 7.48329 20.8667 7.73329 20.4L9.99996 16.3167L3.99996 3.66667H0.666626V0.333332ZM10.6666 27C11.5507 27 12.3985 27.3512 13.0236 27.9763C13.6488 28.6014 14 29.4493 14 30.3333C14 31.2174 13.6488 32.0652 13.0236 32.6904C12.3985 33.3155 11.5507 33.6667 10.6666 33.6667C9.78257 33.6667 8.93472 33.3155 8.3096 32.6904C7.68448 32.0652 7.33329 31.2174 7.33329 30.3333C7.33329 28.4833 8.81663 27 10.6666 27ZM25.6666 15.3333L30.3 7H9.23329L13.1666 15.3333H25.6666Z"
                  fill="#000000"
                />
              </svg>
            </NavLink>

            {(isLoggedIn as AdminUserProps) ? (
              <div>
                <div className="user-profile">
                  <button onClick={() => setIsLogout(!isLogout)}>
                    <img
                      src={isLoggedIn ? isLoggedIn.image : ""}
                      alt="Profile"
                      width="35"
                      height="35"
                      style={{ borderRadius: "50%" }}
                    />
                  </button>

                  {isLogout && (
                    <div className="profile-logout">
                      <div>
                        <a href="">Order</a>
                      </div>
                      <form style={{ display: "inline" }}>
                        <button
                          onClick={() => {
                            localStorage.clear();
                            navigate("/user-login");
                          }}
                          type="submit"
                        >
                          Logout
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Link to="/user-login">
                  <div className="header-login">
                    <span>Login</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
