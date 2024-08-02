from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

from users.views import (
    TestView,
    password_reset_confirm,
    list_lessons,
    upload_profile_photo,
    lesson_detail,
)

def index(request):
    return HttpResponse("Welcome to My Django Application!")

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('api/v1/auth/', include('djoser.social.urls')),
    path('api/lessons/', list_lessons, name='get_all_lessons'),
    path('api/lessons/<int:lesson_id>/', lesson_detail, name='get_lesson_details'),
    path('test/', TestView.as_view(), name='test-view'),
    path('test/qtype/', TestView.as_view(), name='test-qtype-view'),
    path('test/qtype/<str:qtype>/', TestView.as_view(), name='test-qtype-qtype'),
    path('api/v1/auth/users/password_reset_confirm/', password_reset_confirm, name='custom_password_reset_confirm'),
    path('api/v1/auth/users/upload_photo/', upload_profile_photo, name='upload_profile_photo'),]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
