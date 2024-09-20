import {  inputEl, spinnerEl, usersInfoEl, pageInfoEl, API_URL, state  } from "../../common.js";
import displayUsers from "./Main.js";
import { renderButtons } from "../Buttons/Button.js";





// At first render, we fetch the data and render it
window.addEventListener("DOMContentLoaded", fetchUsersData);





//Function to fetch all the data
export async function fetchUsersData(){ 

    updatePartUI(true)

    try {
        const res = await fetch(`${API_URL}/?results=60`);

        if(!res.ok) throw new Error("Something went wrong fetching the data!");

        const data = await res.json();

        state.usersArray = data.results;

         //We'll have 5 pages, thus We devide number of users by 5 pages and the result will be the number of items per page
        state.usersPerPage = state.usersArray.length / 5;

        displayUsers(state.usersArray);

    }
    catch(err){
        throw new Error(err);
    }
    finally{
        updatePartUI(false);
        usersInfoEl.innerText = `Total users: ${state.usersArray.length}`;
        pageInfoEl.innerText = `page: ${state.page}`;
    }
}





function updatePartUI(boolean = true){
    if(boolean){
        spinnerEl.classList.add("visible");
    }
    else{
        spinnerEl.classList.remove("visible");
    }
    renderButtons(state.usersArray);
    inputEl.disabled = boolean;
    usersInfoEl.style.display = boolean ? "none" : "block";
    pageInfoEl.style.display = boolean ? "none" : "block";

}