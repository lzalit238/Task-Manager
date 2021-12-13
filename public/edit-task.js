// const e = require("express");

const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompleteDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTask = async () => {
    try {
        const { data: { task }, } = await axios.get(`http://localhost:3000/api/v1/tasks/${id}`);
        const { _id: taskID, completed, name } = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if(completed){
            taskCompleteDOM.checked = true;
        }
    } catch(err) {
        console.log(err);
    }
};
showTask();

editFormDOM.addEventListener('submit', async(e) => {
    editBtnDOM.textContent = 'Loading...';
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompleteDOM.checked;

        const { data: {task}, } = await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`, {
            name: taskName, completed: taskCompleted
        });
        const { _id: taskId, completed, name } = task;

        taskIDDOM.textContent = taskId;
        taskNameDOM.value = name;
        tempName = name;
        if(completed){
            taskCompleteDOM.checked = true;
        }
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Success, edited task';
        formAlertDOM.classList.add('text-success');
    } catch(err) {
        console.error(err);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = 'Error, please try again';
    }
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
})