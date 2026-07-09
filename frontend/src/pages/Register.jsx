import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaLock,
    FaEnvelope,
    FaCode
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
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

        if(!formData.email){
            setError('Email is required')
            return;
        }

        if(!formData.password){
            setError('password is required')
            return;
        }

        if(!formData.confirm_password){
            setError('confirm password is required')
            return;
        }

        if (formData.password.length<8){
            setError('password length should be greater than 8')
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        

        try {
            setLoading(true);
            setError("");

            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            await api.post(
                "/signup/",
                payload
            );
            toast.success('🎉 Account created successfully! Welcome aboard 🚀')
            navigate("/login");

        } catch (err) {
            setError(
                JSON.stringify(err.response.data) ||
                "Registration failed"
            );
            toast.error('🚫 Signup failed. Please check the entered details.')
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
                    <div className="col-lg-5 col-md-7">

                        <div className="card border-0 shadow-lg rounded-4">
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
                                        Create Account
                                    </h2>

                                    <p className="text-muted">
                                        Start solving coding challenges today
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
                                                placeholder="Choose username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <FaEnvelope />
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
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
                                                placeholder="Create password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Confirm Password
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <FaLock />
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm password"
                                                name="confirm_password"
                                                value={formData.confirm_password}
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
                                                ? "Creating Account..."
                                                : "Register"
                                        }
                                    </button>

                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Already have an account?
                                    </span>

                                    <Link
                                        to="/login"
                                        className="text-decoration-none ms-2 fw-semibold"
                                    >
                                        Login
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

export default Register;