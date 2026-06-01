from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import task
from .serializers import TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return task.objects.filter(user=self.request.user)


class TaskToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        t = task.objects.get(pk=pk, user=request.user)
        t.is_completed = not t.is_completed
        t.save()
        return Response(TaskSerializer(t).data)
