const container = document.getElementById("con");
const add1 = document.querySelector(".container button");
const todo = document.querySelector(".tasks");
const deleteall = document.querySelector(".content button");
const Priority= document.querySelector(".priority");

container.onkeyup = () => {
     let ud = container.value;
     if (ud.trim() != 0) {
          add1.classList.add("active");
     } else {
          add1.classList.remove("active");
     }
};

let temptask;
let arr=[];

add1.onclick = () => {
     const map={
          name: container.value,
          prior: Priority.value
     }     
     arr.push(map);
     localStorage.setItem("New Todo", JSON.stringify(arr));
     add1.classList.remove("active");
     container.value = "";
     Priority.value="";
     showTasks();
}


function showTasks() {
     const n = document.querySelector(".n");
     n.textContent = arr.length;
     if (arr.length > 0) {
          deleteall.classList.add("active");
     } else {
          deleteall.classList.remove("active");
     }

     todo.innerHTML = '';
     arr.sort((a,b)=> a.prior - b.prior);

     let newtasks='';
     arr.forEach(task => {
          newtasks+=`<li> ${task.prior} ${task.name} <span onclick="Delete(${task.prior})";><i class="fas fa-trash">Delete</i></span></li>`;

     });
     todo.innerHTML=newtasks;
}

function Delete(index) {
     arr.splice(index, 1);
     localStorage.setItem("New Todo", JSON.stringify(arr));
     showTasks();
}

deleteall.onclick = () => {
     arr = [];
     localStorage.setItem("New Todo", JSON.stringify(arr));
     showTasks();
}

window.onload=function(){
     temptask = localStorage.getItem("New Todo");
     if(temptask){
          arr = JSON.parse(temptask);
          showTasks();
     }
     else{
          arr=[];
     }
}