import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
    FaCheckCircle,
    FaMedal,
    FaCode,
} from "react-icons/fa";

const Progress = () => {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await api.get(
                "/progress/"
            );

            setProgress(response.data);
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
                        Loading progress...
                    </p>
                </div>
            </>
        );
    }

    const easyPercentage =
        progress.easy_total > 0
            ? (progress.easy_solved / progress.easy_total) * 100
            : 0;

    const mediumPercentage =
        progress.medium_total > 0
            ? (progress.medium_solved / progress.medium_total) * 100
            : 0;

    const hardPercentage =
        progress.hard_total > 0
            ? (progress.hard_solved / progress.hard_total) * 100
            : 0;

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="mb-5">
                    <h2 className="fw-bold">
                        Your Progress 📈
                    </h2>

                    <p className="text-muted">
                        Track your coding journey.
                    </p>
                </div>

                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card shadow border-0 rounded-4 h-100">
                            <div className="card-body text-center p-4">

                                <FaCheckCircle
                                    size={40}
                                    className="text-success mb-3"
                                />

                                <h2 className="fw-bold">
                                    {progress.solved_count}
                                </h2>

                                <p className="text-muted mb-0">
                                    Problems Solved
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card shadow border-0 rounded-4 h-100">
                            <div className="card-body p-4">

                                <h5 className="mb-4">
                                    Difficulty Breakdown
                                </h5>

                                <p>
                                    Easy ({progress.easy_solved}/{progress.easy_total})
                                </p>

                                <div className="progress mb-3">
                                    <div
                                        className="progress-bar bg-success"
                                        style={{
                                            width: `${easyPercentage}%`
                                        }}
                                    >
                                        {Math.round(easyPercentage)}%
                                    </div>
                                </div>

                                <p>
                                    Medium ({progress.medium_solved}/{progress.medium_total})
                                </p>

                                <div className="progress mb-3">
                                    <div
                                        className="progress-bar bg-warning"
                                        style={{
                                            width: `${mediumPercentage}%`
                                        }}
                                    >
                                        {Math.round(mediumPercentage)}%
                                    </div>
                                </div>

                                <p>
                                    Hard ({progress.hard_solved}/{progress.hard_total})
                                </p>

                                <div className="progress">
                                    <div
                                        className="progress-bar bg-danger"
                                        style={{
                                            width: `${hardPercentage}%`
                                        }}
                                    >
                                        {Math.round(hardPercentage)}%
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-5">

                    <div className="col-lg-7">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Solved Problems
                                </h4>

                                {
                                    progress.solved_problems.length === 0
                                    ?
                                    (
                                        <p className="text-muted">
                                            No solved problems yet.
                                        </p>
                                    )
                                    :
                                    (
                                        progress.solved_problems.map(
                                            (problem) => (
                                                <div
                                                    key={problem.id}
                                                    className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                                                >
                                                    <div>
                                                        <FaCode className="me-2 text-primary" />

                                                        {problem.title}
                                                    </div>

                                                    <span
                                                        className={`badge ${
                                                            problem.difficulty === "easy"
                                                            ? "bg-success"
                                                            : problem.difficulty === "medium"
                                                            ? "bg-warning"
                                                            : "bg-danger"
                                                        }`}
                                                    >
                                                        {problem.difficulty}
                                                    </span>
                                                </div>
                                            )
                                        )
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 mt-4 mt-lg-0">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Recent Accepted
                                </h4>

                                {
                                    progress.recent_accepted.length === 0
                                    ?
                                    (
                                        <p className="text-muted">
                                            No accepted submissions yet.
                                        </p>
                                    )
                                    :
                                    (
                                        progress.recent_accepted.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="border-bottom py-3"
                                                >
                                                    <div className="fw-semibold">
                                                        <FaMedal className="text-success me-2" />

                                                        {item.problem}
                                                    </div>

                                                    <small className="text-muted">
                                                        {
                                                            new Date(
                                                                item.submitted_at
                                                            ).toLocaleString()
                                                        }
                                                    </small>
                                                </div>
                                            )
                                        )
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Progress;