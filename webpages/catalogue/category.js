/*----------[Catalogue HTMLs]---------*/
//general shared variables
let template;
let clone;

// product categories
// men top
// men bottom
// men outerwear
// women top
// women bottom
// women dress
// women skirt


//-----fetch query string------
const params = new URLSearchParams(window.location.search);
const categoryNum = params.get("category");

//-----load page menu-----
template = document.getElementById("page-menu-template");
clone = template.content.cloneNode(true);
clone.querySelector(".current-page").innerText = categoryNames[categoryNum]; //product
clone.querySelector(".page-name").innerText = categoryNames[categoryNum]; //product
document.querySelector(".page-menu").appendChild(clone);

//------cards------
// product list for each category


template = document.getElementById("card-template");

for (let i = 0; i < productCategories[categoryNum].length; i++) //product
{
	clone = template.content.cloneNode(true);
	clone.querySelector(".product-page").setAttribute("href", `product.html?category=${categoryNum}&item=${i}`); //query string //product
	clone.querySelector(".card-img").setAttribute("src", productCategories[categoryNum][i].image); //product
	clone.querySelector(".card-img").setAttribute("alt", productCategories[categoryNum][i].name); //product
	clone.querySelector(".card-img").setAttribute("title", productCategories[categoryNum][i].name); //product
	clone.querySelector(".card-title").innerHTML = productCategories[categoryNum][i].name; //product
	clone.querySelector(".card-price--value").innerHTML = productCategories[categoryNum][i].price; //product
	document.querySelector(".catalogue").appendChild(clone);
}


