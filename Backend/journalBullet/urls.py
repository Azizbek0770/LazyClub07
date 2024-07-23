from django.contrib import admin
from django.urls import path, include
from users.views import (
    TestView,
    password_reset_confirm,
    list_lessons,
    upload_user_photo,
    lesson_detail,
    password_reset_confirm,
)
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def index(request):
    return HttpResponse("Welcome to My Django Application!")

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('test/', TestView.as_view(), name='test-view'),
    path('api/lessons/', list_lessons, name='get_all_lessons'),
    path('api/lessons/<int:lesson_id>/',lesson_detail, name='get_lesson_details'),
    path('test/<int:pk>/', TestView.as_view(), name='test-pk-view'),
    path('test/<str:q_type>/', TestView.as_view(), name='test-qtype-view'),
    path('test/<str:q_type>/<str:q_subject>/', TestView.as_view(), name='test-qtype-subject-view'),
    path('api/password_reset_confirm/', password_reset_confirm, name='custom_password_reset_confirm'),
    path('api/v1/auth/users/upload_photo/', upload_user_photo, name='upload_profile_photo'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
