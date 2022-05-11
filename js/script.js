/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
"use strict";
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const itemsPerPage = 9;
const header = document.querySelector("header");
//Makes reference to placeholder for list elemetns that contains buttons
const buttonList = document.querySelector(".link-list");

//Function that generates html for search bar
const createSearchComponent = function () {
  const html = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
  `;
  return html;
};

//Creating and appending search bar
const searchComponent = createSearchComponent();
header.insertAdjacentHTML("beforeend", searchComponent);
//Selecting search bar components
const searchBar = document.querySelector(".student-search");
const submitBtn = document.querySelector(".student-search button");

//function to search students
const searchStudents = function (students) {
  const input = document.querySelector("#search");
  //List that contains students that meet search arguments
  const newList = [];
  for (let i = 0; i < students.length; i++) {
    if (
      students[i]["name"]["first"]
        .toLowerCase()
        .includes(input.value.toLowerCase()) ||
      students[i]["name"]["last"]
        .toLowerCase()
        .includes(input.value.toLowerCase())
    ) {
      newList.push(students[i]);
    }
  }
  return newList;
};

const showPage = function (list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";

  //function returns if list is empty
  if (list.length === 0) {
    buttonList.textContent = "No matches found";
    return;
  }
  const helpers = {
    //Method that generates HTML student elements
    generateHTML() {
      let html = "";
      for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
          html += `
                <li class="student-item cf">
                <div class="student-details">
                   <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                   <h3>${list[i].name.first} ${list[i].name.last}</h3>
                   <span class="email">${list[i].email}</span>
                </div>
                <div class="joined-details">
                   <span class="date">Joined ${list[i].registered.date}</span>
                </div>
             </li>
            `;
        }
      }

      return html;
    },
  };

  studentList.insertAdjacentHTML("beforeend", helpers.generateHTML());
  return studentList;
};

//Function that adds pagination buttons
const addPaginationButtons = function (list) {
  if (list.length === 0) {
    return;
  }

  buttonList.innerHTML = "";
  const paginationNumber = list.length / itemsPerPage;

  const helpers = {
    //Method that generates html pagination button elements
    generateButtons() {
      let html = "";

      for (let i = 0; i < paginationNumber; i++) {
        html += `
         <li> <button type="button">${i + 1}</button> </li>
           `;
      }
      return html;
    },
  };

  buttonList.insertAdjacentHTML("beforeend", helpers.generateButtons());
  //Selecting first button
  const firstButton = buttonList.firstElementChild.firstElementChild;
  firstButton.className = "active";
};

buttonList.addEventListener("click", (event) => {
  const allButtons = buttonList.children;
  //If we are not clicking the button, automatically returns
  if (event.target.type !== "button") {
    return;
  }
  const targetBtn = event.target;

  //Iterating over all buttons
  for (let i = 0; i < allButtons.length; i++) {
    const singleButton = allButtons[i].children[0];
    singleButton.className = "";

    if (singleButton.textContent === targetBtn.textContent) {
      //Adding active class to clicked button
      singleButton.className = "active";
      //showing content in their respective page number
      showPage(data, +targetBtn.textContent);
    }
  }
});

//helper function that is going to handle the event in both listeners
const searchHandler = function () {
  const studentFiltered = searchStudents(data);
  showPage(studentFiltered, 1);
  addPaginationButtons(studentFiltered);
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchHandler();
});
//Passing function as a callback
searchBar.addEventListener("keyup", searchHandler);

//Call functions
showPage(data, 1);
addPaginationButtons(data);
