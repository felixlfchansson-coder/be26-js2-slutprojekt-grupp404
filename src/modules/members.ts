import { baseURL } from "./firebaseRequest.js";

export async function addNewMember(newFirstName:string, newSecondName:string, newCategory:string) {
    try{
        const option = {
            method: "POST",
            body: JSON.stringify({firstName: newFirstName, secondName: newSecondName, role: newCategory}),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        const response = await fetch(baseURL + "members" + ".json", option);
    
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

export async function updateMemberTasks(ongoingTasksNumber:number, memberID:string) {
    try {
        const option = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    ongoingTasks: ongoingTasksNumber
                }),
            headers: {
                "Content-type": "application/json"
            }
        }

        const response = await fetch(`${baseURL}/members/${memberID}.json`, option);

        if(!response.ok){
            throw new Error("Patch failed")
        }
        const data = await response.json()
        return data
    }
    catch(error) {
        throw error
    }
}

export async function updateMemberProjects(projectMember:string[], memberID:string) {
    try {
        const option = {
            method: "PATCH",
            body: JSON.stringify(
                {
                    projectMember: projectMember
                }),
            headers: {
                "Content-type": "application/json"
            }
        }

        const response = await fetch(`${baseURL}/members/${memberID}.json`, option);

        if(!response.ok){
            throw new Error("Patch failed")
        }
        const data = await response.json()
        return data
    }
    catch(error) {
        throw error
    }
}

export async function deleteMember(memberID:string) {
    const options = {
        method: "DELETE"
    }
    try {
        const response = await fetch(`${baseURL}/members/${memberID}.json`, options)
        if (!response.ok) {
            throw new Error ("Deletion failed")
        }
        const data = await response.json();
        return "Member Deleted!"
    }
    catch (error) {
        throw error
        }
}