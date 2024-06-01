import logging
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import generics, status
from .serializers import CreateUserSerializer
from .tokens import account_activation_token

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(f"Request data: {request.data}")
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            user = response.data
            uid = urlsafe_base64_encode(force_bytes(user['id']))
            token = account_activation_token.make_token(user)
            activation_link = f"{settings.FRONTEND_URL}/activate?uid={uid}&token={token}"
            message = f"Iltimos havola orqali accountingizni faollashtiring!: {activation_link}"
            send_mail('Accountingizni faollashtiring', message, 'from@example.com', [user['email']])
        elif response.status_code == status.HTTP_400_BAD_REQUEST:
            logger.error(f"Errors: {response.data}")
        return response
