import Navbar from "../components/Navbar";
import {
  FaCheckCircle,
  FaClock,
  FaFire,
  FaTrophy
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="mb-5">
          <h2 className="fw-bold">
            Welcome back 👋
          </h2>

          <p className="text-muted">
            Continue your coding journey and improve every day.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body text-center p-4">

                <FaCheckCircle
                  size={40}
                  className="text-success mb-3"
                />

                <h3 className="fw-bold">18</h3>

                <p className="text-muted mb-0">
                  Problems Solved
                </p>

              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body text-center p-4">

                <FaClock
                  size={40}
                  className="text-warning mb-3"
                />

                <h3 className="fw-bold">42</h3>

                <p className="text-muted mb-0">
                  Submissions
                </p>

              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body text-center p-4">

                <FaFire
                  size={40}
                  className="text-danger mb-3"
                />

                <h3 className="fw-bold">7</h3>

                <p className="text-muted mb-0">
                  Day Streak
                </p>

              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body text-center p-4">

                <FaTrophy
                  size={40}
                  className="text-primary mb-3"
                />

                <h3 className="fw-bold">65%</h3>

                <p className="text-muted mb-0">
                  Acceptance Rate
                </p>

              </div>
            </div>
          </div>

        </div>

        <div className="row mt-5">

          <div className="col-lg-8">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Recent Activity
                </h4>

                <ul className="list-group list-group-flush">

                  <li className="list-group-item">
                    ✅ Solved Reverse String
                  </li>

                  <li className="list-group-item">
                    ❌ Failed Two Sum
                  </li>

                  <li className="list-group-item">
                    ✅ Solved Add Two Numbers
                  </li>

                </ul>

              </div>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Next Goal
                </h4>

                <div className="mb-2">
                  Solve 2 more problems to reach
                  Bronze Badge.
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: "70%" }}
                  >
                    70%
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;