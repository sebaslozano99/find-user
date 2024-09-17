// CONSTS 
export const API_URL = "https://randomuser.me/api";



//DOM ELEMENTS
export const mainSectionEl = document.querySelector(".main__section");
export const spinnerEl = document.querySelector(".spinner");
export const nextBtnEl = document.querySelector(".main__btn-container--btn.next");
export const prevBtnEl = document.querySelector(".main__btn-container--btn.prev");



// STATE VARIABLES 
export const state = {
    usersArray: [],
    page: 1,  
    totalPages: 5,
    usersPerPage: null  
}

    