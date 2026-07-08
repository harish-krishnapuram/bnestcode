from problems.models import Problem, TestCase


def run_test_cases(problem_id, language, code):
    try:
        problem = Problem.objects.get(id=problem_id)

        test_cases = TestCase.objects.filter(
            problem=problem,
            is_hidden=False
        )

        namespace = {}

        exec(code, namespace)

        if "solve" not in namespace:
            return {
                "status": "error",
                "error": "Function solve() not found."
            }

        solve_function = namespace["solve"]

        passed = 0
        total = test_cases.count()

        for testcase in test_cases:
            input_data = testcase.input_data
            expected_output = testcase.expected_output

            if isinstance(input_data, list):
                result = solve_function(*input_data)

            elif isinstance(input_data, dict):
                result = solve_function(**input_data)

            else:
                result = solve_function(input_data)

            if result == expected_output:
                passed += 1
            else:
                return {
                    "status": "wrong_answer",
                    "passed": passed,
                    "total": total,
                    "failed_testcase": {
                        "input": input_data,
                        "expected": expected_output,
                        "received": result
                    }
                }

        return {
            "status": "accepted",
            "passed": passed,
            "total": total
        }

    except Exception as e:
        return {
            "status": "runtime_error",
            "error": str(e)
        }