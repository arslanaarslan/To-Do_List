// get index list item
function nodeIndex(el) {
    let i=0;
    while(el.previousElementSibling ) {
        el=el.previousElementSibling;
        i++;
    }
    return i;
}


// Task 4 onload section
window.onload = function() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    if (taskList.length > 0) {
        for (let i = 0; i < taskList.length; i++) {
            let taskListItem = taskList[i];
            let task = taskListItem['description'];
            let list = document.createElement("li");

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");

            checkbox.addEventListener("click", () => {
                // console.log('Check Method Triggered');
                let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
                let index = nodeIndex(checkbox.parentNode);

                checkbox.parentNode.children[1].classList.toggle('completed');

                if (taskList[index]['state'] === false) {
                    taskList[index]['state'] = true;
                } else {
                    taskList[index]['state'] = false;
                }

                localStorage.setItem("tasks", JSON.stringify(taskList));
            });

            let span = document.createElement("span");
            span.classList.add("task");
            span.appendChild(document.createTextNode(task));

            let btnDel = document.createElement("button");
            let icon = document.createElement("i");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-circle-xmark");
            btnDel.appendChild(icon);
            btnDel.classList.add("delete-btn");
            btnDel.addEventListener("click", function () {
                let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
                let index = nodeIndex(this.parentNode);
                // console.log('Load: ', index);

                this.parentNode.remove();

                taskList.splice(index, 1);

                localStorage.setItem("tasks", JSON.stringify(taskList));
            });

            // if task completed, when reloading page, check check box and cross the span element.
            if (taskListItem['state'] === true) {
                checkbox.checked = true;
                span.classList.add('completed')
            }

            list.appendChild(checkbox);
            list.appendChild(span);
            list.appendChild(btnDel);

            document.querySelector("#task-list").appendChild(list);
            document.querySelector("#task-list").appendChild(list);
        }
    }
}

/* Delete icon: <i class="fa-solid fa-trash-can"></i> */
/* Not used
let deleteButtons = document.querySelectorAll(".delete-btn");

function deleteTask() {
    console.log("worked");
    console.log(this.parentNode.innerText);

    // console.log(`${deleteButtons.length} task left.`);
    this.parentNode.remove();
    deleteButtons = document.querySelectorAll(".delete-btn");
}

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteTask);
}

let checkBoxes = document.querySelectorAll('input[type="checkbox"]');

function completeTask() {
    // console.log(`There are ${checkBoxes.length}.`);
    this.parentNode.children[1].classList.toggle('completed');
}

for (let j = 0; j < checkBoxes.length; j++) {
    checkBoxes[j].addEventListener("click", completeTask);
}

 */

let addTaskButton = document.getElementById('add-task-button');
let inputBox = document.getElementById('input-task')



function handleAddNewTasK() {
    let task = document.querySelector("#input-task").value;
    let list = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", () => {
        // console.log('Check Method Triggered');
        let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = nodeIndex(checkbox.parentNode);

        checkbox.parentNode.children[1].classList.toggle('completed');

        if (taskList[index]['state'] === false) {
            taskList[index]['state'] = true;
        } else {
            taskList[index]['state'] = false;
        }

        localStorage.setItem("tasks", JSON.stringify(taskList));
    });

    let span = document.createElement("span");
    span.classList.add("task");
    span.appendChild(document.createTextNode(task));

    let btnDel = document.createElement("button");
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-circle-xmark");
    btnDel.appendChild(icon);
    btnDel.classList.add("delete-btn");
    btnDel.addEventListener("click", function () {
        let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

        let index = nodeIndex(this.parentNode);
        // console.log('New: ', index);

        this.parentNode.remove();

        taskList.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(taskList));
    });

    list.appendChild(checkbox);
    list.appendChild(span);
    list.appendChild(btnDel);

    document.querySelector("#task-list").appendChild(list);

    // clear input box
    document.getElementById('input-task').value = "";

    // Task 4 Start
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.push({description: task, state: checkbox.checked});

    localStorage.setItem("tasks", JSON.stringify(taskList));
    // Task 4 End
}

addTaskButton.addEventListener("click", handleAddNewTasK);
inputBox.addEventListener("keypress", (event)=> {
    // event.keyCode === 13 not supported anymore.
    if (event.key === 'Enter') { // key code of the keyboard key
        event.preventDefault();
        // your code to Run
        handleAddNewTasK();
    }
});