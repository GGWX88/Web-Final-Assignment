/*------[Catalogue HTMLs]------*/
let template;
let clone;

// Fetch query string
const params = new URLSearchParams(window.location.search);
const categoryNum = params.get("category");

// Load page menu
template = document.getElementById("page-menu-template");
clone = template.content.cloneNode(true);
clone.querySelector(".current-page").innerText = categoryNames[categoryNum]; //product
clone.querySelector(".page-name").innerText = categoryNames[categoryNum]; //product
document.querySelector(".page-menu").appendChild(clone);


/*------[Cards]------*/
template = document.getElementById("card-template");

// Load product cards
for (let i = 0; i < productCategories[categoryNum].length; i++)
{
	clone = template.content.cloneNode(true);

	// Embed appropriate query strings
	clone.querySelector(".product-page").setAttribute("href", `product.html?category=${categoryNum}&item=${i}`); 

	// Set up product card
	clone.querySelector(".card-img").setAttribute("src", productCategories[categoryNum][i].image);
	clone.querySelector(".card-img").setAttribute("alt", productCategories[categoryNum][i].name);
	clone.querySelector(".card-img").setAttribute("title", productCategories[categoryNum][i].name);
	clone.querySelector(".card-title").innerHTML = productCategories[categoryNum][i].name;
	clone.querySelector(".card-price--value").innerHTML = productCategories[categoryNum][i].price;
	document.querySelector(".catalogue").appendChild(clone);
}


