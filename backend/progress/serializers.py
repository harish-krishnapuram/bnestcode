from rest_framework import serializers


class ProgressSerializer(serializers.Serializer):
    solved_count = serializers.IntegerField()

    easy_solved = serializers.IntegerField()
    medium_solved = serializers.IntegerField()
    hard_solved = serializers.IntegerField()

    easy_total = serializers.IntegerField()
    medium_total = serializers.IntegerField()
    hard_total = serializers.IntegerField()

    solved_problems = serializers.ListField()

    recent_accepted = serializers.ListField()