import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      if (response.data.success) {
        toast.success("Registration Successful");

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
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
        background: "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <div className="row min-vh-100 justify-content-center align-items-center">

        <div className="col-md-5 col-lg-4">

          <div className="card shadow-lg border-0">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold text-primary">
                  Create Account
                </h2>

                <p className="text-muted">
                  Join Task Manager
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Name
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>

                </div>

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
                      className="form-control"
                      name="email"
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
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
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
                  <FaUserPlus className="me-2" />

                  {loading
                    ? "Creating Account..."
                    : "Register"}

                </button>

              </form>

              <hr />

              <p className="text-center mb-0">

                Already have an account?

                <Link
                  to="/"
                  className="ms-2 fw-bold text-decoration-none"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;