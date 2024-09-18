import { inputEl, state } from "../../common.js";
import displayUsers from "../main/Main.js";


inputEl.addEventListener("input", filterUser);



function filterUser(e){

    const usersInput = e.target.value;

    const filteredArray = state.usersArray.filter((user) => user.name.first.toLowerCase().includes(usersInput.toLowerCase()) || user.name.last.toLowerCase().includes(usersInput.toLowerCase()));

    displayUsers(filteredArray);

    if(!usersInput) {
        console.log("!usersInput");
        displayUsers(state.usersArray);
    }
    console.log(filteredArray);
    
}