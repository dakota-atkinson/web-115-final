let tasks = [];
let form = document.getElementById("form");
let idcount = 0;


document.getElementById("form").addEventListener("submit", function(event){
    
    event.preventDefault();
    
    let taskName = document.getElementById("name");
    let taskPriority = document.getElementById("priority");
    let taskImportant = document.getElementById("important");
    

    // doesn't submit if taskname is empty
    if (taskName.value == ''){

        alert("Task Name must not be empty.")

    // otherwise . . . .
    } else{

        // create task JSON object
        let task = {

            "id": idcount++,
            "name": taskName.value,
            "priority": priority.value,
            "isImportant": taskImportant.checked,
            "isCompleted": false,
            "date": new Date()

        };


        // add task to tasks list
        tasks.push(task);


        // create a task div based on the task JSON object
        let taskDiv = document.createElement("div");
        taskDiv.id = task["id"];


        // add the non-interactable elements
        taskDiv.appendChild(document.createElement("div").appendChild(document.createElement("p"))).innerHTML = task["name"];
        
        taskDiv.appendChild(document.createElement("div").appendChild(document.createElement("p"))).innerHTML = "Priority: " + task["priority"];

        let taskDate = (task["date"].getMonth() + 1) + "/" + task["date"].getDate() + "/" + task["date"].getFullYear();
        taskDiv.appendChild(document.createElement("div").appendChild(document.createElement("p"))).innerHTML = taskDate;
        

        // prep the button div
        let buttonDiv = document.createElement("div");


        // create the done button
        let done = buttonDiv.appendChild(document.createElement("input"));
        done.type = "checkbox";
        done.class = "completed";
        done.id = "completed" + taskDiv.id;

        done.addEventListener("click", function(){

            let taskDiv = this.parentElement.parentElement;
            let donelabel = document.getElementById("donelabel" + taskDiv.id);


            if (this.checked == true){

                taskDiv.style.textDecoration = "line-through";
                donelabel.innerHTML = "Undo ";

            } else {

                taskDiv.style.textDecoration = "none";
                donelabel.innerHTML = "Done ";

            }

        });

        let donelabel = buttonDiv.appendChild(document.createElement("label"));
        donelabel.setAttribute("for", "completed" + taskDiv.id);
        donelabel.innerHTML = "Done ";
        donelabel.id = "donelabel" + taskDiv.id;


        // create the delete button
        let del = buttonDiv.appendChild(document.createElement("input"));
        del.type = "button";
        del.value = "Delete";

        del.addEventListener("click", function(){

            let taskDiv = this.parentElement.parentElement;

            for (let i = 0; i < tasks.length; i++){

                if (tasks[i]["id"] == taskDiv.id){

                    tasks.splice(i, 1);

                }

            }

            console.log(JSON.stringify(tasks));

            taskDiv.remove();

        });

        taskDiv.appendChild(buttonDiv);


        // taskDiv styling
        if (task["isImportant"] == true){

            taskDiv.style.backgroundColor = "red";

        }

        taskDiv.style.display = "flex";
        taskDiv.style.justifyContent = "center";
        taskDiv.style.alignItems = "center";
        taskDiv.style.gap = "200px";


        // add taskDiv to the page
        document.getElementById("taskmanager").appendChild(taskDiv);

        taskName.innerHTML = "";
        taskImportant.value = false;

        console.log(JSON.stringify(tasks));

    }


});