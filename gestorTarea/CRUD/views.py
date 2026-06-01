from django.shortcuts import render, redirect, get_object_or_404
from .models import task
from .forms import TaskForm, EditTaskForm


def task_list_and_created(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('crud:crud_list')
    else:
        form = TaskForm()
    tasks = task.objects.all()
    completed_task = task.objects.filter(is_completed=True)
    incomplete_tasks = task.objects.filter(is_completed=False)

    return render(request, 'task_list.html', {
        'form': form,
        'tasks': tasks,
        'completed_task': completed_task,
        'incomplete_task': incomplete_tasks,
    })


def update_task(request, task_id):
    if request.method == 'POST':
        tasks = get_object_or_404(task, id=task_id)
        tasks.is_completed = not tasks.is_completed
        tasks.save()
        return redirect('crud:crud_list')


def edit_task(request, task_id):
    tasks = get_object_or_404(task, id=task_id)
    if request.method == 'POST':
        form = EditTaskForm(request.POST, instance=tasks)
        if form.is_valid():
            form.save()
            return redirect('crud:crud_list')
    else:
        form = EditTaskForm(instance=tasks)
    return render(request, 'edit_task.html', {'form': form, 'task': tasks})


def delete_task(request, task_id):
    tasks = get_object_or_404(task, id=task_id)
    if request.method == 'POST':
        tasks.delete()
        return redirect('crud:crud_list')
    return render(request, 'confirm_delete.html', {'task': tasks})

