import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import type { UserDTO } from "../../Types/UserDTO";
import Header from "../Header/Header";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post<UserDTO>(
        `http://localhost:8080/api/users/login?email=${email}&password=${password}`
      );

      const userData = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          token: userData.token,
        })
      );

      localStorage.setItem("watched", JSON.stringify(userData.watchedMovies));
      localStorage.setItem("watchLater", JSON.stringify(userData.watchLater));
      localStorage.setItem("dropped", JSON.stringify(userData.dropped));

      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data || "Invalid email or password");
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header user={null} onLogout={() => {}} />
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="link">
              Register here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
