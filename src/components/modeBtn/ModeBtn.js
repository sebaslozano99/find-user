import { mainSectionEl, modeBtnEl, usersInfoEl, pageInfoEl, state } from "../../common.js";
import displayUsers from "../main/Main.js";




//event listener

modeBtnEl.addEventListener("click", changeMode);




// function helper

function changeMode(){
    state.mode = !state.mode;

    modeBtnEl.querySelector(".bxs-sun").classList.toggle("hidden");
    modeBtnEl.querySelector(".bxs-moon").classList.toggle("hidden");

    document.querySelector("body").classList.toggle("dark");
    document.querySelector(".header__logo").classList.toggle("text-dark");

    usersInfoEl.classList.toggle("text-dark");
    pageInfoEl.classList.toggle("text-dark");

    mainSectionEl.innerHTML = "";
    displayUsers(state.usersArray);
}



