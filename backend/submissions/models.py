from django.conf import settings
from django.db import models


class Submission(models.Model):
    STATUS_CHOICES = (
        ("accepted", "Accepted"),
        ("wrong_answer", "Wrong Answer"),
        ("runtime_error", "Runtime Error"),
        ("time_limit_exceeded", "Time Limit Exceeded"),
        ("pending", "Pending"),
    )

    LANGUAGE_CHOICES = (
        ("python", "Python"),
        ("javascript", "JavaScript"),
        ("java", "Java"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="submissions"
    )

    problem = models.ForeignKey(
        "problems.Problem",
        on_delete=models.CASCADE,
        related_name="submissions"
    )

    language = models.CharField(
        max_length=20,
        choices=LANGUAGE_CHOICES
    )

    code = models.TextField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="pending"
    )

    passed_test_cases = models.IntegerField(default=0)

    total_test_cases = models.IntegerField(default=0)

    execution_time = models.FloatField(default=0)

    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    @classmethod
    def cleanup_old_submissions(cls, user, problem):
        old = cls.objects.filter(
            user=user,
            problem=problem
        ).order_by("-submitted_at")[5:]

        old.delete()
    def __str__(self):
        return f"{self.user.username} - {self.problem.title}"