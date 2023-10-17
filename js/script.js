document.getElementById("year").innerHTML = new Date().getFullYear()
  setInterval ( ()=>{
 document.getElementById("time").innerHTML = dayjs().format("dddd MM-DD-YYYY hh:mm:ss")
},)
let userName;
do {
    userName = prompt("Enter Your Name");
} while (!userName);
document.getElementById("userName").innerHTML = userName;

function notify(msg, color) {
    Toastify({
        text: msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: color,
        },
        onClick: function () { }
    }).showToast();
}
const randomId = () => {
    return Math.random().toString(36).slice(2)
}
const emptyFieldValue = () => {
    document.getElementById("title").value = ""
    document.getElementById("location").value = ""
    document.getElementById("description").value = ""

}
const output = (out) => {
    // let tableHead = `<div class="table-responsive"><table class="table text-center"><tr><th>#</th><th>Title</th><th>location</th><th>Description</th><th>Action</th></tr>`
    // document.getElementById("output").innerHTML= tableHead + out + tableFoot
    document.getElementById("output").innerHTML += out
}
const clearOutput = () => {
    document.getElementById("output").innerHTML = ""
}
const setValue = (id, value) => {
    return document.getElementById(id).value = value
}

let error = "#bc3908"
let success = "#2b9348"
let alert = "#faa307"

const inputField = id => document.getElementById(id).value

showTodos()
const add = () => {
    event.preventDefault()

    let title = inputField("title"), location = inputField("location"); description = inputField("description");

    title = title.trim();
    location = location.trim();
    description = description.trim();
    id = randomId()

    if (title.length < 3) {
        return notify("Please enter Title correctly", error);
    }
    if (location.length < 3) {
        return notify("Please enter Location correctly", error);
    }
    if (description.length < 10) {
        return notify("Please enter Description correctly", error);
    }


    let todo = { title, location, description, id }
    // todo.id = getRandomId();
    todo.dateCreated = new Date().getTime();
    todo.status = "active";

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

    notify("A new todo has been successfully Added", success)
    showTodos()
    emptyFieldValue()
}

function showTodos() {
    clearOutput()
    // const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (!todos.length) {
        // alert("no todo") 
        output(`<h4 class ="text-center">HURRAY! No task available. Add a task button to add Your task.</h4>`)
    }
    else {
            const tableStart = '<div class="table-responsive table-bordered table-striped"><table class="table">';
            const tableEnd = "</table></div>";

            const tableHead =
                "<thead><tr><th>#</th><th>Title</th><th>Location</th><th>Description</th><th>Action</th></tr></thead>";

            let tableBody = "";

            for (let i = 0; i < todos.length; i++) {
                const todo = todos[i];
                // console.log(todo.id);
                tableBody += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${todo.title}</td>
        <td>${todo.location}</td>
        <td>${todo.description}</td>
        <td>
          <button class="btn btn-sm btn-info mb-1 " data-value="${todo.id}" onclick="editTodo(event)">Edit</button>
          <button class="btn btn-sm btn-danger ms-2" data-value="${todo.id}" onclick="deleteTodo(event)">Delete</button>
        </td>
      </tr>
    `;
            }

            const table = tableStart + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEnd;
            output(table);
        }
    }

    document.getElementById("updateTask").style.display = "none"
const deleteTodo = () => {
    let todoId = event.target.getAttribute('data-value')
    const todos = JSON.parse(localStorage.getItem("todos"));
    let deleted = todos.filter((todo) => {
        return todo.id !== todoId
    })
    localStorage.setItem("todos", JSON.stringify(deleted));
    notify("This Task is Deleted", success)
    showTodos()
}
const editTodo = () => {
    let todoId = event.target.getAttribute('data-value')
    // console.log(todoId)
    const todos = JSON.parse(localStorage.getItem("todos"))
    let todo = todos.find((todo) => {
        return todo.id === todoId
    })

    const { title, location, description } = todo || {}
setValue("title", title || "")
setValue("location", location || "")
setValue("description", description || "")

    localStorage.setItem("todoEdited", JSON.stringify(todo))
    showTodos()
    document.getElementById("addTask").style.display = "none"
    document.getElementById("updateTask").style.display = "inline-block"
}
const update = () => {
    const todoEdited = JSON.parse(localStorage.getItem("todoEdited"))
    let updatedTitle = inputField("title")
    let updatelocation = inputField("location")
    let updatedDescription = inputField("description")

    const updated = { ...todoEdited, title: updatedTitle, location: updatelocation, description: updatedDescription }
    updated.dateCreated = new Date().getTime()

    const todos = JSON.parse(localStorage.getItem("todos"))
    const updatedTodos = todos.map(todo => {
        if (todo.id === updated.id) {
            return updated;
        }
        return todo;
    });
    

    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    emptyFieldValue()
    showTodos()
    notify("Successfully Edited", success)

    document.getElementById("addTask").style.display = "inline-block"
    document.getElementById("updateTask").style.display = "none"
}






