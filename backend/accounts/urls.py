from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from . import views

urlpatterns = [
    path('login/',TokenObtainPairView.as_view(),name='login'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('signup/',views.RegisterView.as_view(),name='signup'),
    path(
    "profile/",
    views.ProfileAPIView.as_view()
),
]