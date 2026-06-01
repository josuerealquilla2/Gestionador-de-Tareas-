from django.urls import path
from .api_views import TaskListCreateView, TaskDetailView, TaskToggleView
from .auth_views import RegisterView, LoginView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view()),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
    path('tasks/<int:pk>/toggle/', TaskToggleView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
]
