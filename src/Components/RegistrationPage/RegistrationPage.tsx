import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Header from "../Header/Header";
import "./RegistrationPage.css";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8080/api/users/register", formData);

      setMessage(
        "Registration successful! Please go to the login page to sign in."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(
          error.response?.data || "Registration failed. Please try again."
        );
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header user={null} onLogout={() => {}} />
      <div className="registration-container">
        <div className="registration-form-container">
          <h2>Create Account</h2>
          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message.includes("successful") ? (
                <>
                  Registration successful! Please{" "}
                  <a
                    href="/login"
                    style={{ color: "#007bff", textDecoration: "underline" }}
                  >
                    click here
                  </a>{" "}
                  to go to the login page.
                </>
              ) : (
                message
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
