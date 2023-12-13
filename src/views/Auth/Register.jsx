import { useState } from "react";
import "./Auth.css";
import http from "../../http/http";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      const api = http();
      const { data } = await api.post("/register", { name, email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="auth">
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Link to="/login">To Login</Link>
      </form>
    </div>
  );
};

export default Register;
