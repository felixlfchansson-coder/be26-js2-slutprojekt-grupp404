// Member
export function newMemberForm() {
    form.addEventListener("submit", async event =>{
        event.preventDefault()

        const newMemberFirstName = form.querySelector("#newMemberFirstName").value
        const newMemberSecondName = form.querySelector("#newMemberSecondName").value
        const newMemberCategory = form.querySelector("#newMemberCategory").value

        try{
            const data = await addNewMember(newMemberFirstName, newMemberSecondName, newMemberCategory)
            const project = new Member(newMemberFirstName, newMemberSecondName, newMemberCategory, data.name) // data should be member ID
            const card = renderMember(project)

            memberWrapper.append(card)

            form.querySelector("#newMemberFirstName").value = ""
            form.querySelector("#newMemberSecondName").value = ""
            form.querySelector("#newMemberCategory").value = ""
        }
        catch(error){
            console.log(error)
        }
    })
}