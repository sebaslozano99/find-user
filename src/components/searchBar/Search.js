import { inputEl, state } from "../../common.js";
import displayUsers from "../main/Main.js";


inputEl.addEventListener("input", filterUser);



function filterUser(e){

    state.usersInput = e.target.value.trim();
    displayUsers(state.usersArray);
}