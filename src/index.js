import "./style.css";
import "./sass/styles.scss";
import { initializeApp } from "firebase/app";
import {
	getDatabase,
	ref,
	onValue,
	push,
	remove,
} from "firebase/database";

const firebaseConfig = {
	databaseURL:
		"https://handcart-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListRef = ref(database, "shopping-list");

const inputEl = document.querySelector(".user-input");
const addBtn = document.querySelector(".btn-add");
const displayEl = document.querySelector(".display-items");

onValue(shoppingListRef, function (snapshot) {
	if (snapshot.exists()) {
		let arr = Object.entries(snapshot.val());

		clearListItems();

		for (let i = 0; i < arr.length; i++) {
			let currentItem = arr[i];

			addToListItems(currentItem);
		}
	} else {
		displayEl.textContent = "database not available";
	}
});

addBtn.addEventListener("click", async function () {
	let userInput = await inputEl?.value;
	push(shoppingListRef, userInput);
	clearUserInput();
});

function addToListItems(item) {
	const [itemId, itemValue] = item;
	let listItem = document.createElement("li");
	listItem.textContent = itemValue;
	displayEl.appendChild(listItem);

	listItem.addEventListener("click", function () {
		let exactLocationInDB = ref(
			database,
			`shopping-list/${itemId}`
		);
		remove(exactLocationInDB);
		console.log(`${itemValue} removed successfully`);
	});
}

function clearListItems() {
	displayEl.innerHTML = "";
}

function clearUserInput() {
	inputEl.value = "";
}