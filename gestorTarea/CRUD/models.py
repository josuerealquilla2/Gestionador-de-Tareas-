from django.db import models
from django.contrib.auth.models import User

class task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.titulo
