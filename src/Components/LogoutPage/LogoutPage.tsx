import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./LogoutPage.css";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("watched");
    localStorage.removeItem("watchLater");
    localStorage.removeItem("dropped");

    navigate("/");
  };

  return (
    <>
      <Header user={null} onLogout={handleLogout} />
      <div className="logout-container">
        <div className="logout-box">
          <h2>Logout</h2>
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons">
            <button onClick={handleLogout} className="logout-button">
              Yes, Logout
            </button>
            <button onClick={() => navigate("/")} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutPage;
