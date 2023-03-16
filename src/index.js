import "./style.css";
import "./sass/styles.scss";
import { initializeApp } from "firebase/app";

import { DATABASE_URL } from "../environment";

import {
	getDatabase,
	ref,
	onValue,
	push,
	remove,
} from "firebase/database";

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

onValue(shoppingListRef, function (snapshot) {
	if (snapshot.exists()) {
		let arr = Object.entries(snapshot.val());

		clearListItems();

		for (let i = 0; i < arr.length; i++) {
			let currentItem = arr[i];

			addToListItems(currentItem);
		}
	} else {
		displayEl.textContent = "add some items";
	}
});

inputEl.addEventListener("keyup", function (e) {
	if (e.code === "Enter") {
		submitData();
	}
});

addBtn.addEventListener("click", submitData);

async function submitData() {
	let userInput = await inputEl?.value.trim(" ");
	if (userInput) {
		push(shoppingListRef, userInput);
	}
	clearUserInput();
}

function addToListItems(item) {
	const [itemId, itemValue] = item;
	let listItem = document.createElement("li");
	listItem.classList.add("item");
	listItem.textContent = itemValue;

	let deleteBtn = document.createElement("button");
	deleteBtn.type = "button";
	deleteBtn.textContent = "❌";
	deleteBtn.className = "deleteBtn";
	listItem.append(deleteBtn);

	displayEl.appendChild(listItem);

	deleteBtn.addEventListener("click", function () {
		let exactLocationInDB = ref(
			database,
			`shopping-list/${itemId}`
		);
		remove(exactLocationInDB);
	});
}

clearBtn.addEventListener("click", function () {
	let dbRef = ref(database, `shopping-list`);
	remove(dbRef);
});

function clearListItems() {
	displayEl.innerHTML = "";
}

function clearUserInput() {
	inputEl.value = "";
}
