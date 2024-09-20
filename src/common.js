// CONSTS 
export const API_URL = "https://randomuser.me/api";



//DOM ELEMENTS
export const mainEl = document.querySelector("body");
export const mainSectionEl = document.querySelector(".main__section");
export const spinnerEl = document.querySelector(".spinner");
export const nextBtnEl = document.querySelector(".main__btn-container--btn.next");
export const prevBtnEl = document.querySelector(".main__btn-container--btn.prev");
export const modeBtnEl = document.querySelector(".header--mode-btn");
export const inputEl = document.querySelector(".header__form--input");
export const usersInfoEl = document.querySelector(".main__information--users");
export const pageInfoEl = document.querySelector(".main__information--page");

// STATE VARIABLES 
export const state = {
    usersArray: [],
    page: 1,  
    pageWhenSearchIsGreaterThanTwelve: 1,
    totalPages: 5,
    usersPerPage: null,
    mode: false,
    usersInput: "",
    isGreater: false,
}





    