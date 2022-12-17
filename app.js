/* Library */
let library = [];
let idCounter = 0;

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = "id" + idCounter;
};

function addBook(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
  idCounter++;
}

addBook("Steppenwolf", "Hermann Hesse", "416", true);
showNewBook();
addBook("The Gods Themselves", "Isaac Asimov", "304", false);
showNewBook();
addBook("The Name of the Wind", "Patrick Rothfuss ", "672", true);
showNewBook();

/* Show new book */

function showNewBook() {
  const position = library.length - 1;
  /* Create card div */
  const createCard = document.createElement("div");
  createCard.className = "card " + library[position].id;
  /* Create close card button */
  const createCloseCard = document.createElement("button");
  createCloseCard.innerHTML = "&#10006;";
  createCloseCard.className = "closeCard " + library[position].id;
  createCard.appendChild(createCloseCard);
  /* Create and append title element */
  const createTitle = document.createElement("h2");
  createTitle.innerHTML = library[position].title;
  createCard.appendChild(createTitle);
  /* Create and append author element */
  const createAuthor = document.createElement("h3");
  createAuthor.innerHTML = library[position].author;
  createCard.appendChild(createAuthor);
  /* Create and append read element */
  const createRead = document.createElement("p");
  createRead.className = "read " + library[position].id;
  if (library[position].read === true) {
    createRead.textContent = "Read";
  } else {
    createRead.textContent = "Not Read";
    createRead.classList.add("red");
  }
  createCard.appendChild(createRead);
  /* Create and append bottom card div */
  const createBottomCard = document.createElement("div");
  createBottomCard.className = "bottomCard";
  createCard.appendChild(createBottomCard);
  /* Create and append pages element */
  const createPages = document.createElement("p");
  createPages.className = "pages";
  createPages.innerHTML = library[position].pages + " pages";
  createBottomCard.appendChild(createPages);
  /* Create read button */
  const createDivReadButton = document.createElement("div");
  createDivReadButton.className = "divReadButton " + library[position].id;
  createBottomCard.appendChild(createDivReadButton);
  const createColorBar = document.createElement("div");
  createColorBar.className = "colorBar " + library[position].id;
  createDivReadButton.appendChild(createColorBar);
  const createReadButton = document.createElement("button");
  createReadButton.className = "readButton " + library[position].id;
  if (library[position].read === false) {
    createReadButton.classList.add("off");
    createColorBar.classList.add("red");
  }
  createDivReadButton.appendChild(createReadButton);
  /* Append card to card board */
  const cardBoard = document.querySelector(".cardBoard");
  cardBoard.appendChild(createCard);
  /* Add listener to read button */
  addListenerClose(createCloseCard);
  addListenerRead(createDivReadButton);
}

/* Button to open PopUp */

const buttonPopUp = document.querySelector(".buttonPopUp");
const overlay = document.querySelector(".overlay");
const popUp = document.querySelector(".popUp");

buttonPopUp.addEventListener("click", function () {
  overlay.classList.add("active");
  popUp.classList.add("active");
});

/* Button to close PopUp */

const close = document.querySelector(".close");

close.addEventListener("click", function () {
  overlay.classList.remove("active");
  popUp.classList.remove("active");
});

/* Send PopUp form and add new book */

const sendForm = document.querySelector(".sendForm");
const title = document.querySelector("input[name=title]");
const author = document.querySelector("input[name=author]");
const pages = document.querySelector("input[name=pages]");
const readBox = document.querySelector("input[name=read]");
const read = function(){
  if(readBox.checked){
    return true
}else{
  return false
}}

sendForm.addEventListener("click", function (event) {
  event.preventDefault();
  addBook(title.value, author.value, pages.value, read());
  showNewBook();
});

/* Read button */
const divReadButton = document.querySelectorAll(".divReadButton");
console.log(divReadButton);

function addListenerRead(div) {
  div.addEventListener("click", function (div) {
    if (div.target !== div.currentTarget) {
      div.stopPropagation();
      return;
    }
    const className = div.target.className.split(" ");
    const id = className.find(function (className) {
      return /^id\d+$/.test(className);
    });
    const index = library.findIndex((obj) => obj.id === id);
    const read = document.querySelector(`.read.${id}`);
    const readButton = document.querySelector(`.readButton.${id}`);
    const colorBar = document.querySelector(`.colorBar.${id}`);
    if (library[index].read === true) {
      library[index].read = false;
      read.textContent = "Not Read";
      read.classList.add("red");
      readButton.classList.add("off");
      colorBar.classList.add("red");
    } else if (library[index].read === false) {
      library[index].read = true;
      read.textContent = "Read";
      read.classList.remove("red");
      readButton.classList.remove("off");
      colorBar.classList.remove("red");
    }
  });
}

/* Close button */
function addListenerClose(div) {
  div.addEventListener("click", function (div) {
    const className = div.target.className.split(" ");
    console.log(className);
    const id = className.find(function (className) {
      return /^id\d+$/.test(className);
    });
    const card = document.querySelector(`.card.${id}`);
    card.parentNode.removeChild(card);
    library = library.filter(function (obj) {
      return obj.id !== id;
    });
    /*     const index = library.findIndex((obj) => obj.id === id); */
  });
}
