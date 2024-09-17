import { nextBtnEl, prevBtnEl, mainSectionEl, state } from "../../common.js";
import { displayUsers } from "../main/Main.js";

nextBtnEl.addEventListener("click", () => {
    if(state.page === state.totalPages) return;
    console.log(state.page);
    state.page++;
    mainSectionEl.innerHTML = "";
    displayUsers(state.usersArray);
})


prevBtnEl.addEventListener("click", () => {
    if(state.page === 1) return;
    console.log(state.page);
    state.page--;
    mainSectionEl.innerHTML = "";
    displayUsers(state.usersArray);
})


