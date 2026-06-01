from rest_framework import serializers
from .models import task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ['id', 'titulo', 'descripcion', 'is_completed', 'created']
