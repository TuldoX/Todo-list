class Task {
    constructor(text, done = false) {
        this.text = text;
        this.done = done;
    }
}

function main() {
    let button = document.getElementById("add");
    let text = document.getElementById("text");
    let tasks = document.getElementById("tasks");

    // Load stored tasks when the page loads
    loadStoredTasks();

    button.addEventListener("click", click);

    function click() {
        let input = text.value;
        if (input === "") return;

        // Create a new task instance
        let task = new Task(input);

        // Display the task
        displayTask(task);

        // Save the task to local storage
        saveTaskToLocalStorage(task);

        text.value = "";
    }

    function displayTask(task) {
        let di = document.createElement("div");
        di.className = "task";

        let par = document.createElement("input");
        par.setAttribute("type", "checkbox");
        par.checked = task.done; // Set the checkbox based on the task's done status
        di.appendChild(par);

        let dotext = document.createElement("p");
        let node = document.createTextNode(task.text);
        dotext.appendChild(node);
        di.appendChild(dotext);

        let helpdiv = document.createElement("div");

        let delbut = document.createElement("button");
        delbut.setAttribute("type", "button");
        delbut.className = "delete";
        delbut.textContent = "x";

        helpdiv.appendChild(delbut);
        di.appendChild(helpdiv);

        tasks.appendChild(di);

        // Set the text decoration based on the done status
        if (task.done) {
            dotext.style.textDecoration = "line-through";
        }

        par.addEventListener("change", function () {
            task.done = par.checked;
            if (par.checked) {
                dotext.style.textDecoration = "line-through";
            } else {
                dotext.style.textDecoration = "none";
            }
            updateTaskInLocalStorage();
        });

        delbut.addEventListener("click", function () {
            di.remove();
            deleteTaskFromLocalStorage(task.text);
        });
    }

    function saveTaskToLocalStorage(newTask) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function loadStoredTasks() {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(task => {
            displayTask(task);
        });
    }

    function updateTaskInLocalStorage() {
        let storedTasks = [];
        tasks.querySelectorAll(".task").forEach(di => {
            let text = di.querySelector("p").textContent;
            let done = di.querySelector("input[type='checkbox']").checked;
            storedTasks.push(new Task(text, done)); // Save the current status
        });
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function deleteTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks = storedTasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

window.onload = main;
