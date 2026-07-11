import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaCode } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import api from "../services/api";
const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.username){
            setError('Username is required')
            return;
        }
        if(!formData.password){
            setError('Password is required')
            return;
        }
        try {
            setLoading(true);
            setError("");
            const response = await api.post(
                "/login/",
                formData
            );
            login(response.data)
            toast.success('🎉 Logged in successfully! Ready to code 🚀')
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Invalid username or password"
            );
            toast.error('🚫 Login failed. Please check your credentials.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">

                        <div
                            className="card border-0 shadow-lg rounded-4"
                        >
                            <div className="card-body p-5">

                                <div className="text-center mb-4">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            background: "#0d6efd",
                                            color: "white",
                                            fontSize: "28px",
                                        }}
                                    >
                                        <FaCode />
                                    </div>

                                    <h2 className="fw-bold mb-1">
                                        BnestCode
                                    </h2>

                                    <p className="text-muted">
                                        Practice. Learn. Improve.
                                    </p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Username
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <FaUser />
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <FaLock />
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                        disabled={loading}
                                    >
                                        {
                                            loading
                                                ? "Signing In..."
                                                : "Login"
                                        }
                                    </button>

                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Don't have an account?
                                    </span>

                                    <Link
                                        to="/register"
                                        className="text-decoration-none ms-2 fw-semibold"
                                    >
                                        Register
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;