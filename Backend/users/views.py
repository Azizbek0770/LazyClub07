from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Lesson
from .serializers import LessonSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.models import User

class TestView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Test view response'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_lessons(request):
    """
    Get all lessons.
    """
    lessons = Lesson.objects.all()
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_lesson_details(request, lesson_id):
    """
    Get details of a specific lesson by ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Lesson.DoesNotExist:
        return JsonResponse({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_lesson(request):
    """
    Create a new lesson.
    """
    serializer = LessonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_lesson(request, lesson_id):
    """
    Update an existing lesson by ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
    except Lesson.DoesNotExist:
        return JsonResponse({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = LessonSerializer(lesson, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_lesson(request, lesson_id):
    """
    Delete a lesson by ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
    except Lesson.DoesNotExist:
        return JsonResponse({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

    lesson.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def custom_password_reset_confirm(request):
    """
    Custom password reset confirm view.
    """
    uidb64 = request.data.get('uidb64')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({'status': 'Password reset successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_titles(request):
    """
    Get titles.
    """
    return Response({'message': 'Get titles'}, status=status.HTTP_200_OK)
