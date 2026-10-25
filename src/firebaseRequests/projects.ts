import { baseURL } from "./dataRequest.js";

export async function addNewProject(newProjectTitle:string, newProjectDescription:string, newProjectDeadline:number, newProjectMembers:string[]){

    try{
        const option = {
            method: "POST",
            body: JSON.stringify(
                {
                    projectTitle: newProjectTitle, 
                    projectDescription: newProjectDescription, 
                    projectDeadline: newProjectDeadline, 
                    projectMembers: newProjectMembers
                }),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(baseURL + "projects" + ".json", option);
    
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

export async function addProjectMembers(newProjectMembers:string[], projectID:string){

    try{
        const option = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    projectMembers: newProjectMembers
                }),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(`${baseURL}/projects/${projectID}.json`, option);
    
        if(!response.ok){
            throw new Error("Post failed");
        }
    
        const data = await response.json();
        return data;
    }
    catch(error){
        window.alert("Something went wrong.The member could not be assigned to the project.");
        throw error;
    }
}

export async function editProjectDeadline(newProjectDeadline:number, projectID:string){

    try{
        const option = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    projectDeadline: newProjectDeadline
                }),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(`${baseURL}/projects/${projectID}.json`, option);
    
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

export async function deleteProject(projectID:string) {
    const options = {
        method: "DELETE"
    }
    try {
        const response = await fetch(`${baseURL}/projects/${projectID}.json`, options)
        if (!response.ok) {
            throw new Error ("Deletion failed")
        }
        const data = await response.json();
        return "Project Deleted!"
    }
    catch (error) {
        throw error
        }
}