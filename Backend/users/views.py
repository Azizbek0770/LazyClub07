from django.views import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
    lessons = Lesson.objects.all()
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def lesson_detail(request, lesson_id):
    try:
        lesson = Lesson.objects.get(pk=lesson_id)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_new_lesson(request):
    serializer = LessonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_existing_lesson(request, lesson_id):
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

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def upload_profile_photo(request):
    user = request.user
    if 'userphoto' in request.FILES:
        user.profile_photo = request.FILES['userphoto']
        user.save()
        return Response({"status": "photo uploaded"}, status=status.HTTP_200_OK)
    return Response({"error": "No photo provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_titles(request):
    return Response({'message': 'Fetch titles'}, status=status.HTTP_200_OK)
