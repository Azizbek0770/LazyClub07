from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import CustomUserManager

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_('First Name'), max_length=100)
    last_name = models.CharField(_('Last Name'), max_length=100)
    email = models.EmailField(_('Email Address'), max_length=254, unique=True)
    username = models.CharField(_('Username'), max_length=100, unique=True, default='default_username')
    gender = models.CharField(_('Gender'), max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], default='Male')
    userphoto = models.ImageField(_('User Photo'), upload_to='userphotos/', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username', 'gender']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
