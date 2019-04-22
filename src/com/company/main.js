const toDoList = [];

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector('h2 span');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');
const inputSearch = document.querySelector('div input');
const liElements = document.querySelectorAll('li');

const removeTask = (e) => {

    //poprostu usuwa element z listy po wciśnięciu na li (wersja bez button)
    // e.target.remove();

    //poprostu usuwa element z listy po wciśnięciu button
    // e.target.parentNode.remove();

    //przekreślenie zamiast usunięcia

    // e.target.parentNode.style.textDecoration = "line-through";
    // e.target.remove();

    //kolejny sposób
    //działa gdy każdy li ma data-key="jakis index"
    // const index = e.target.parentNode.dataset.key;
    // document.querySelector('li[data-key="${index}"]').remove();

    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1)
    console.log(toDoList);
    taskNumber.textContent = listItems.length;
    renderList(); // po to aby odświeżyć id. bez tego po usunięciu id zostają stare. Co innego się usuwa ze strony a aco innego z tablicy 
}


const addTask = (e) => {
    e.preventDefault()
    const titleTask = input.value;
    if (titleTask === "") return;
    const task = document.createElement('li');
    task.className = 'task';
    task.innerHTML = titleTask + "<button>Usuń</button>";
    toDoList.push(task)

    renderList()

    ul.appendChild(task);
    input.value = "";
    // const liItems = document.querySelectorAll('li.task').length;
    taskNumber.textContent = listItems.length;
    task.querySelector('button').addEventListener('click', removeTask);

}

const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement);
    })
}

const searchTask = (e) => {
    console.log(listItems);
    const searchText = e.target.value.toLowerCase()
    // let tasks = [...liElements];
    // console.log(tasks);
    let tasks = toDoList;

    console.log(tasks);
    tasks = tasks.filter(li => li.innerHTML.toLowerCase().includes(searchText))
    console.log(tasks);
    ul.textContent = "";
    tasks.forEach(li => ul.appendChild(li))
}

inputSearch.addEventListener('input', searchTask)
form.addEventListener('submit', addTask)