const OutputPanel = ({ output }) => {
    if (!output) return null;

    return (
        <div className="card shadow border-0 rounded-4 mt-3">
            <div className="card-body">
                <h5 className="fw-bold mb-3">
                    Output
                </h5>

                {
                    output.status === "accepted" &&
                    (
                        <div className="alert alert-success">
                            ✅ Accepted
                            <br />
                            Passed {output.passed}/{output.total} test cases
                        </div>
                    )
                }

                {
                    output.status === "wrong_answer" &&
                    (
                        <div className="alert alert-danger">
                            ❌ Wrong Answer
                            <br />
                            Passed {output.passed}/{output.total} test cases
                        </div>
                    )
                }

                {
                    output.status === "runtime_error" &&
                    (
                        <div className="alert alert-warning">
                            ⚠ Runtime Error
                            <pre className="mt-2">
                                {output.error}
                            </pre>
                        </div>
                    )
                }

                {
                    output.stdout &&
                    (
                        <>
                            <h6>Console Output</h6>

                            <pre className="bg-dark text-light p-3 rounded">
                                {output.stdout}
                            </pre>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default OutputPanel;