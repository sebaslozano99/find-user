import { mainSectionEl, spinnerEl, API_URL, state } from "../../common.js";




window.addEventListener("DOMContentLoaded", fetchUsersData);




export async function fetchUsersData(){
    spinnerEl.classList.add("visible");
    console.log(state.page);

    try {
        const res = await fetch(`${API_URL}/?results=60`);

        if(!res.ok) throw new Error("Something went wrong fetching the data!");

        const data = await res.json();

        state.usersArray = data.results;

        state.usersPerPage = state.usersArray.length / 5; //We'll have 5 pages, thus We devide number of users by 5 pages

        displayUsers(state.usersArray);

        spinnerEl.classList.remove("visible");

        console.log(state.usersArray);

    }
    catch(err){
        throw new Error(err);
    }
    finally{
        spinnerEl.classList.remove("visible");
    }
}




export function displayUsers(array){

    array.slice((state.page - 1) * 12, state.page *  12).forEach((element, i) => {

        const segment = `
            <div class="main__section__box">

                <img src="${element.picture.large}" alt="${element.dob.date}" class="main__section__box--img" />

                <div class="main__section__box__paragraph-container" >
                    <h2>${element.name.first} ${element.name.last}</h2>
                    <p>${element.email}</p>
                </div>

                <p class="main__section__box--joined" >Joined ${element.registered.date}</p>

            </div>
        `;

        mainSectionEl.insertAdjacentHTML("beforeend", segment);

    });
}


export default displayUsers;