import "./styles/main.css";

console.log("Hare Krishna");
console.log("test");

document.addEventListener(
	"DOMContentLoaded",
	function (event) {
		const element = document.createElement("h1");
		element.innerHTML = "Hello World";
		document.body.appendChild(element);
	}
);
