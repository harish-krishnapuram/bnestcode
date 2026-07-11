const OutputPanel = ({ output }) => {
    if (!output) return null;

    // Run Code Response
    if ("stdout" in output || "stderr" in output) {
        return (
            <div className="card shadow-sm mt-3">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Run Code Output</h5>
                </div>

                <div className="card-body bg-light">
                    {
                        output.return_code === 0 ? (
                            <>
                                <h6 className="text-success">
                                    Execution Successful
                                </h6>

                                <pre
                                    className="bg-dark text-light p-3 rounded mt-3"
                                    style={{
                                        minHeight: "100px",
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {output.stdout || "No Output"}
                                </pre>
                            </>
                        ) : (
                            <>
                                <h6 className="text-danger">
                                    Runtime Error
                                </h6>

                                <pre
                                    className="bg-dark text-danger p-3 rounded mt-3"
                                    style={{
                                        minHeight: "100px",
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {output.stderr}
                                </pre>
                            </>
                        )
                    }
                </div>
            </div>
        );
    }

    // Submit Code Response
    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">

                {
                    output.type === "run" &&
                    <h5>Run Test Cases Result</h5>
                }

                {
                    output.type === "submit" &&
                    <h5>Submission Result</h5>
                }

                <h4>{output.status}</h4>

                <p>
                    Passed {output.passed} /
                    {output.total} test cases
                </p>

                {
                    output.failed_testcase &&
                    <>
                        <p>
                            <strong>Expected:</strong>{" "}
                            {JSON.stringify(
                                output.failed_testcase.expected
                            )}
                        </p>

                        <p>
                            <strong>Received:</strong>{" "}
                            {JSON.stringify(
                                output.failed_testcase.received
                            )}
                        </p>
                    </>
                }

            </div>
        </div>
    );
};

export default OutputPanel;