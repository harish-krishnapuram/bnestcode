from rest_framework import serializers
from django.utils.text import slugify

from .models import Problem, TestCase
from submissions.models import Submission


class ProblemSerializer(serializers.ModelSerializer):
    test_cases = serializers.SerializerMethodField()
    solved = serializers.SerializerMethodField()
    previous_python_submission = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = "__all__"

    def create(self, validated_data):
        validated_data["slug"] = slugify(
            validated_data["title"]
        )

        return super().create(validated_data)

    def get_test_cases(self, obj):
        visible_testcases = obj.test_cases.filter(
            is_hidden=False
        )

        return TestCaseSerializer(
            visible_testcases,
            many=True
        ).data

    def get_solved(self, obj):
        request = self.context.get("request")

        if not request:
            return False

        if not request.user.is_authenticated:
            return False

        return Submission.objects.filter(
            user=request.user,
            problem=obj,
            status="accepted"
        ).exists()
    
    def get_previous_python_submission(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return None

        submission = Submission.objects.filter(
            user=request.user,
            problem=obj,
            language="python"
        ).order_by(
            "-submitted_at"
        ).last()

        return submission.code if submission else None
    


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = "__all__"