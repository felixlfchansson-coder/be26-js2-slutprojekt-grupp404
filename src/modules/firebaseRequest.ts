export const baseURL = "https://scumboard-default-rtdb.europe-west1.firebasedatabase.app/"

// category will be either: "members" | "projects"
export async function getData(category: string){
    try{
        const response = await fetch(baseURL + category + ".json");
        if(!response.ok){
            throw new Error("Fetching data failed");
        }
    
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}