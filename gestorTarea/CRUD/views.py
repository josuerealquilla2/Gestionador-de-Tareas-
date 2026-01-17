

from django.shortcuts import render, redirect, get_object_or_404
from .models import task
from .forms import TaskForm
def task_list_and_created(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('crud:crud_list')
    else:
        form = TaskForm()
    tasks = task.objects.all()
    completed_task=task.objects.filter(is_completed=True)
    incomplete_tasks=task.objects.filter(is_completed=False)

    return render(request, 'task_list.html', {
        'form': form,
        'tasks': tasks,
        'completed_task': completed_task,
        'incomplete_task': incomplete_tasks
 })
def update_task(request,task_id):
    if request.method == 'POST':
        tasks =task.objects.get(id = task_id)
        tasks.is_completed= not tasks.is_completed
        tasks.save()
        return redirect('crud:crud_list')

    #editar tareas completar 1:24
def edit_task(request,task_id):
    tasks=get_object_or_404(task, id = task_id)

