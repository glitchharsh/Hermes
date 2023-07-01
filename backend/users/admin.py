from django.contrib import admin

from .models import User, Verification

class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number")
    exclude = ("password", "is_superuser", "is_active", "is_staff", "groups", "user_permissions")

admin.site.register(User, UserAdmin)
admin.site.register(Verification)
