import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      localStorage.setItem("email", formData.email);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#4e73df,#224abe)",
      }}
    >
      <div className="row min-vh-100 justify-content-center align-items-center">

        <div className="col-md-5 col-lg-4">

          <div className="card shadow-lg border-0">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold text-primary">
                  Task Manager
                </h2>

                <p className="text-muted">
                  Welcome Back
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                <button
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  <FaSignInAlt className="me-2" />

                  {loading
                    ? "Signing In..."
                    : "Login"}

                </button>

              </form>

              <hr />

              <p className="text-center mb-0">

                Don't have an account?

                <Link
                  to="/register"
                  className="ms-2 text-decoration-none fw-bold"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;