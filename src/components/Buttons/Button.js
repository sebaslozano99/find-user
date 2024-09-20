import { nextBtnEl, prevBtnEl, mainEl, state, pageInfoEl } from "../../common.js";
import  displayUsers  from "../main/Main.js";



//1st render -- 
if(state.page === 1) prevBtnEl.disabled = true;




nextBtnEl.addEventListener("click", () => {

    NextPrevBtn(true);

    mainEl.scrollIntoView(true);

    displayUsers(state.usersArray);

})


prevBtnEl.addEventListener("click", () => {

    NextPrevBtn(false);

    mainEl.scrollIntoView(true);

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


function NextPrevBtn(nextOrPrev){
    //If user is filtering, and returned array contains more than 12 users, we'll update another page variable, otherwise just the regular

    if(!state.isGreater){
        
        nextOrPrev ? state.page++ : state.page--;
    
        pageInfoEl.innerText = `page: ${state.page}`;

        prevBtnEl.disabled = nextOrPrev && state.page > 1 && false || !nextOrPrev && state.page === 1 && true;

        nextBtnEl.disabled = nextOrPrev && state.page === state.totalPages && true || !nextOrPrev && state.page < state.totalPages && false;
    
    }
    else{
    
        nextOrPrev ? state.pageWhenSearchIsGreaterThanTwelve++ : state.pageWhenSearchIsGreaterThanTwelve--;
    
        pageInfoEl.innerText = `page: ${state.pageWhenSearchIsGreaterThanTwelve}`;

        prevBtnEl.disabled = nextOrPrev && state.pageWhenSearchIsGreaterThanTwelve > 1 && false || !nextOrPrev && state.pageWhenSearchIsGreaterThanTwelve === 1 && true;

        nextBtnEl.disabled = nextOrPrev && state.pageWhenSearchIsGreaterThanTwelve === state.totalPages && true || !nextOrPrev && state.pageWhenSearchIsGreaterThanTwelve < state.totalPages && false;
    
    }
}









// THIS WAS PART OF NEXT BTN FUNC 

    // if(!state.isGreater){

    //     state.page++;

    //     pageInfoEl.innerText = `page: ${state.page}`;

    //     if(state.page > 1) prevBtnEl.disabled = false;
    
    //     if(state.page === state.totalPages) nextBtnEl.disabled = true;

    // }
    // else{

    //     state.pageWhenSearchIsGreaterThanTwelve++;

    //     pageInfoEl.innerText = `page: ${state.pageWhenSearchIsGreaterThanTwelve}`;

    //     if(state.pageWhenSearchIsGreaterThanTwelve > 1) prevBtnEl.disabled = false;
    
    //     if(state.pageWhenSearchIsGreaterThanTwelve === state.totalPages) nextBtnEl.disabled = true;

    // }



// THIS WAS PART OF PREV BTN FUNC 

    // if(!state.isGreater){

    //     state.page--;

    //     pageInfoEl.innerText = `page: ${state.page}`;

    //     if(state.page === 1) prevBtnEl.disabled = true;
    
    //     if(state.page < state.totalPages) nextBtnEl.disabled = false;

    // }
    // else {

    //     state.pageWhenSearchIsGreaterThanTwelve--;

    //     pageInfoEl.innerText = `page: ${state.pageWhenSearchIsGreaterThanTwelve}`;

    //     if(state.pageWhenSearchIsGreaterThanTwelve === 1) prevBtnEl.disabled = true;

    //     if(state.pageWhenSearchIsGreaterThanTwelve < state.totalPages) nextBtnEl.disabled = false;
    // }