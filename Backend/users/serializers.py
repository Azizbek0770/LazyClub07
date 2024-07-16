from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from rest_framework import serializers
from .models import User, Test, Result, Lesson

class CreateUserSerializer(DjoserUserCreateSerializer):
    gender = serializers.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female')])
    re_password = serializers.CharField(write_only=True)
    userphoto = serializers.ImageField(required=False)

    class Meta(DjoserUserCreateSerializer.Meta):
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'gender', 'password', 're_password', 'userphoto']

    def validate(self, data):
        if data.get('password') != data.get('re_password'):
            raise serializers.ValidationError("The passwords do not match.")
        
        # Custom validation to check similarity between password and email
        email = data.get('email')
        password = data.get('password')
        if email and password and email.lower() in password.lower():
            raise serializers.ValidationError("The password is too similar to the Email Address.")
        
        return data

    def create(self, validated_data):
        validated_data.pop('re_password')
        user = User.objects.create_user(**validated_data)
        return user

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'gender', 'userphoto']
