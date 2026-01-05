import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../../../css/sidebar.css";
import type { AdminStaffProps } from "../AdminData";
import { useLoggedIn } from "../../../useLoggedIn";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleLogout: () => void;
}

export default function Header({ toggleSidebar, toggleLogout }: HeaderProps) {
  const { isLoggedIn } = useLoggedIn();

  return (
    <section>
      <nav className="head-bar">
        <button
          type="button"
          className="menu-btn"
          id="menu-btn"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="profile-detail">
          <div>
            <p>{isLoggedIn ? isLoggedIn.name : "Guest"}</p>
            <p>
              {"role" in (isLoggedIn ?? {})
                ? (isLoggedIn as AdminStaffProps).role
                : "No Role"}
            </p>
          </div>
          <div id="profile-icon">
            <a href="#" className="profile" onClick={toggleLogout}>
              <img src="public/images/download (1).jpg" alt="Profile" />
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
