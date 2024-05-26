import logging

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(f"Request data: {request.data}")
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            logger.error(f"Errors: {response.data}")
        return response
