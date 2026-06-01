from django.contrib import admin
from .models import task


@admin.register(task)
class taskAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'is_completed', 'created')
    list_filter = ('is_completed',)
    search_fields = ('titulo',)