from rest_framework.routers import DefaultRouter
from .views import SubmissionViewSet

router = DefaultRouter()

router.register(
    "submissions",
    SubmissionViewSet,
    basename="submissions"
)
from django.urls import path
from .views import RunCodeAPIView

urlpatterns = [
    path("run/", RunCodeAPIView.as_view()),
]
urlpatterns += router.urls