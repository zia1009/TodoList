const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAll = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listAdd = [];
    }else{
        listAdd = JSON.parse(getLocalStorage);
    }
    listAdd.push(userData);
    localStorage.setItem("New Todo" , JSON.stringify(listAdd));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listAdd = [];
    }else{
        listAdd = JSON.parse(getLocalStorage);
    }
    const num = document.querySelector(".num");
    num.textContent = listAdd.length;
    if(listAdd.length > 0){
        clearAll.classList.add("active");
    }else{
        clearAll.classList.remove("active");
    }
    let newLiTag = '';
    listAdd.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listAdd = JSON.parse(getLocalStorage);
    listAdd.splice(index, 1)
    localStorage.setItem("New Todo" , JSON.stringify(listAdd));
    showTasks();
}

clearAll.onclick = ()=>{
    listAdd = [];
    localStorage.setItem("New Todo" , JSON.stringify(listAdd));
    showTasks();
}