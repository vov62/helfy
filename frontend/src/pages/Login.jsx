import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setMessage("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "error");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <br />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
