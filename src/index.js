import "./style.css";
import "./sass/styles.scss";
import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { DATABASE_URL } from "../environment";

const firebaseConfig = {
  databaseURL: DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListRef = ref(database, "shopping-list");

const inputEl = document.querySelector(".user-input");
const addBtn = document.querySelector(".btn-add");
const displayEl = document.querySelector(".display-items");
const clearBtn = document.querySelector(".btn-clear");

function clearUserInput() {
  inputEl.value = "";
}

function clearListItems() {
  displayEl.innerHTML = "";
}

async function submitData() {
  const userInput = await inputEl.value.trim(" ");
  if (userInput) {
    push(shoppingListRef, userInput);
  }
  clearUserInput();
}

function addToListItems(item) {
  const [itemId, itemValue] = item;
  const listItem = document.createElement("li");
  listItem.classList.add("item");
  listItem.textContent = itemValue;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "❌";
  deleteBtn.className = "deleteBtn";
  listItem.append(deleteBtn);

  displayEl.appendChild(listItem);

  deleteBtn.addEventListener("click", () => {
    const exactLocationInDB = ref(database, `shopping-list/${itemId}`);
    remove(exactLocationInDB);
  });
}

onValue(shoppingListRef, (snapshot) => {
  if (snapshot.exists()) {
    const arr = Object.entries(snapshot.val());

    clearListItems();

    for (let i = 0; i < arr.length; i += 1) {
      const currentItem = arr[i];

      addToListItems(currentItem);
    }
  } else {
    displayEl.textContent = "add some items";
  }
});

inputEl.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    submitData();
  }
});

addBtn.addEventListener("click", submitData);

clearBtn.addEventListener("click", () => {
  const dbRef = ref(database, "shopping-list");
  remove(dbRef);
});
