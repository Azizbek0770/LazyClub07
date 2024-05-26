from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from rest_framework import serializers
from .models import User

class CreateUserSerializer(DjoserUserCreateSerializer):
    gender = serializers.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female')])

    class Meta(DjoserUserCreateSerializer.Meta):
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'gender', 'password', 'repassword']

    def validate(self, data):
        """
        Check that the passwords match.
        """
        if data.get('password') != data.get('repassword'):
            raise serializers.ValidationError("The passwords do not match.")
        return data

    def create(self, validated_data):
        """
        Create and return a new user instance, given the validated data.
        """
        validated_data.pop('repassword')  # Remove repassword from the validated data
        user = User.objects.create_user(**validated_data)
        return user
