from django.urls import path
from .api_views import TaskListCreateView, TaskDetailView, TaskToggleView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view()),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
    path('tasks/<int:pk>/toggle/', TaskToggleView.as_view()),
]
