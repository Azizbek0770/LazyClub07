# users/manager.py
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email address"))

    def create_user(self, first_name, last_name, email, username, gender, password=None, **extra_fields):
        if not first_name:
            raise ValueError(_("Users must submit a first name"))
        if not last_name:
            raise ValueError(_("Users must submit a last name"))
        if not username:
            raise ValueError(_("Users must submit a username"))
        if not gender:
            raise ValueError(_("Users must submit a gender"))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Base User: an email address is required"))

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            gender=gender,
            **extra_fields
        )

        user.set_password(password)
        user.is_active = extra_fields.get('is_active', False)
        user.is_staff = extra_fields.get('is_staff', False)
        user.is_superuser = extra_fields.get('is_superuser', False)

        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, username, gender, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True'))

        if not password:
            raise ValueError(_("Superuser must have a password"))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Admin User: an email address is required"))

        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            gender=gender,
            password=password,
            **extra_fields
        )
        user.save(using=self._db)
        return user
