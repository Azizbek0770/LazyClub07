# users/forms.py
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'gender', 'userphoto']
        error_class = 'error'

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'gender', 'userphoto']
        error_class = 'error'
