/*------[Functions]------*/

// Function to get original index of item in database
function getDatabaseIndex(itemMemoryAddress) {
	let categoryList = productCategories[categoryNum];

	for (let i = 0; i < categoryList.length; i++)
	{
		// Determines if objects are the same by directly comparing memory addresses of both objects
		if (categoryList[i] === itemMemoryAddress)
		{
			// Return the index when a match is found
			return i;
		}
	}
	return 0;
}

// Function to render the product cards
function loadCards(items) {
	const catalogue = document.querySelector(".catalogue");
	const cardTemplate = document.getElementById("card-template");

	// Clear existing cards
	let existingCards = catalogue.querySelectorAll("article.card");
	existingCards.forEach(card => card.remove());

	// Load product cards, note that "items" is from parameter
	for (let i = 0; i < items.length; i++) {
		clone = cardTemplate.content.cloneNode(true);

		// Find original index of item in database to ensure correct product.html link
		let databaseIndex = getDatabaseIndex(items[i]);

		// Embed the correct query strings within the link
		clone.querySelector(".product-page").setAttribute("href", `product.html?category=${categoryNum}&item=${databaseIndex}`); 

		// Set up product card
		clone.querySelector(".card-img").setAttribute("src", items[i].image);
		clone.querySelector(".card-img").setAttribute("alt", items[i].name);
		clone.querySelector(".card-img").setAttribute("title", items[i].name);
		clone.querySelector(".card-title").innerHTML = items[i].name;
		clone.querySelector(".card-price--value").innerHTML = items[i].price;
		catalogue.appendChild(clone);
	}
}

/*------[Catalogue]------*/
let template;
let clone;

// Fetch query string
const params = new URLSearchParams(window.location.search);
const categoryNum = params.get("category");

// Load page menu
template = document.getElementById("page-menu-template");
clone = template.content.cloneNode(true);
clone.querySelector(".current-page").innerText = categoryNames[categoryNum];
clone.querySelector(".page-name").innerText = categoryNames[categoryNum];
document.querySelector(".page-menu").appendChild(clone);


// Stores all items from productCategories database
let allItemsInsideCategory = [...productCategories[categoryNum]];

// Load cards (before any filters, loaded based on their index in the database)
loadCards(allItemsInsideCategory);

const sortSelect = document.getElementById("sort-select");

// Listen for filter changes
sortSelect.addEventListener("change", function () {
	const filterValue = this.value;

	let itemsButSorted = [...productCategories[categoryNum]];
	if (filterValue === "price-low-high")
	{
		// if a - b == 0, then no changes, if == -ve then sort() puts a in front, if == +ve then sort() puts b in front
		itemsButSorted.sort((a, b) => {
			return (parseFloat(a.price) - parseFloat(b.price));
		});
	}
	else if (filterValue === "price-high-low")
	{
		// if b - a == 0, then no changes, if == -ve then sort() puts b in front, if == +ve then sort() puts a in front
		itemsButSorted.sort((a, b) => {
			return (parseFloat(b.price) - parseFloat(a.price));
		});
	}
	else if (filterValue === "name-a-z")
	{
		// localeCompare returns 0 if both are the same, returns -1 if a before b, returns 1 if b before a
		itemsButSorted.sort((a, b) => a.name.localeCompare(b.name));
	}
	else if (filterValue === "name-z-a")
	{
		// localeCompare returns 0 if both are the same, returns -1 if a before b, returns 1 if b before a
		itemsButSorted.sort((a, b) => b.name.localeCompare(a.name));
	}

	// if none of the conditions are true, itemsButSorted remain in default sequence

	// Reload cards according to sorted (or unsorted) sequence
	loadCards(itemsButSorted);
});
