from django.urls import path
from . import views

urlpatterns = [
    path(
    "progress/",
    views.ProgressAPIView.as_view(),
    name="progress"
),
]