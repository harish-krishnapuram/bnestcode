import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
    FaCheckCircle,
    FaClock,
    FaFire,
    FaTrophy
} from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState({
        solved_count: 0,
        total_submissions: 0,
        acceptance_rate: 0,
        day_streak: 0,
        goal_progress: 0,
        remaining_to_goal: 0,
        recent_activity: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await api.get(
                "/dashboard/"
            );

            setStats(response.data);
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
                    <div
                        className="spinner-border text-primary"
                    ></div>

                    <p className="mt-3">
                        Loading Dashboard...
                    </p>
                </div>
            </>
        );
    }

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
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaCheckCircle
                                    size={40}
                                    className="text-success mb-3"
                                />

                                <h3 className="fw-bold">
                                    {stats.solved_count}
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

                                <FaClock
                                    size={40}
                                    className="text-warning mb-3"
                                />

                                <h3 className="fw-bold">
                                    {stats.total_submissions}
                                </h3>

                                <p className="text-muted mb-0">
                                    Submissions
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaFire
                                    size={40}
                                    className="text-danger mb-3"
                                />

                                <h3 className="fw-bold">
                                    {stats.day_streak}
                                </h3>

                                <p className="text-muted mb-0">
                                    Day Streak
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaTrophy
                                    size={40}
                                    className="text-primary mb-3"
                                />

                                <h3 className="fw-bold">
                                    {stats.acceptance_rate}%
                                </h3>

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

                                    {
                                        stats.recent_activity.length > 0
                                            ?
                                            stats.recent_activity.map(
                                                (activity, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item d-flex justify-content-between align-items-center"
                                                    >
                                                        <div>
                                                            {
                                                                activity.status === "accepted"
                                                                    ? "✅ Solved "
                                                                    : "❌ Failed "
                                                            }

                                                            {
                                                                activity.problem
                                                            }
                                                        </div>

                                                        <small className="text-muted">
                                                            {
                                                                new Date(
                                                                    activity.submitted_at
                                                                ).toLocaleDateString()
                                                            }
                                                        </small>
                                                    </li>
                                                )
                                            )
                                            :
                                            (
                                                <li className="list-group-item text-muted">
                                                    No activity yet.
                                                </li>
                                            )
                                    }

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

                                <div className="mb-3">

                                    {
                                        stats.remaining_to_goal > 0
                                            ?
                                            `Solve ${stats.remaining_to_goal} more problems to reach Bronze Badge.`
                                            :
                                            "Bronze Badge Achieved 🎉"
                                    }

                                </div>

                                <div className="progress" style={{ height: "25px" }}>
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                        style={{
                                            width: `${stats.goal_progress}%`
                                        }}
                                    >
                                        {
                                            Math.round(
                                                stats.goal_progress
                                            )
                                        }%
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