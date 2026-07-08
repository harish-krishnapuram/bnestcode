from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from submissions.models import Submission
from problems.models import Problem


class ProgressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        solved_problem_ids = Submission.objects.filter(
            user=user,
            status="accepted"
        ).values_list(
            "problem_id",
            flat=True
        ).distinct()

        solved_problems_queryset = Problem.objects.filter(
            id__in=solved_problem_ids
        )

        solved_count = solved_problems_queryset.count()

        easy_solved = solved_problems_queryset.filter(
            difficulty="easy"
        ).count()

        medium_solved = solved_problems_queryset.filter(
            difficulty="medium"
        ).count()

        hard_solved = solved_problems_queryset.filter(
            difficulty="hard"
        ).count()

        easy_total = Problem.objects.filter(
            difficulty="easy"
        ).count()

        medium_total = Problem.objects.filter(
            difficulty="medium"
        ).count()

        hard_total = Problem.objects.filter(
            difficulty="hard"
        ).count()

        solved_problems = []

        for problem in solved_problems_queryset:
            solved_problems.append({
                "id": problem.id,
                "title": problem.title,
                "difficulty": problem.difficulty,
                "slug": problem.slug
            })

        recent_accepted_queryset = Submission.objects.filter(
            user=user,
            status="accepted"
        ).select_related(
            "problem"
        )[:5]

        recent_accepted = []

        for submission in recent_accepted_queryset:
            recent_accepted.append({
                "problem": submission.problem.title,
                "submitted_at": submission.submitted_at
            })

        return Response({
            "solved_count": solved_count,

            "easy_solved": easy_solved,
            "medium_solved": medium_solved,
            "hard_solved": hard_solved,

            "easy_total": easy_total,
            "medium_total": medium_total,
            "hard_total": hard_total,

            "solved_problems": solved_problems,

            "recent_accepted": recent_accepted
        })