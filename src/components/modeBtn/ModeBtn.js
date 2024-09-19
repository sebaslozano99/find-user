import { mainSectionEl, modeBtnEl, nextBtnEl, prevBtnEl, state } from "../../common.js";
import displayUsers from "../main/Main.js";




//event listener

modeBtnEl.addEventListener("click", changeMode);




// function helper

function changeMode(){
    state.mode = !state.mode;
    
    if(state.mode){
        modeBtnEl.querySelector(".bxs-sun").classList.remove("hidden");
        modeBtnEl.querySelector(".bxs-moon").classList.add("hidden");

        document.querySelector("body").classList.add("dark");
        document.querySelector(".header__logo").classList.add("text-dark");

    }
    else{
        modeBtnEl.querySelector(".bxs-moon").classList.remove("hidden");
        modeBtnEl.querySelector(".bxs-sun").classList.add("hidden");

        document.querySelector("body").classList.remove("dark");
        document.querySelector(".header__logo").classList.remove("text-dark");


    }

    mainSectionEl.innerHTML = "";
    displayUsers(state.usersArray);
}




// Other functions 

// Whenever the user is searching, and the returned list is slower than 13, the pagination button will be removed
export function renderButtons(array){
    if(!array.length || array.length < 13){
        console.log("array", array);
        nextBtnEl.style.display = "none";
        prevBtnEl.style.display = "none";
    }
    else {
        console.log("array", array);
        nextBtnEl.style.display = "block";
        prevBtnEl.style.display = "block"; 
    }
}

