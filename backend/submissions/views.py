from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated

from .models import Submission
from .serializers import SubmissionSerializer,DashboardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import run_test_cases
from rest_framework.serializers import Serializer
from problems.models import Problem


class SubmissionViewSet(
    CreateModelMixin,
    ReadOnlyModelViewSet
):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        problem = serializer.validated_data["problem"]
        language = serializer.validated_data["language"]
        code = serializer.validated_data["code"]

        result = run_test_cases(
            problem_id=problem.id,
            language=language,
            code=code
        )

        serializer.save(
            user=self.request.user,
            status=result["status"],
            passed_test_cases=result.get("passed", 0),
            total_test_cases=result.get("total", 0),
        )
class RunCodeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        problem_id = request.data.get("problem_id")
        language = request.data.get("language")
        code = request.data.get("code")

        result = run_test_cases(
            problem_id=problem_id,
            language=language,
            code=code
        )

        return Response(result)

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = DashboardSerializer
    def get(self, request):
        user = request.user

        submissions = Submission.objects.filter(
            user=user
        )

        total_submissions = submissions.count()

        solved_count = submissions.filter(
            status="accepted"
        ).values(
            "problem"
        ).distinct().count()

        accepted_submissions = submissions.filter(
            status="accepted"
        ).count()

        acceptance_rate = (
            round(
                (accepted_submissions / total_submissions) * 100,
                2
            )
            if total_submissions > 0
            else 0
        )

        recent_submissions = submissions.select_related(
            "problem"
        )[:5]

        recent_activity = []

        for submission in recent_submissions:
            recent_activity.append({
                "problem": submission.problem.title,
                "status": submission.status,
                "submitted_at": submission.submitted_at,
            })

        bronze_goal = 20
        total_problems = Problem.objects.count()
        remaining_to_goal = max(
            total_problems - solved_count,
            0
        )

        goal_progress = min(
            (solved_count / bronze_goal) * 100,
            100
        )
        data = {
            "solved_count": solved_count,
            "total_submissions": total_submissions,
            "acceptance_rate": acceptance_rate,
            "day_streak": 0,
            "goal_progress": goal_progress,
            "remaining_to_goal": remaining_to_goal,
            "recent_activity": recent_activity,
        }

        return Response(data)