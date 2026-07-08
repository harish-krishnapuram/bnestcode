from rest_framework import serializers


class ProgressSerializer(serializers.Serializer):
    problems_solved = serializers.IntegerField()
    problems_attempted = serializers.IntegerField()
    acceptance_rate = serializers.FloatField()
    easy_solved = serializers.IntegerField()
    medium_solved = serializers.IntegerField()
    hard_solved = serializers.IntegerField()