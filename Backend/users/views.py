from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from .models import Lesson, User
from .serializers import LessonSerializer, UserSerializer

class TestView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Test view response'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_lessons(request):
    """
    Retrieve a list of all lessons.
    """
    lessons = Lesson.objects.all()
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def lesson_detail(request, lesson_id):
    """
    Retrieve details of a specific lesson by its ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_new_lesson(request):
    """
    Create a new lesson.
    """
    serializer = LessonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_existing_lesson(request, lesson_id):
    """
    Update an existing lesson by its ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
        serializer = LessonSerializer(lesson, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_lesson_by_id(request, lesson_id):
    """
    Delete a specific lesson by its ID.
    """
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def password_reset_confirm(request):
    uidb64 = request.data.get('uidb64')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)

    if default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({'status': 'Password reset successful'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_user_photo(request):
    """
    Upload a profile photo for the authenticated user.
    """
    if 'profile_photo' in request.FILES:
        profile_photo = request.FILES['profile_photo']
        file_name = default_storage.save(f'profile_photos/{profile_photo.name}', profile_photo)
        file_url = default_storage.url(file_name)
        user = request.user
        user.profile_photo = file_url
        user.save()
        return Response({'profile_photo': file_url}, status=status.HTTP_200_OK)
    return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_titles(request):
    """
    Fetch a list of titles or relevant data.
    """
    return Response({'message': 'Fetch titles'}, status=status.HTTP_200_OK)
