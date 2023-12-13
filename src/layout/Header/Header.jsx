import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import http from "../../http/http";

const Header = () => {
  const navigate = useNavigate();
  async function logout() {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      const response = await api.post("/logout");
      localStorage.clear();
      console.log(response);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Todos</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
};

export default Header;
