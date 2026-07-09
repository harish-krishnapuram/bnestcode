import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import LanguageSelector from "../components/LanguageSelector";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import api from "../services/api";
import { toast } from "react-toastify";

const ProblemDetails = () => {
    const { slug } = useParams();
    const outputRef = useRef(null)

    const [problem, setProblem] = useState(null);

    const [language, setLanguage] = useState("python");

    const [code, setCode] = useState("");

    const [output, setOutput] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProblem();
    }, [slug]);

    const fetchProblem = async () => {
        try {
            const token = localStorage.getItem("access");

            const response = await api.get(
                `/problems/${slug}/`,
            );

            setProblem(response.data);
            if (response.data.previous_python_submission) {
                setCode(response.data.previous_python_submission);
            }
            else {
                setCode(response.data.starter_code_python);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);

        if (lang === "python") {
            setCode(problem.starter_code_python);
        }

        if (lang === "javascript") {
            setCode(problem.starter_code_javascript);
        }

        if (lang === "java") {
            setCode(problem.starter_code_java);
        }
    };

    const submitSolution = async () => {
        try {
            const response = await api.post(
                "/submissions/",
                {
                    problem: problem.id,
                    language,
                    code
                }
            );
    
            console.log(response.data);
    
            // alert(response.data.status);
            setOutput({
                type: "submit",
                ...response.data
            });
            if (response.data.status === "accepted") {
                toast.success("🎉 All test cases passed!");
              } else {
                toast.error("❌ Some test cases failed.");
              }
    
        } catch (error) {
            console.log(error);
            toast.error("Submission failed.");
        }
        finally{
            setTimeout(() => {
                outputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    };

    const runCode = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("access");

            const response = await api.post(
                "/run/",
                {
                    code,
                    language,
                    problem_id: problem.id,
                },
            );

            setOutput({
                type: "run",
                ...response.data
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            setTimeout(() => {
                outputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    };

    if (!problem) {
        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid py-3">

                <div className="row">

                    <div className="col-lg-5">

                        <div className="card shadow border-0 rounded-4 h-100">

                            <div className="card-body">

                                <h2 className="fw-bold">
                                    {problem.title}
                                </h2>

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

                                <hr />

                                <h5>Description</h5>

                                <p>
                                    {problem.description}
                                </p>

                                <hr />

                                <h5>Sample Test Cases</h5>

                                {
                                    problem.test_cases?.map(
                                        (testcase, index) => (
                                            <div
                                                key={index}
                                                className="bg-light rounded p-3 mb-3"
                                            >
                                                <strong>
                                                    Input:
                                                </strong>

                                                <pre>
                                                    {
                                                        JSON.stringify(
                                                            testcase.input_data,
                                                            null,
                                                            2
                                                        )
                                                    }
                                                </pre>

                                                <strong>
                                                    Output:
                                                </strong>

                                                <pre>
                                                    {
                                                        JSON.stringify(
                                                            testcase.expected_output,
                                                            null,
                                                            2
                                                        )
                                                    }
                                                </pre>
                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">

                                    <LanguageSelector
                                        language={language}
                                        setLanguage={handleLanguageChange}
                                    />
                                    <div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={runCode}
                                        disabled={loading}
                                    >
                                        {
                                            loading
                                                ? "Running..."
                                                : "Run Test Cases"
                                        }
                                    </button>
                                    <button
                                        className="btn btn-success ms-2"
                                        onClick={submitSolution}
                                    >
                                        Submit Solution
                                    </button>
                                    </div>

                                </div>

                                <CodeEditor
                                    language={language}
                                    code={code}
                                    setCode={setCode}
                                />

                            </div>

                        </div>
                        <div ref={outputRef}>
                        <OutputPanel output={output} />
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default ProblemDetails;