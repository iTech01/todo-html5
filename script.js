const inputBox = document.querySelector(".injector input");
const addBtn = document.querySelector(".injector button");
const todoList = document.querySelector(".list");
const deleteBtn = document.querySelector(".clear button");

showTasks();
inputBox.addEventListener("keyup", activeClass);
deleteBtn.addEventListener("click", deleteAll);

function activeClass() {
    let userValue = inputBox.value;
    if (userValue.trim() != 0) {
        addBtn.classList.add("active");
        addBtn.addEventListener("click", startTodo);
    } else {
        addBtn.classList.remove("active");
    }
}

function startTodo() {
    let list = [];
    let value = inputBox.value.trim();
    let userValue = value.charAt(0).toUpperCase().concat(value.substring(1));
    let localStorageData = localStorage.getItem("Todo");

    if (localStorageData == null) {
        list = [];
    } else {
        list = JSON.parse(localStorageData);
    }
    list.push(userValue);
    localStorage.setItem("Todo", JSON.stringify(list));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let localStorageData = localStorage.getItem("Todo");

    if (localStorageData == null) {
        list = [];
    } else {
        list = JSON.parse(localStorageData);
    }
    const pendingTasksNumber = document.querySelector(".pendingTask");
    pendingTasksNumber.textContent = list.length;
    let newTask = "";
    
    list.forEach((element, index) => {
        newTask += `<li>${element}</li><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>`;
    });
    todoList.innerHTML = newTask;
    inputBox.value = "";
}

function deleteTask(index) {
    let localStorageData = localStorage.getItem("Todo");
    list = JSON.parse(localStorageData);
    list.splice(index, 1);
    localStorage.setItem("Todo", JSON.stringify(list));
    showTasks();
}

function deleteAll(){
    list = [];
    localStorage.setItem("Todo", JSON.stringify(list));
    showTasks();
};


