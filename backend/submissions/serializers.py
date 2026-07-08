from rest_framework import serializers
from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    problem_title = serializers.CharField(
        source="problem.title",
        read_only=True
    )

    class Meta:
        model = Submission
        fields = (
            "id",
            "user",
            "username",
            "problem",
            "problem_title",
            "language",
            "code",
            "status",
            "passed_test_cases",
            "total_test_cases",
            "execution_time",
            "submitted_at",
        )

        read_only_fields = (
            "user",
            "status",
            "passed_test_cases",
            "total_test_cases",
            "execution_time",
        )