import { nextBtnEl, prevBtnEl, mainSectionEl, state } from "../../common.js";
import { displayUsers } from "../main/Main.js";




if(state.page === 1) prevBtnEl.disabled = true;




nextBtnEl.addEventListener("click", () => {

    //If user is filtering, and returned array contains more than 12 users, we'll update another page variable, otherwise just the regular
    if(!state.isGreater){

        console.log(state.pageWhenSearchIsGreaterThanTwelve);

        state.page++;

        console.log("page: ", state.page);
    
        if(state.page > 1) prevBtnEl.disabled = false;
    
        if(state.page === state.totalPages) nextBtnEl.disabled = true;

    }
    else{

        console.log(state.page);

        state.pageWhenSearchIsGreaterThanTwelve++;

        console.log("pageWhenSearchIsGreaterThanTwelve", state.pageWhenSearchIsGreaterThanTwelve);

        if(state.pageWhenSearchIsGreaterThanTwelve > 1) prevBtnEl.disabled = false;
    
        if(state.pageWhenSearchIsGreaterThanTwelve === state.totalPages) nextBtnEl.disabled = true;

    }


    mainSectionEl.scrollIntoView(true);

    displayUsers(state.usersArray);

})


prevBtnEl.addEventListener("click", () => {

    if(!state.isGreater){

        console.log(state.pageWhenSearchIsGreaterThanTwelve);

        state.page--;

        console.log("page: ", state.page);

        if(state.page === 1) prevBtnEl.disabled = true;
    
        if(state.page < state.totalPages) nextBtnEl.disabled = false;

    }
    else {

        console.log(state.page);

        state.pageWhenSearchIsGreaterThanTwelve--;

        console.log("pageWhenSearchIsGreaterThanTwelve", state.pageWhenSearchIsGreaterThanTwelve);

        if(state.pageWhenSearchIsGreaterThanTwelve === 1) prevBtnEl.disabled = true;

        if(state.pageWhenSearchIsGreaterThanTwelve < state.totalPages) nextBtnEl.disabled = false;
    }


    mainSectionEl.scrollIntoView(true);

    displayUsers(state.usersArray);

})




// OTHER FUNCTIONS



// Whenever the user is searching, and the returned list is slower than 13, the pagination button will be removed
export function renderButtons(array){

    if(!array.length || array.length < 13){

        nextBtnEl.style.display = "none";

        prevBtnEl.style.display = "none";


    }
    else {

        nextBtnEl.style.display = "block";

        prevBtnEl.style.display = "block";


    }

}


// if the filtered array's length is greater than 12, we'll have to create pagination for the returned array.
// new and separate page variable for filtered array
// calculate how many users per page will be displayed
