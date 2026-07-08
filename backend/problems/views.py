from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from .serializers import ProblemSerializer,TestCaseSerializer
from .models import Problem,TestCase

class ProblemViewSet(ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]

        return [IsAdminUser()]
    
class TestCaseViewSet(ModelViewSet):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer
    permission_classes = [IsAdminUser]