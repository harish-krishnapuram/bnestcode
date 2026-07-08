from django.db import models

# Create your models here.
from django.db import models


class Problem(models.Model):
    DIFFICULTY_CHOICES = (
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    )

    title = models.CharField(max_length=255)

    slug = models.SlugField(
        unique=True
    )

    description = models.TextField()

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default="easy"
    )

    starter_code_python = models.TextField(
        blank=True,
        null=True
    )

    starter_code_javascript = models.TextField(
        blank=True,
        null=True
    )

    starter_code_java = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title
    
class TestCase(models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="test_cases"
    )

    input_data = models.JSONField()

    expected_output = models.JSONField()

    is_hidden = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.problem.title} Test Case"