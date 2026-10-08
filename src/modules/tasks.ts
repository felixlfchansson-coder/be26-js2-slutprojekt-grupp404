import { baseURL } from "./firebaseRequest.js";

    // DEADLINE set to number - this will be 6 digits refereing to day / month / year
    // will need to be manipulated for display on page vs how its held in database
export async function addNewTask(projectID:string, newTaskTitle:string, taskDescription:string, taskCategory:string, newTaskDeadline:number, newPriority:string, taskStatus:string){
    try{
        const option = {
            method: "POST",
            body: JSON.stringify(
                {
                    taskTitle: newTaskTitle, 
                    taskDescription: taskDescription,
                    taskCategory: taskCategory, 
                    taskDeadline: newTaskDeadline, 
                    priority: newPriority, 
                    status: taskStatus
                }),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(`${baseURL}/projects/${projectID}tasks.json`, option);
    
        if(!response.ok){
            throw new Error("Post failed");
        }
    
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function changePriority(newPriority:string, projectID:string, taskID:string) {
    const options = {
        method: "PATCH",
        body: JSON.stringify(
            {
                priority: newPriority
            }
        ),
        headers: { 
            "content-type": "application/json"
        }
    }
    try {
        const response = await fetch(`${baseURL}/projects/${projectID}tasks${taskID}.json`, options)
        if (!response.ok) {
            throw new Error ("patching priority has failed")
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        throw error
    }
}

export async function changeTaskStatus(newStatus:string, projectID:string, taskID:string) {
    const options = {
        method: "PATCH",
        body: JSON.stringify(
            {
                status: newStatus
            }
        ),
        headers: { 
            "content-type": "application/json"
        }
    }
    try {
        const response = await fetch(`${baseURL}/projects/${projectID}tasks${taskID}.json`, options)
        if (!response.ok) {
            throw new Error ("patching priority has failed")
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        throw error
    }
}

export async function changeTaskDeadline(newTaskDeadline:string, projectID:string, taskID:string) {
    const options = {
        method: "PATCH",
        body: JSON.stringify(
            {
                taskDeadline: newTaskDeadline
            }
        ),
        headers: { 
            "content-type": "application/json"
        }
    }
    try {
        const response = await fetch(`${baseURL}/projects/${projectID}tasks${taskID}.json`, options)
        if (!response.ok) {
            throw new Error ("patching priority has failed")
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        throw error
    }
}

export async function deleteTask(projectID:string, taskID:string) {
    const options = {
        method: "DELETE"
    }
    try {
        const response = await fetch(`${baseURL}/projects/${projectID}tasks${taskID}.json`, options)
        if (!response.ok) {
            throw new Error ("Deletion failed")
        }
        const data = await response.json();
        return "Task Deleted!"
    }
    catch (error) {
        throw error
        }
}