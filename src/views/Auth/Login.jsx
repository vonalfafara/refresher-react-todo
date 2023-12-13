import { useState } from "react";
import "./Auth.css";
import http from "../../http/http";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
      const api = http();
      const { data } = await api.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="auth">
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
        <Link to="/register">To Register</Link>
      </form>
    </div>
  );
};

export default Login;
