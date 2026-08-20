let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


const taskInput =
    document.getElementById("taskInput");


const priority =
    document.getElementById("priority");


/* SAVE TASKS */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* ADD TASK */

function addTask() {

    const text =
        taskInput.value.trim();


    if (!text) {

        alert("Please enter a task.");

        return;
    }


    tasks.push({

        id: Date.now(),

        text: text,

        priority: priority.value,

        completed: false

    });


    taskInput.value = "";


    saveTasks();

    showTasks();
}


/* COMPLETE TASK */

function toggleTask(id) {

    tasks = tasks.map(task =>

        task.id === id

            ? {
                ...task,
                completed: !task.completed
            }

            : task
    );


    saveTasks();

    showTasks();
}


/* DELETE TASK */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    showTasks();
}


/* SHOW TASKS */

function showTasks() {

    const list =
        document.getElementById(
            "taskList"
        );


    const empty =
        document.getElementById(
            "empty"
        );


    const search =
        document.getElementById(
            "search"
        ).value.toLowerCase();


    const filter =
        document.getElementById(
            "filter"
        ).value;


    let filtered =
        tasks.filter(task =>
            task.text
                .toLowerCase()
                .includes(search)
        );


    if (filter === "Pending") {

        filtered =
            filtered.filter(
                task => !task.completed
            );
    }


    if (filter === "Completed") {

        filtered =
            filtered.filter(
                task => task.completed
            );
    }


    list.innerHTML = "";


    filtered.forEach(task => {

        const item =
            document.createElement("div");


        item.className =
            `task ${
                task.completed
                    ? "done"
                    : ""
            }`;


        item.innerHTML = `

            <input
                type="checkbox"
                class="check"
                ${
                    task.completed
                        ? "checked"
                        : ""
                }
                onchange="toggleTask(${task.id})"
            >


            <div class="task-info">

                <div class="task-name">
                    ${task.text}
                </div>

                <small>
                    Task
                </small>

            </div>


            <span
                class="priority ${task.priority}">
                ${task.priority}
            </span>


            <button
                class="delete"
                onclick="deleteTask(${task.id})">

                🗑️

            </button>
        `;


        list.appendChild(item);

    });


    empty.style.display =
        filtered.length
            ? "none"
            : "block";


    updateStats();
}


/* UPDATE STATISTICS */

function updateStats() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    document.getElementById(
        "total"
    ).textContent = total;


    document.getElementById(
        "pending"
    ).textContent = pending;


    document.getElementById(
        "completed"
    ).textContent = completed;
}


/* DATE */

document.getElementById(
    "date"
).textContent =

    new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );


/* ENTER KEY */

taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* LOAD TASKS */

showTasks();