from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count

from submissions.models import Submission

#Create your views here
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        submissions = Submission.objects.filter(
            user=user
        )

        total_submissions = submissions.count()

        accepted_submissions = submissions.filter(
            status="accepted"
        ).count()

        solved_count = submissions.filter(
            status="accepted"
        ).values(
            "problem"
        ).distinct().count()

        acceptance_rate = (
            round(
                accepted_submissions / total_submissions * 100,
                2
            )
            if total_submissions > 0
            else 0
        )

        language_stats = submissions.values(
            "language"
        ).annotate(
            count=Count("id")
        ).order_by(
            "-count"
        )

        favorite_language = (
            language_stats[0]["language"]
            if language_stats
            else "N/A"
        )

        recent_submissions_queryset = submissions.select_related(
            "problem"
        )[:10]

        recent_submissions = []

        for submission in recent_submissions_queryset:
            recent_submissions.append({
                "problem": submission.problem.title,
                "status": submission.status,
                "language": submission.language,
                "submitted_at": submission.submitted_at
            })

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,

            "solved_count": solved_count,
            "total_submissions": total_submissions,
            "accepted_submissions": accepted_submissions,
            "acceptance_rate": acceptance_rate,

            "favorite_language": favorite_language,

            "recent_submissions": recent_submissions
        })