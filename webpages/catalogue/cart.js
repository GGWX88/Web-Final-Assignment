/*------[Set Up Shopping Cart]------*/
let cartButton;
let shoppingCart;
let overlay;

shoppingCart = document.querySelector(".shopping-cart");

//Open Shopping Cart
cartButton = document.querySelector(".cart-button");
cartButton.addEventListener("click", () =>
	{
		shoppingCart.classList.add("on");
	}
);

//Close Shopping Cart
closeButton = document.querySelector(".close-button")
closeButton.addEventListener("click", () => {
		shoppingCart.classList.remove("on");
	}
);

//Darken background when Cart is open
overlay = document.querySelector(".cart-overlay");
overlay.addEventListener("click", () => {
		shoppingCart.classList.remove("on");
	}
);



/*------[Shopping Cart Items]------*/

/* Format for localStorage
	{id : , category : , item : , size : , quantity : }
	- id = int
	- category = string
	- item = string
	- size = int
	- quantity = int
*/

// Variable to store cart items as an array of JSONs
let cartItems;

function saveChangesToStorage()
{
    localStorage.setItem("storedItems", JSON.stringify(cartItems));
}

function getLocalStorageContent()
{
	cartItems = JSON.parse(localStorage.getItem("storedItems"));
	if (cartItems === null)
		cartItems = [];
}

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

//insert cart items
function insertCartItem(idNumber, categoryNumber, itemNumber, itemSize, itemQuantity)
{
	//load cart item template
	template = document.getElementById("cart-item-template");
	clone = template.content.cloneNode(true);

	clone.querySelector(".cart-item").dataset.id = idNumber;
	clone.querySelector(".cart-item--img").src = productCategories[categoryNumber][itemNumber].image;
	clone.querySelector(".name--selected").innerHTML = productCategories[categoryNumber][itemNumber].name;
	clone.querySelector(".size--selected").innerHTML = buttonList[itemSize][2];
	clone.querySelector(".quantity--cart").value = itemQuantity;
	clone.querySelector(".price-total--selected").innerHTML = itemQuantity * productCategories[categoryNumber][itemNumber].price;

	//button to add/reduce item quantity
	moreCart = clone.querySelector(".button-more--cart"); 
	lessCart = clone.querySelector(".button-less--cart");
	displayedQuantityCart = clone.querySelector(".quantity--cart");
	displayedTotalPrice = clone.querySelector(".price-total--selected");

	// Detect when cart more button is pressed
	moreCart.addEventListener("click", () => { //uniquely identify querySelector pls
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
	});

	// Detect changes in cart item quantity
	displayedQuantityCart.addEventListener("change", () => {
		if (Number(displayedQuantityCart.value) === 0)
			displayedQuantityCart.value = 1;
		else if (!(Number(displayedQuantityCart.value) >= 0))
			displayedQuantityCart.value = 1;
		else if (Number.isNaN(Number(displayedQuantityCart.value)))
			displayedQuantityCart.value = 1;

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
	});

	//insert cloned template into cart
	document.querySelector(".cart-all-items").appendChild(clone);
}

// After loading Shopping Cart layout, load existing cart items (if any)
getLocalStorageContent();

if (cartItems.length > 0)
{
	for (let i = 0; i < cartItems.length; i++)
	{
		insertCartItem(cartItems[i].id, cartItems[i].category, cartItems[i].item, cartItems[i].size, cartItems[i].quantity);
	}
}


