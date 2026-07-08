import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const Problems = () => {
    const navigate = useNavigate();
    const {user} = useAuth()

    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("all");

    useEffect(() => {
        fetchProblems();
    }, []);

    useEffect(() => {
        let data = [...problems];

        if (difficulty !== "all") {
            data = data.filter(
                problem =>
                    problem.difficulty.toLowerCase() === difficulty
            );
        }

        if (search) {
            data = data.filter(problem =>
                problem.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        setFilteredProblems(data);
    }, [search, difficulty, problems]);

    const fetchProblems = async () => {
        try {
            // const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/problems/",
                {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                }
            );

            setProblems(response.data);
            setFilteredProblems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "success";
            case "medium":
                return "warning";
            case "hard":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">
                        Problems
                    </h2>

                    <span className="badge bg-primary fs-6">
                        {filteredProblems.length} Problems
                    </span>
                </div>

                <div className="card border-0 shadow rounded-4 mb-4">
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-8 mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaSearch />
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search problems..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <select
                                    className="form-select"
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
                                >
                                    <option value="all">All Difficulties</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow rounded-4">
                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">
                                <tr>
                                    <th>Status</th>
                                    <th>Title</th>
                                    <th>Difficulty</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredProblems.map((problem) => (
                                    <tr
                                        key={problem.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            navigate(
                                                `/problems/${problem.slug}`
                                            )
                                        }
                                    >
                                        <td width="100">
                                            {problem.solved ? (
                                                <FaCheckCircle
                                                    className="text-success"
                                                    size={20}
                                                />
                                            ) : (
                                                <FaRegCircle
                                                    className="text-secondary"
                                                    size={20}
                                                />
                                            )}
                                        </td>

                                        <td className="fw-semibold">
                                            {problem.title}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge bg-${getDifficultyBadge(
                                                    problem.difficulty
                                                )}`}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>

            </div>
        </>
    );
};

export default Problems;