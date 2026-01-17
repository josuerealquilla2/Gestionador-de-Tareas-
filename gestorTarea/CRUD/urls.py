from django.urls import path
from . import views
from .views import update_task

'''nombres de urls '''
app_name = 'crud'
urlpatterns = [
    path('',views.task_list_and_created,name='crud_list'),
    path('update_task/<int:task_id>',views.update_task,name='update_task'),
]