import { FaUserCircle, FaEnvelope, FaTasks, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";

function Profile() {
  const email = localStorage.getItem("email") || "Not Available";

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-lg border-0 profile-card">

              <div
                className="card-header text-center text-white py-5"
                style={{
                  background: "linear-gradient(135deg,#0d6efd,#6610f2)"
                }}
              >
                <FaUserCircle size={110} />

                <h2 className="mt-3 fw-bold">
                  Welcome
                </h2>

                <p className="mb-0">
                  Task Management System
                </p>

              </div>

              <div className="card-body p-5">

                <div className="row text-center mb-4">

                  <div className="col-md-6 mb-3">

                    <div className="card shadow-sm">

                      <div className="card-body">

                        <FaEnvelope
                          size={35}
                          className="text-primary mb-2"
                        />

                        <h6>Email</h6>

                        <p className="text-muted mb-0">
                          {email}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="card shadow-sm">

                      <div className="card-body">

                        <FaTasks
                          size={35}
                          className="text-success mb-2"
                        />

                        <h6>Application</h6>

                        <p className="text-muted mb-0">
                          Task Management System
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                <hr />

                <h4 className="text-center mb-4">
                  Features
                </h4>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Create Tasks

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Edit Tasks

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Delete Tasks

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Search & Filter

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Secure Authentication

                    </div>

                  </div>

                  <div className="col-md-6 mb-3">

                    <div className="d-flex align-items-center">

                      <FaCheckCircle className="text-success me-3" />

                      Responsive Design

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;