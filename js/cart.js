/* Format for localStorage
	{id : , category : , item : , size : , quantity : }
	- id = int
	- category = string
	- item = string
	- size = int
	- quantity = int
*/

// CartItems is a variable that stores cart items as an array of JSONs
let cartItems;

const sizes = [
	["Small", "S"],
	["Medium", "M"],
	["Large", "L"],
	["Extra Large", "XL"]
];

// Saves any changes to cartItems into localStorage
function saveChangesToStorage()
{
    localStorage.setItem("storedItems", JSON.stringify(cartItems));
}

// Loads contents of localStorage from string to array of JSON format, for logical usage inside my code
function getLocalStorageContent()
{
	cartItems = JSON.parse(localStorage.getItem("storedItems"));
	if (cartItems === null)
		cartItems = [];
}

// Each product must have a unique id, this function generates unique ids
function generateUniqueId()
{
	let generatedId;

	getLocalStorageContent();
	if (cartItems.length > 0)
		generatedId = cartItems[cartItems.length - 1].id + 1; //just make sure if i delete an item, that the id is deleted from everywhere
	else
		generatedId = 1;

	return (generatedId);
}

// Function to calculate/recalculate number of items in cart, then display it
function changeNumberOfCartItems()
{
	let numberOfCartItems = document.querySelector(".number-of-cart-items");
	numberOfCartItems.innerHTML = cartItems.length;
}

// Function to calculate/Recalculate subtotal amount when loading page, or when changes occur in cart
function calculateSubtotal()
{
	let subtotal = 0;
	let everyDisplayedPrice = document.querySelectorAll(".price-total--selected");

	for (let i = 0; i < everyDisplayedPrice.length; i++)
	{
		subtotal += Number(everyDisplayedPrice[i].innerHTML);
	}

	document.querySelector(".subtotal-value").innerHTML = (subtotal).toFixed(2);
}

// Function to insert cart items, when new item is added to cart, or when loading cart items after page refreshes
function insertCartItem(idNumber, categoryNumber, itemNumber, itemSize, itemQuantity)
{
	//load cart item template
	template = document.getElementById("cart-item-template");
	clone = template.content.cloneNode(true);

	clone.querySelector(".cart-item").dataset.id = idNumber;
	clone.querySelector(".cart-item--img").src = productCategories[categoryNumber][itemNumber].image;
	clone.querySelector(".cart-item--img").alt = productCategories[categoryNumber][itemNumber].name;
	clone.querySelector(".name--selected").innerHTML = productCategories[categoryNumber][itemNumber].name;
	clone.querySelector(".size--selected").innerHTML = sizes[itemSize][1];
	clone.querySelector(".quantity--cart").value = itemQuantity;
	clone.querySelector(".price-total--selected").innerHTML = (itemQuantity * productCategories[categoryNumber][itemNumber].price).toFixed(2);

	let moreCart = clone.querySelector(".button-more--cart"); 
	let lessCart = clone.querySelector(".button-less--cart");
	let displayedQuantityCart = clone.querySelector(".quantity--cart");
	let displayedTotalPrice = clone.querySelector(".price-total--selected");

	// Detect when cart more button is pressed
	moreCart.addEventListener("click", () => {
		newQuantityCart = Number(displayedQuantityCart.value) + 1;
		displayedQuantityCart.value = newQuantityCart;
		displayedTotalPrice.innerHTML = (Number(displayedQuantityCart.value) * productCategories[categoryNumber][itemNumber].price).toFixed(2);

		// Save changes made to quantity into localStorage
		getLocalStorageContent();

		for (let i = 0; i < cartItems.length; i++)
		{
			if (cartItems[i].category === categoryNumber && cartItems[i].item === itemNumber && cartItems[i].size === itemSize)
			{
				cartItems[i].quantity = newQuantityCart;
				saveChangesToStorage();
			}
		}

		// Calculate new subtotal
		calculateSubtotal();
	});

	// Detect when cart less button is pressed
	lessCart.addEventListener("click", () => { //uniquely identify querySelector pls
		if (Number(displayedQuantityCart.value) > 1)
		{
			newQuantityCart = Number(displayedQuantityCart.value) - 1;
			displayedQuantityCart.value = newQuantityCart;
			displayedTotalPrice.innerHTML = (Number(displayedQuantityCart.value) * productCategories[categoryNumber][itemNumber].price).toFixed(2);

			// Save changes made to quantity into localStorage
			getLocalStorageContent();

			for (let i = 0; i < cartItems.length; i++)
			{
				if (cartItems[i].category === categoryNumber && cartItems[i].item === itemNumber && cartItems[i].size === itemSize)
				{
					cartItems[i].quantity = newQuantityCart;
					saveChangesToStorage();
				}
			}
		}

		// Calculate new subtotal
		calculateSubtotal();
	});

	// Detect changes in cart item quantity
	displayedQuantityCart.addEventListener("change", () => {
		if (Number(displayedQuantityCart.value) === 0)
			displayedQuantityCart.value = 1;
		else if (!(Number(displayedQuantityCart.value) >= 0))
			displayedQuantityCart.value = 1;
		else if (Number.isNaN(Number(displayedQuantityCart.value)))
			displayedQuantityCart.value = 1;

		displayedTotalPrice.innerHTML = (Number(displayedQuantityCart.value) * productCategories[categoryNumber][itemNumber].price).toFixed(2);

		// Save changes made to quantity into localStorage
		getLocalStorageContent();

		//change total price
		for (let i = 0; i < cartItems.length; i++)
		{
			if (cartItems[i].category === categoryNumber && cartItems[i].item === itemNumber && cartItems[i].size === itemSize)
			{
				cartItems[i].quantity = Number(displayedQuantityCart.value);
				saveChangesToStorage();
			}
		}

		// Calculate new subtotal
		calculateSubtotal();
	});

	// Detect when item is removed
	let removeButton = clone.querySelector(".remove-button");
	removeButton.addEventListener("click", () => {
		let cartAllItems = document.querySelector(".cart-all-items");
		let itemToRemove = cartAllItems.querySelector(`[data-id="${idNumber}"]`)
		cartAllItems.removeChild(itemToRemove);
		
		// Save changes made to quantity into localStorage
		getLocalStorageContent();

		for (let i = 0; i < cartItems.length; i++)
		{
			if (cartItems[i].id === idNumber)
			{
				cartItems.splice(i, 1);
				saveChangesToStorage();
				break ;
			}
		}

		// Update the number of items in cart
		changeNumberOfCartItems();

		// Calculate new subtotal
		calculateSubtotal();
	});

	//insert cloned template into cart
	document.querySelector(".cart-all-items").appendChild(clone);

	// Update the number of items in cart
	changeNumberOfCartItems();

	// Calculate new subtotal
	calculateSubtotal();
}


/*------[Set Up Shopping Cart]------*/
let shoppingCart = document.querySelector(".shopping-cart");

// Detect when user opens Shopping Cart
let cartButton = document.querySelector(".cart-button");
cartButton.addEventListener("click", () => {
	shoppingCart.classList.add("on");
});

// Detect when user closes Shopping Cart
let closeButton = document.querySelector(".close-button")
closeButton.addEventListener("click", () => {
	shoppingCart.classList.remove("on");
});

// Darken background when Cart is open
let overlay = document.querySelector(".cart-overlay");
overlay.addEventListener("click", () => {
	shoppingCart.classList.remove("on");
});

let checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", () => {
	// Check if there is at least one item
	if (cartItems.length > 0)
	{
		let cartAllItems = document.querySelector(".cart-all-items");
		let everyCartItem = cartAllItems.querySelectorAll(".cart-item");

		for (let i = 0; i < everyCartItem.length; i++)
		{
			cartAllItems.removeChild(everyCartItem[i]);
		}

		// Cart is now empty as items have been checked out
		cartItems = [];
		saveChangesToStorage();

		// Update the number of items in cart
		changeNumberOfCartItems();

		// Calculate subtotal (RM 0.00)
		calculateSubtotal();

		// Display Pop up
		let orderPlacedPopup = document.querySelector(".modal-backdrop");
		orderPlacedPopup.classList.remove("hide-popup--order-placed");

		let continueShoppingButton = orderPlacedPopup.querySelector(".modal-button");
		continueShoppingButton.addEventListener("click", () => {
			orderPlacedPopup.classList.add("hide-popup--order-placed");
		});
	}
});

// Fetch list of items that were in cart (if any)
getLocalStorageContent();

// Display number of items in cart (if any)
changeNumberOfCartItems();

// Load existing cart items (if any)
if (cartItems.length > 0)
{
	for (let i = 0; i < cartItems.length; i++)
	{
		insertCartItem(cartItems[i].id, cartItems[i].category, cartItems[i].item, cartItems[i].size, cartItems[i].quantity);
	}
}

// Load subtotal amount
calculateSubtotal();
