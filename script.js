const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

const tasks = [];

function addTask(name, priority)
{
  const task = 
  {
    name: name,
    priority: priority,
    completed: false
  };
  tasks.push(task);
  displayTasks();
}

function toggleComplete(index) 
{
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) 
{
  tasks.splice(index, 1);
  displayTasks();
}

function displayTasks() 
{
  taskList.innerHTML = "";

  if (tasks.length === 0) 
    {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No tasks yet. Add one or perish";
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach(function (task, index) 
  {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.classList.add("priority-" + task.priority);
    if (task.completed) 
    {
      taskElement.classList.add("completed");
    }

    const nameElement = document.createElement("span");
    nameElement.classList.add("task-name");
    nameElement.textContent = task.name;

    const priorityElement = document.createElement("span");
    priorityElement.classList.add("task-priority");
    priorityElement.textContent = task.priority.toUpperCase();

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", function () 
    {
      toggleComplete(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function ()
     {
      deleteTask(index);
    });

    taskElement.appendChild(nameElement);
    taskElement.appendChild(priorityElement);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
  });
}

form.addEventListener("submit", function (event) 
{
  event.preventDefault();

  const taskName = taskInput.value.trim();
  const taskPriority = priorityInput.value;

  if (taskName === "") 
    {
    errorMessage.textContent = "Please enter a task name or perish.";
    return;
  }

  errorMessage.textContent = "";

  addTask(taskName, taskPriority);

  taskInput.value = "";
  priorityInput.value = "medium";
  taskInput.focus();
});

displayTasks();