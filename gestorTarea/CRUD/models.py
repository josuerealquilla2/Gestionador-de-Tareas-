from django.db import models
class task(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    created=models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-created']
    def __str__(self):
        return self.titulo
