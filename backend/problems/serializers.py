from rest_framework import serializers
from .models import Problem,TestCase
from django.utils.text import slugify

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"
    def create(self, validated_data):
        validated_data["slug"] = slugify(
            validated_data["title"]
        )

        return super().create(validated_data)

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = "__all__"