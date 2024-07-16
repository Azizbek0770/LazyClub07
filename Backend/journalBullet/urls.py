from django.contrib import admin
from django.urls import path, include
from users.views import TestView, custom_password_reset_confirm, get_all_lessons, get_lesson_details, upload_profile_photo

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to My Django Application!")

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('test/', TestView.as_view(), name='test-view'),
    path('api/lessons/', get_all_lessons, name='get_all_lessons'),
    path('api/lessons/<int:lesson_id>/', get_lesson_details, name='get_lesson_details'),
    path('test/<int:pk>/', TestView.as_view(), name='test-pk-view'),
    path('test/<str:q_type>/', TestView.as_view(), name='test-qtype-view'),
    path('test/<str:q_type>/<str:q_subject>/', TestView.as_view(), name='test-qtype-subject-view'),
    path('api/password_reset_confirm/', custom_password_reset_confirm, name='custom_password_reset_confirm'),
    path('api/v1/auth/users/upload_photo/', upload_profile_photo, name='upload_profile_photo'), # Ensure it's POST method
]
