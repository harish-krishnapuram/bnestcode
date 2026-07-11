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
        old_submission_ids = Submission.objects.filter(
        user=self.request.user,
        problem=problem,
        ).order_by(
            "-submitted_at"
        ).values_list(
            "id",
            flat=True
        )[5:]

        Submission.objects.filter(
            id__in=list(old_submission_ids)
        ).delete()
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
            (solved_count / total_problems) * 100,
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
    
import os
import uuid
import subprocess
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class RunCustomCodeAPIView(APIView):
    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response(
                {"error": "Code is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Generate unique filename
        filename = f"{uuid.uuid4()}.py"
        try:
            with open(filename, "w", encoding="utf-8") as f:
                f.write(code)

            result = subprocess.run(
                ["python", filename],
                capture_output=True,
                text=True,
                timeout=2
            )

            return Response({
                "stdout": result.stdout,
                "stderr": result.stderr,
                "return_code": result.returncode
            })

        except subprocess.TimeoutExpired:
            return Response({
                "stdout": "",
                "stderr": "Time Limit Exceeded",
                "return_code": -1
            }, status=status.HTTP_408_REQUEST_TIMEOUT)

        except Exception as e:
            return Response({
                "stdout": "",
                "stderr": str(e),
                "return_code": -1
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(filename):
                os.remove(filename)