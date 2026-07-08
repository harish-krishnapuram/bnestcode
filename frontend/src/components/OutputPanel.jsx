const OutputPanel = ({ output }) => {
    if (!output) return null;

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
                        Expected:
                        {JSON.stringify(
                            output.failed_testcase.expected
                        )}
                    </p>

                    <p>
                        Received:
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