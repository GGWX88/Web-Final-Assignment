/*------[Featured Products]------*/
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
