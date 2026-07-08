from rest_framework import serializers
from .models import User


from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password"
        )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
    
from rest_framework import serializers


class ProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()

    solved_count = serializers.IntegerField()
    total_submissions = serializers.IntegerField()
    accepted_submissions = serializers.IntegerField()
    acceptance_rate = serializers.FloatField()

    favorite_language = serializers.CharField()

    recent_submissions = serializers.ListField()