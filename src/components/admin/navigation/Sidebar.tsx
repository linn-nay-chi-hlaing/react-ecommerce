import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/sidebar.css";
import {
  faBagShopping,
  faBorderAll,
  faClipboardList,
  faPeopleGroup,
  faShop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";

interface SidebarProps {
  isSidebar: boolean;
}

export default function Sidebar({ isSidebar }: SidebarProps) {
  return (
    <section className={`sidebar ${isSidebar ? "" : "hide"}`}>
      <a href="#" className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 46 45"
          fill="none"
        >
          <path
            d="M31.8554 0C31.1425 0 30.4296 0.0986329 29.9804 0.248047C29.785 0.31543 29.6679 0.388672 29.6093 0.428711V5.66406H34.1015V4.6875L32.6366 3.22266L34.1015 1.75781V0.428711C34.0429 0.388672 33.9257 0.31543 33.7304 0.248047C33.2811 0.0986329 32.5585 0 31.8554 0ZM27.2265 2.29688C24.1796 2.28125 21.5624 2.96094 19.3261 4.17969C16.3378 5.80566 14.0624 8.35937 12.2265 11.3672C9.99989 15.0293 8.4081 19.375 7.02431 23.7402C7.07899 23.7402 7.13466 23.75 7.19032 23.75C7.43153 23.7695 7.66591 23.8086 7.91005 23.8867C8.20302 23.9746 8.47645 24.0918 8.72059 24.248C10.0975 19.9414 11.6405 15.7227 13.7304 12.2852C15.4491 9.45312 17.5292 7.1582 20.1659 5.72363C22.2948 4.56641 24.7948 3.94434 27.8515 4.06641V2.31055C27.6366 2.30078 27.4315 2.29785 27.2265 2.29688ZM28.0468 7.42188V8.78906H35.664V7.42188H28.0468ZM26.1034 10.5469C25.0585 12.1875 23.203 13.2617 21.6503 14.4629C19.9511 15.791 18.6718 17.0898 18.6718 19.043C18.6718 25.1855 19.8143 29.3457 20.9667 32.6172C21.9921 35.5176 23.0761 37.7344 23.3104 40.0391H40.4003C40.6347 37.7344 41.7186 35.5176 42.744 32.6172C43.8964 29.3457 45.039 25.1855 45.039 19.043C45.039 17.0898 43.7597 15.791 42.0604 14.4629C40.5077 13.2617 38.6522 12.1875 37.6073 10.5469H26.1034ZM6.91493 25.4785C6.63661 25.4785 6.41005 25.5566 6.16102 25.7129C5.78309 25.9473 5.3788 26.3965 5.01161 27.0215C4.77235 27.4219 4.55556 27.8809 4.35536 28.3789C4.61708 28.3008 4.88466 28.252 5.15614 28.2324C5.6161 28.1934 6.08876 28.2324 6.56825 28.3789C7.33388 28.6133 7.93934 29.043 8.41786 29.6094C8.52528 29.082 8.60341 28.5742 8.62294 28.0957C8.65224 27.373 8.56434 26.7773 8.36903 26.3672C8.18349 25.9668 7.93934 25.7324 7.40224 25.5664C7.27431 25.5273 7.14931 25.5078 7.037 25.4883C6.99501 25.4883 6.95399 25.4785 6.91395 25.4785H6.91493ZM5.45985 29.9707C5.39149 29.9707 5.32313 29.9707 5.25575 29.9805C4.44032 30.0586 3.61513 30.5762 2.80849 31.4355C1.73427 32.5879 0.840712 34.2676 0.436415 35.625C0.0311418 36.9824 -0.139757 38.877 0.131728 40.4199C0.403212 41.9629 1.02919 43.0371 2.10634 43.3594C3.18153 43.6719 4.28895 43.125 5.3622 41.9824C6.43642 40.8301 7.32411 39.1504 7.73427 37.793C8.13466 36.4453 8.29091 34.541 8.0077 32.9883C7.7245 31.4355 7.08876 30.3711 6.06727 30.0586C5.8661 30 5.66298 29.9707 5.45985 29.9707ZM22.4804 41.7969C21.914 41.7969 21.6112 41.9727 21.3768 42.2363C21.1522 42.4902 21.0155 42.8711 21.0155 43.2617C21.0155 43.6523 21.1522 44.0332 21.3768 44.2871C21.6112 44.5508 21.914 44.7266 22.4804 44.7266H41.2304C41.7968 44.7266 42.0995 44.5508 42.3339 44.2871C42.5585 44.0332 42.6952 43.6523 42.6952 43.2617C42.6952 42.8711 42.5585 42.4902 42.3339 42.2363C42.0995 41.9727 41.7968 41.7969 41.2304 41.7969H22.4804Z"
            fill="black"
          />
        </svg>
        <span className="text">Amara</span>
      </a>

      <ul className="side-menu top">
        <li>
          <NavLink to="/admin-dashboard" className="nav-link">
            <FontAwesomeIcon icon={faBorderAll} />
            <span className="text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin-users" className="nav-link">
            <FontAwesomeIcon icon={faUser} />
            <span className="text">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-staffs" className="nav-link">
            <FontAwesomeIcon icon={faPeopleGroup} />
            <span className="text">Staffs</span>
          </NavLink>
        </li>
      </ul>

      <ul className="side-menu bottom">
        <li>
          <NavLink to="/admin-products">
            <FontAwesomeIcon icon={faBagShopping} className="nav-link" />
            <span className="text">Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin-categories">
            <FontAwesomeIcon icon={faShop} />
            <span className="text">Categories</span>
          </NavLink>
        </li>

        <li data-tooltip="Order">
          <NavLink to="/admin-orders">
            <FontAwesomeIcon icon={faClipboardList} />
            <span className="text">Orders</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}
