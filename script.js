<<<<<<< HEAD
=======
// Demo Data
const demoNote = {
  imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
  fullName: "Fatima Uma",
  homeTown: "Singapore",
  purpose: "Study",
  selected: "Important"
};

>>>>>>> 55b028a (Add default demo card)
const addBtn = document.querySelector("#addBtn");
const note = document.querySelector(".form-container");
const closeNote = document.querySelector(".close-btn");
const scroolUp = document.querySelector("#upBtn");
const scroolDown = document.querySelector("#downBtn");
const stack = document.querySelector(".stack");

const form = document.querySelector("#noteForm");
const imgUrl = document.querySelector("#imgUrl");
const fullNameInput = document.querySelector("#name");
const townInput = document.querySelector("#town");
const purposeInput = document.querySelector("#booking");
const categoryRadios = document.querySelectorAll('input[name="category"]');

//Data Storage
function saveToLocalStorage(obj) {
  //Fetch previous stored data
  if (localStorage.getItem("tasks") === null) {
    //if null then crt a new [].
    let oldTask = [];
    oldTask.push(obj); //then push new data 
    localStorage.setItem("tasks", JSON.stringify(oldTask));
  }
  else {
    let oldTasks = localStorage.getItem("tasks");
    let arrOldTasks = JSON.parse(oldTasks);
    arrOldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(arrOldTasks));
  }
}

// Note open & close
addBtn.addEventListener("click", function () {
  note.style.display = "block";
});

closeNote.addEventListener("click", function () {
  note.style.display = "none";
});

// Form Validation
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Trimmed values
  const imageUrl = imgUrl.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = townInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = false;

  categoryRadios.forEach((radio) => {
    if (radio.checked) {
      selected = radio.value;
    }
  });

  if (imageUrl === "") {
    alert("Please enter an Image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your Full Name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your Home Town.");
    return;
  }

  if (purpose === "") {
    alert("Please enter the Purpose.");
    return;
  }

  if (!selected) {
    alert("Please select a Category.");
    return;
  }

  // New note creation 
  saveToLocalStorage({
    imageUrl, fullName, homeTown, purpose, selected,
  });

  form.reset();
  note.style.display = "none";
  showCards();
});

//Show Cards
function showCards() {
  stack.innerHTML = "";
  let totalCards = JSON.parse(localStorage.getItem("tasks")) || [];

  if (totalCards.length === 0) {
    totalCards.push(demoNote);
  }

  totalCards.forEach(function (task) {
    // Main Card
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card", "card");
    noteCard.id = "noteCard";

    // Profile
    const profile = document.createElement("div");
    profile.classList.add("profile");

    const cardImage = document.createElement("img");
    cardImage.id = "cardImage";
    cardImage.src = task.imageUrl;
    cardImage.alt = "Broken Image";

    profile.appendChild(cardImage);

    // Name
    const cardName = document.createElement("h2");
    cardName.id = "cardName";
    cardName.textContent = task.fullName;

    // Info
    const info = document.createElement("div");
    info.classList.add("info");

    // Left Labels
    const label = document.createElement("div");
    label.classList.add("label");

    const homeTownLabel = document.createElement("p");
    homeTownLabel.textContent = "Home town";

    const purposeLabel = document.createElement("p");
    purposeLabel.textContent = "Purpose";

    label.append(homeTownLabel, purposeLabel);

    // Right Values
    const value = document.createElement("div");
    value.classList.add("value");

    const cardTown = document.createElement("p");
    cardTown.id = "cardTown";
    cardTown.textContent = task.homeTown;

    const cardPurpose = document.createElement("p");
    cardPurpose.id = "cardPurpose";
    cardPurpose.textContent = task.purpose;

    value.append(cardTown, cardPurpose);

    // Add Label & Value
    info.append(label, value);

    // Buttons
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // Call Button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.id = "callBtn";
    callBtn.innerHTML = `
<i class="fa-solid fa-phone"></i>
Call
`;

    // Message Button
    const messageBtn = document.createElement("button");
    messageBtn.classList.add("message");
    messageBtn.id = "messageBtn";
    messageBtn.textContent = "Message";

    // Add Buttons
    buttons.append(callBtn, messageBtn);

    // Final Card
    noteCard.append(
      profile,
      cardName,
      info,
      buttons
    );

    document.querySelector(".stack").appendChild(noteCard);
  })
};
showCards();

//Update Cards
function updateStack() {
  let cards = document.querySelectorAll(".stack .card");

  for (let i = 0; i < 3; i++) {
    card.style.zIndex = 3 - i;
    card.style.transform = `transform(${i * 10}px) scale(${1 - i * 0.02})`;
    card.style.opacity = `${1 - i * 0.02}`;
  }
};

//Card Scrooling
scroolUp.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
  }
  //update
  updateStack();
});

scroolDown.addEventListener("click", function () {
  let firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
  }
  //update
  updateStack();
});
