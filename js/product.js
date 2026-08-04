/*----------[Product Page]---------*/
/*fetch query strings*/
const params = new URLSearchParams(window.location.search);
const categoryNum = params.get("category");
const itemNum = params.get("item");		//identified name

let template;
let clone;

/*load page menu*/
template = document.getElementById("page-menu-template--product");
clone = template.content.cloneNode(true);
clone.querySelector(".category-page--product").innerText = categoryNames[categoryNum];
clone.querySelector(".category-page--product").href = `./category.html?category=${categoryNum}`;
clone.querySelector(".current-page").innerText = productCategories[categoryNum][itemNum].name; //product
document.querySelector(".page-menu--product").appendChild(clone);


/*load product page*/
template = document.getElementById("product-page-template");
clone = template.content.cloneNode(true);
clone.querySelector(".product-img").src = productCategories[categoryNum][itemNum].image;
clone.querySelector(".product-img").alt = productCategories[categoryNum][itemNum].name;
clone.querySelector(".product-img").title = productCategories[categoryNum][itemNum].name;
clone.querySelector(".product-title").innerHTML = productCategories[categoryNum][itemNum].name;
clone.querySelector(".product-price--value").innerHTML = productCategories[categoryNum][itemNum].price;

clone.querySelector(".product-description--text").innerHTML = productCategories[categoryNum][itemNum].description;
clone.querySelector(".product-feature--text").innerHTML = productCategories[categoryNum][itemNum].features;
document.querySelector(".product-page").appendChild(clone);


/*--select item size--*/ /*--display item size--*/
displayedSize = document.querySelector(".displayed-size");

buttonSmall = document.querySelector(".size-s");
buttonMedium = document.querySelector(".size-m");
buttonLarge = document.querySelector(".size-l");
buttonXLarge = document.querySelector(".size-xl");

const buttonList = [
	buttonSmall,
	buttonMedium,
	buttonLarge,
	buttonXLarge
];

let chosenSize;		//identified size

chosenSize = 0;		//default size == "S"
buttonList[0].classList.add("size-button--on");	//default selected button == "S"
displayedSize.innerHTML = sizes[0][0];	//default displayed size == "Small"

function toggleSize(sizeClicked)
{
	let counter;

	counter = 0;
	while (counter < 4)
	{
		if (counter != sizeClicked) //if not chosen size 
		{
			buttonList[counter].classList.remove("size-button--on");
		}
		else //if chosen size
		{
			buttonList[counter].classList.add("size-button--on");
			displayedSize.innerHTML = sizes[sizeClicked][0]; //add size name
			chosenSize = sizeClicked; //record chosen size (for JSON)
		}
		counter++;
	}
}

buttonSmall.addEventListener("click", () => toggleSize(0));
buttonMedium.addEventListener("click", () => toggleSize(1));
buttonLarge.addEventListener("click", () => toggleSize(2));
buttonXLarge.addEventListener("click", () => toggleSize(3));



/*------[Control Product Quantity]------*/
let more = document.querySelector(".button-more");
let less = document.querySelector(".button-less");
let displayedQuantity = document.querySelector(".quantity");

// Increase item quantity
let chosenQuantity = 1; //identified quantity

let newQuantity;

more.addEventListener("click", () => {
	newQuantity = Number(displayedQuantity.value) + 1;
	displayedQuantity.value = newQuantity;
	chosenQuantity = Number(displayedQuantity.value);
});

// Decrease item quantity
less.addEventListener("click", () => {
	if (Number(displayedQuantity.value) > 1)
	{
		newQuantity = Number(displayedQuantity.value) - 1;
		displayedQuantity.value = newQuantity;
		chosenQuantity = Number(displayedQuantity.value);
	}
});

// Display item quantity
displayedQuantity.addEventListener("change", () => {
	if (Number(displayedQuantity.value) === 0)
		displayedQuantity.value = 1;
	else if (!(Number(displayedQuantity.value) >= 0))
		displayedQuantity.value = 1;
	else if (Number.isNaN(Number(displayedQuantity.value)))
		displayedQuantity.value = 1;
	chosenQuantity = Number(displayedQuantity.value);
});


/*------[Add To Cart]------*/
addToCartButton = document.querySelector(".add-to-cart-button");

// When add to cart button is clicked
addToCartButton.addEventListener("click", () => {
	// Fetch info of all items in the cart (if any)
	getLocalStorageContent();

	let updated = false;

	for (let i = 0; i < cartItems.length; i++)
	{
		// If item is already in cart
		if (cartItems[i].category === categoryNum && cartItems[i].item === itemNum && cartItems[i].size === chosenSize)
		{
			// Find the cart item to be modified
			let itemToBeModified = document.querySelector(`[data-id="${cartItems[i].id}"]`);

			// Calculate new quantity, then display the new quantity
			let newQuantity = Number(itemToBeModified.querySelector(".quantity--cart").value) + chosenQuantity;
			itemToBeModified.querySelector(".quantity--cart").value = newQuantity;

			// Calculate the new total price of cart item
			itemToBeModified.querySelector(".price-total--selected").innerHTML = (newQuantity * productCategories[categoryNum][itemNum].price).toFixed(2);

			// Then update localStorage
			cartItems[i].quantity = newQuantity;
			saveChangesToStorage();
			
			updated = true;
		}
	}
	// If item is NOT in cart
	if (updated === false)
	{
		// Generate a new id number for the added cart item
		let generatedId = generateUniqueId();

		// Insert a brand new cart item
		insertCartItem(generatedId, categoryNum, itemNum, chosenSize, chosenQuantity);

		// Update localStorage
		cartItems.push({id : generatedId, category : categoryNum, item : itemNum, size : chosenSize, quantity : chosenQuantity});
		saveChangesToStorage();

		// Update number of items in cart
		changeNumberOfCartItems();
	}

	// Calculate new subtotal
	calculateSubtotal();

	// Display "Item Added" pop up
	let timer;

	itemAddedPopup = document.querySelector(".item-added-popup");
	itemAddedPopup.classList.remove("hide-pop-up");

	clearTimeout(timer);
	timer = setTimeout(() => {
		itemAddedPopup.classList.add("hide-pop-up");
	}, 4000);
});


/*------[Recommended Items]------*/
template = document.getElementById("card-template");

for (let i = 0; i < 4; i++)
{
	// Randomizer
	randCategory = Math.trunc(Math.random() * 6);
	if (randCategory === 1 || randCategory === 4 || randCategory === 6)
		randItem = Math.trunc(Math.random() * 7);
	else
		randItem = Math.trunc(Math.random() * 8);

	// Display randomized item
	clone = template.content.cloneNode(true);
	clone.querySelector(".product-page").setAttribute("href", `product.html?category=${randCategory}&item=${randItem}`);
	clone.querySelector(".card-img").setAttribute("src", productCategories[randCategory][randItem].image);
	clone.querySelector(".card-img").setAttribute("alt", productCategories[randCategory][randItem].name);
	clone.querySelector(".card-img").setAttribute("title", productCategories[randCategory][randItem].name);
	clone.querySelector(".card-title").innerHTML = productCategories[randCategory][randItem].name;
	clone.querySelector(".card-price--value").innerHTML = productCategories[randCategory][randItem].price;
	document.querySelector(".catalogue").appendChild(clone);
}

