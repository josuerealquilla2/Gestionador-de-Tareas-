from django import forms
from .models import task


class TaskForm(forms.ModelForm):
    class Meta:
        model = task
        fields = ('titulo', 'descripcion')


class EditTaskForm(forms.ModelForm):
    class Meta:
        model = task
        fields = ('titulo', 'descripcion', 'is_completed')