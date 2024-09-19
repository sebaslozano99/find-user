import { nextBtnEl, prevBtnEl, mainSectionEl, state } from "../../common.js";
import { displayUsers } from "../main/Main.js";




if(state.page === 1) prevBtnEl.disabled = true;




nextBtnEl.addEventListener("click", () => {

    if(state.page === state.totalPages) return;

    state.page++;

    if(state.page > 1) prevBtnEl.disabled = false;

    if(state.page === state.totalPages) nextBtnEl.disabled = true;

    mainSectionEl.scrollIntoView(true);

    displayUsers(state.usersArray);

})


prevBtnEl.addEventListener("click", () => {

    if(state.page === 1) return;

    state.page--;

    if(state.page === 1) prevBtnEl.disabled = true;

    if(state.page < state.totalPages) nextBtnEl.disabled = false;

    mainSectionEl.scrollIntoView(true);

    displayUsers(state.usersArray);

})


