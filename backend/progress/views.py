from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from submissions.models import Submission


class ProgressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        solved = Submission.objects.filter(
            user=request.user,
            status="accepted"
        ).values(
            "problem"
        ).distinct()

        attempted = Submission.objects.filter(
            user=request.user
        ).values(
            "problem"
        ).distinct()

        solved_count = solved.count()
        attempted_count = attempted.count()

        acceptance_rate = 0

        if attempted_count:
            acceptance_rate = (
                solved_count / attempted_count
            ) * 100

        return Response({
            "problems_solved": solved_count,
            "problems_attempted": attempted_count,
            "acceptance_rate": round(
                acceptance_rate,
                2
            )
        })