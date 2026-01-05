import { useState, type ReactNode } from "react";
import "../../css/sidebar.css";
import Header from "./navigation/Header";
import Sidebar from "./navigation/Sidebar";
import { useNavigate } from "react-router";

interface AdminProps {
  children: ReactNode;
}

export default function Admin({ children }: AdminProps) {
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogout, setIsLogout] = useState(false);

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const toggleLogout = () => {
    setIsLogout(!isLogout);
  };
  return (
    <div>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Header toggleLogout={toggleLogout} toggleSidebar={toggleSidebar} />
        <section style={{ marginTop: "56px" }}>
          {children}
          {isLogout && (
            <div id="user-menu">
              <form id="logout-form">
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/admin-login");
                  }}
                  id="log-out"
                  type="button"
                >
                  Log Out
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
