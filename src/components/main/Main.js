import { mainSectionEl, spinnerEl, API_URL, state } from "../../common.js";
import { renderButtons } from "../modeBtn/ModeBtn.js";

// At first render, we fetch the data and render it
window.addEventListener("DOMContentLoaded", fetchUsersData);




export async function fetchUsersData(){

    spinnerEl.classList.add("visible");
    renderButtons(state.usersArray);

    try {
        const res = await fetch(`${API_URL}/?results=60`);

        if(!res.ok) throw new Error("Something went wrong fetching the data!");

        const data = await res.json();

        state.usersArray = data.results;

         //We'll have 5 pages, thus We devide number of users by 5 pages and the result will be the number of items per page
        state.usersPerPage = state.usersArray.length / 5;

        displayUsers(state.usersArray);

        spinnerEl.classList.remove("visible");

    }
    catch(err){
        throw new Error(err);
    }
    finally{
        spinnerEl.classList.remove("visible");
        renderButtons(state.usersArray);
    }
}




export function displayUsers(array){

    mainSectionEl.innerHTML = "";

    if(state.usersInput){

        array.filter((user) => user.name.first.toLowerCase().includes(state.usersInput.toLowerCase()) || user.name.last.toLowerCase().includes(state.usersInput.toLowerCase())).forEach((element) => {

            HTML(element);

        })

        renderButtons(array.filter((user) => user.name.first.toLowerCase().includes(state.usersInput.toLowerCase()) || user.name.last.toLowerCase().includes(state.usersInput.toLowerCase())));

        return;
    }

    array.slice((state.page - 1) * state.usersPerPage, state.page * state.usersPerPage).forEach((element) => {

        HTML(element);

    });

    renderButtons(array);
}


// Above we loop over an array of objects, and each element will be passed to this function
function HTML(element){

    const segment = `
        <div class="${state.mode ? "main__section__box dark" : "main__section__box"}">

            <img src="${element.picture.large}" alt="${element.dob.date}" class="main__section__box--img" />

            <div class="main__section__box__paragraph-container" >
                <h2 class="main__section__box__paragraph-container--h2" style="${state.mode ? "color: #0077ff" : ""}" >${element.name.first} ${element.name.last}</h2>
                <p class="main__section__box__paragraph-container--p" style="${state.mode ? "color: #fff" : ""}" >${element.email}</p>
            </div>

            <p class="${state.mode ? "text-dark main__section__box--joined" : "main__section__box--joined"} " >Joined ${element.registered.date}</p>

        </div>
    `;

    mainSectionEl.insertAdjacentHTML("beforeend", segment);
}


export default displayUsers;