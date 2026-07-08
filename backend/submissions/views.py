from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated

from .models import Submission
from .serializers import SubmissionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import run_test_cases

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
        serializer.save(
            user=self.request.user
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