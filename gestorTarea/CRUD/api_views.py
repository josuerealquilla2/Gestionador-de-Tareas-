from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import task
from .serializers import TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = task.objects.all()
    serializer_class = TaskSerializer


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = task.objects.all()
    serializer_class = TaskSerializer


class TaskToggleView(APIView):
    def patch(self, request, pk):
        t = task.objects.get(pk=pk)
        t.is_completed = not t.is_completed
        t.save()
        return Response(TaskSerializer(t).data)
