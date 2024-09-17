// consts 

const API_URL = "https://randomuser.me/api";


//DOM ELEMENTS

const mainSectionEl = document.querySelector(".main__section");
const spinnerEl = document.querySelector(".spinner");
const nextBtnEl = document.querySelector(".main__btn-container--btn.next");
const prevBtnEl = document.querySelector(".main__btn-container--btn.prev");



// Variables 

let usersArray;
// let isLoading = false;
let page = 1;




// EVENT LISTENERS

window.addEventListener("DOMContentLoaded", fetchUsersData);
nextBtnEl.addEventListener("click", () => {
    page++;
    console.log(page);
    mainSectionEl.innerHTML = "";
    fetchUsersData();
})
prevBtnEl.addEventListener("click", () => {
    page--;
    console.log(page);
    // mainSectionEl.innerHTML = "";
    fetchUsersData();
})



async function fetchUsersData(){
    spinnerEl.classList.add("visible");
    try {
        const res = await fetch(`${API_URL}/?results=60`);

        if(!res.ok) throw new Error("Something went wrong fetching the data!");

        const data = await res.json();

        usersArray = data.results;

        displayUsers(usersArray);

        console.log(usersArray);

        spinnerEl.classList.remove("visible");
        
    }
    catch(err){
        throw new Error(err);
    }
    finally{
        isLoading = false;
        spinnerEl.classList.remove("visible");
    }
}




function displayUsers(array){

    array.forEach(element => {
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



