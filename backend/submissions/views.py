from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated

from .models import Submission
from .serializers import SubmissionSerializer


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