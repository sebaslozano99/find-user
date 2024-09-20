import { mainSectionEl, inputEl, spinnerEl, usersInfoEl, pageInfoEl, prevBtnEl, API_URL, state, nextBtnEl } from "../../common.js";
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

        spinnerEl.classList.remove("visible");

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





//This function is used in the 1st render, whenever user move to a different page, and whenever user uses the search bar
export function displayUsers(array){

    mainSectionEl.innerHTML = "";

    //if user is searching in the input field
    if(state.usersInput !== ""){

        //filter objects in which either properties name or lastName includes the letters that the user is inputing
        const filteredArray =  array.filter((user) => user.name.first.toLowerCase().includes(state.usersInput.toLowerCase()) || user.name.last.toLowerCase().includes(state.usersInput.toLowerCase()));

        usersInfoEl.innerText = `Total users: ${filteredArray.length}`;

        if(filteredArray.length > 12){

            //reference to know if there should be pagination in the filtered array
            state.isGreater = true;

            //In case user had previously moved to a different page, and then searched user, we set it back to 1 in order to avoid glitches, when user clears input field
            state.page = 1;

            pageInfoEl.innerText = `page: ${state.pageWhenSearchIsGreaterThanTwelve}`;

            // if user had PAGE var greater than 1, the PREVBTN would be enabled, but if user filters, a new list will render starting from PAGEWHENGREATER which is 1, but PREVBTN was enabled, hence we disable it with the code below
            prevBtnEl.disabled = state.pageWhenSearchIsGreaterThanTwelve === 1 ? true : false;

            //if user had PAGE variable in 5, but then filters user, a new list is render but the NEXTBTN is disabled, thus we enable it with the code below
            nextBtnEl.disabled = state.pageWhenSearchIsGreaterThanTwelve === state.totalPages ? true : false;

            //Calculate how many users will be in each page, based done the length of the filteredArray
            state.usersPerPage = Math.round(filteredArray.length / state.totalPages);

            filteredArray.slice((state.pageWhenSearchIsGreaterThanTwelve - 1) * state.usersPerPage, state.pageWhenSearchIsGreaterThanTwelve * state.usersPerPage).forEach((element) => {

                HTML(element);
        
            });

        }
        else {
            pageInfoEl.innerText = `page: ${state.page}`;

            state.pageWhenSearchIsGreaterThanTwelve = 1; 
            
            state.isGreater = false;

            filteredArray.forEach((element) => {
    
                HTML(element);
    
            })
        }

        renderButtons(filteredArray);

        return;
    }

    usersInfoEl.innerText = `Total users: ${array.length}`;

    //In case user had previously filtered users with search bar, and then clears it, we set "isGreater" var, beack to its default value in order to avoid bugs
    state.isGreater = false;

    //In case user filtered use with searchBar, and moved to a different page in the filtered array, we move our MAIN page var back to its default state in order to avoid bugs
    state.pageWhenSearchIsGreaterThanTwelve = 1;

    pageInfoEl.innerText = `page: ${state.page}`;

    //if user had filtered users and moved through pages, and PAGEWHEN... variable is greater than 1, but now user clears the input, we'll render the regular list from page 1, but PREVBTN was enabled, thus we disable it with code below
    prevBtnEl.disabled = state.page === 1 ? true : false;

    //if user had filtered users and moved through pages, and PAGEWHEN... variable is equal 5, the NEXTBTN will be disabled. But if user clears the input field, the regular list will be rendered, but NEXTBTN will be disabled, impeding user to move. Thus we enable NEXTBTN with code below
    nextBtnEl.disabled = state.page === state.totalPages ? true : false;


    //If user had previously filtered user with the searchbar, and the result returned an array with more than 12 users, it changed our "usersPerPage" var based on the filtered array, thus re-calculate it, based on the complete length of the main array
    state.usersPerPage = state.usersArray.length / 5;

    array.slice((state.page - 1) * state.usersPerPage, state.page * state.usersPerPage).forEach((element) => {

        HTML(element);

    });

    renderButtons(array);
}





//OTHER FUNCTIONS -----





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


export default displayUsers;