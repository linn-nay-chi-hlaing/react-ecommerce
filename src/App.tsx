import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <button onClick={() => navigate("/admin-login")}>Admin</button><br />
        <button onClick={() => navigate("/home")}>User</button>
      </div>
    </>
  );
}

export default App;
