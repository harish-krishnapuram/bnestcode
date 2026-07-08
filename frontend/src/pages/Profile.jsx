import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
    FaUserCircle,
    FaCheckCircle,
    FaCode,
    FaChartLine,
    FaLaptopCode
} from "react-icons/fa";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get(
                "/profile/"
            );

            setProfile(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary"></div>

                    <p className="mt-3">
                        Loading Profile...
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="card border-0 shadow rounded-4 mb-5">
                    <div className="card-body p-5">

                        <div className="row align-items-center">

                            <div className="col-md-2 text-center">
                                <FaUserCircle
                                    size={120}
                                    className="text-primary"
                                />
                            </div>

                            <div className="col-md-10">

                                <h2 className="fw-bold mb-2">
                                    {profile.username}
                                </h2>

                                <p className="text-muted mb-1">
                                    {profile.email || "No email provided"}
                                </p>

                                <p className="text-muted">
                                    Favorite Language:
                                    <strong className="ms-2 text-primary">
                                        {profile.favorite_language}
                                    </strong>
                                </p>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="row g-4 mb-5">

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaCheckCircle
                                    size={40}
                                    className="text-success mb-3"
                                />

                                <h3 className="fw-bold">
                                    {profile.solved_count}
                                </h3>

                                <p className="text-muted mb-0">
                                    Problems Solved
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaCode
                                    size={40}
                                    className="text-warning mb-3"
                                />

                                <h3 className="fw-bold">
                                    {profile.total_submissions}
                                </h3>

                                <p className="text-muted mb-0">
                                    Total Submissions
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaChartLine
                                    size={40}
                                    className="text-success mb-3"
                                />

                                <h3 className="fw-bold">
                                    {profile.accepted_submissions}
                                </h3>

                                <p className="text-muted mb-0">
                                    Accepted
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaLaptopCode
                                    size={40}
                                    className="text-primary mb-3"
                                />

                                <h3 className="fw-bold">
                                    {profile.acceptance_rate}%
                                </h3>

                                <p className="text-muted mb-0">
                                    Acceptance Rate
                                </p>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="card border-0 shadow rounded-4">
                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-4">
                            Recent Submissions
                        </h4>

                        {
                            profile.recent_submissions.length === 0
                            ?
                            (
                                <p className="text-muted">
                                    No submissions yet.
                                </p>
                            )
                            :
                            (
                                profile.recent_submissions.map(
                                    (submission, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                                        >
                                            <div>
                                                <h6 className="mb-1">
                                                    {
                                                        submission.problem
                                                    }
                                                </h6>

                                                <small className="text-muted">
                                                    {
                                                        submission.language
                                                    }
                                                </small>
                                            </div>

                                            <div className="text-end">

                                                <span
                                                    className={`badge ${
                                                        submission.status === "accepted"
                                                        ? "bg-success"
                                                        : submission.status === "wrong_answer"
                                                        ? "bg-danger"
                                                        : "bg-warning"
                                                    }`}
                                                >
                                                    {
                                                        submission.status
                                                            .replaceAll(
                                                                "_",
                                                                " "
                                                            )
                                                    }
                                                </span>

                                                <div>
                                                    <small className="text-muted">
                                                        {
                                                            new Date(
                                                                submission.submitted_at
                                                            ).toLocaleString()
                                                        }
                                                    </small>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                )
                            )
                        }

                    </div>
                </div>

            </div>
        </>
    );
};

export default Profile;