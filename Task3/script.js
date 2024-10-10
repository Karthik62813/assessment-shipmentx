document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        
        // Task text
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;
        
        // Checkbox for completing task
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                span.classList.add('complete');
            } else {
                span.classList.remove('complete');
            }
        });
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        taskInput.value = ''; // Clear input field
    }
}
