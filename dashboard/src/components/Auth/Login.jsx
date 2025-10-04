import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { useForgotPasswordMutation } from "../../api/authApi";
import logo from "../../assets/img/logo.jpeg";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await login({ email: formData.email, password: formData.password });
      if (formData.rememberMe) {
        // Optionally, extend token storage logic for "Remember Me"
        // For simplicity, tokens are already stored in localStorage
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }
    try {
      await forgotPassword({ email: formData.email }).unwrap();
      setError("Password reset link sent to your email");
    } catch (err) {
      setError(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="overflow-hidden p-3 acc-vh">
        <div className="row vh-100 w-100 g-0">
          <div className="col-lg-6 vh-100 overflow-y-auto overflow-x-hidden">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="vh-100 d-flex justify-content-between flex-column p-4 pb-0"
                >
                  <div className="text-center mb-4 auth-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                  </div>
                  <div>
                    <div className="mb-3">
                      <h3 className="mb-2">Sign In</h3>
                      <p className="mb-0">
                        Access the CRMS panel using your email and passcode.
                      </p>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <div className="input-group input-group-flat">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <span className="input-group-text">
                          <i className="ti ti-mail"></i>
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <div className="input-group input-group-flat pass-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control pass-input"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <span
                          className="input-group-text toggle-password"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`ti ${
                              showPassword ? "ti-eye" : "ti-eye-off"
                            }`}
                          ></i>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="form-check form-check-md d-flex align-items-center">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          id="checkebox-md"
                        />
                        <label
                          className="form-check-label text-dark ms-1"
                          htmlFor="checkebox-md"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div className="text-end">
                        <a
                          href="javascript:void(0);"
                          className="link-danger fw-medium link-hover"
                          onClick={handleForgotPassword}
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                  <div className="text-center pb-4">
                    <p className="text-dark mb-0">
                      Copyright &copy; {new Date().getFullYear()} - CRMS
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 account-bg-01"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
