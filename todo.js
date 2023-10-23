const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
        taskItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    <span>${task.text}</span>
                    <button data-index="${index}">Edit</button>
                    <button data-index="${index}">Delete</button>
                `;
        taskList.appendChild(taskItem);
    });

    taskList.querySelectorAll("input[type='checkbox']").forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
        });
    });

    taskList.querySelectorAll("button").forEach((button, index) => {
        button.addEventListener("click", (event) => {
            const action = event.target.textContent;
            const taskIndex = parseInt(event.target.getAttribute("data-index"));

            if (action === "Edit") {
                const newText = prompt("Edit the task:", tasks[taskIndex].text);
                if (newText !== null) {
                    tasks[taskIndex].text = newText;
                    saveTasks();
                    renderTasks();
                }
            } else if (action === "Delete") {
                tasks.splice(taskIndex, 1);
                saveTasks();
                renderTasks();
            }
        });
    });
}

renderTasks();

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({
            text: taskText,
            completed: false
        });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
});