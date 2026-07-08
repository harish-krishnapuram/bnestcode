from rest_framework import serializers
from .models import Problem,TestCase
from django.utils.text import slugify

class ProblemSerializer(serializers.ModelSerializer):
    test_cases = serializers.SerializerMethodField()
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

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = "__all__"