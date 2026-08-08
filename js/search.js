/*------[Search]------*/
const toggleBtn = document.getElementById("search-toggle-btn");
const searchDropdown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Toggle search dropdown display
toggleBtn.addEventListener("click", () => {
	searchDropdown.classList.toggle("hidden");
	
	// Focus the input automatically when opened
	if (!searchDropdown.classList.contains("hidden")) {
		searchInput.focus();
		renderResults(searchInput.value.trim()); // Render initial items/message
	}
});

// Add event listener to the webpage
document.addEventListener("click", (event) => {
  const isClickInsideDropdown = searchDropdown.contains(event.target);
  const isClickOnToggleBtn = toggleBtn.contains(event.target);

  // close dropdown menu user clicks outside the menu
  if (!isClickInsideDropdown && !isClickOnToggleBtn) {
    searchDropdown.classList.add("hidden");
  }
});

// Filter products as you type
searchInput.addEventListener("input", (inputEvent) => {
	const query = inputEvent.target.value.trim().toLowerCase();
	renderResults(query);
});

// Load relevant products
function renderResults(query)
{
	// Clear existing products
	searchResults.innerHTML = ""; 

	// Displays when input is empty
	if (query === "")
	{
		searchResults.innerHTML = `<div class="no-results">Type to search products...</div>`;
		return;
	}

	let matchesFound = 0;

	// Go through all categories
	productCategories.forEach((categoryArray, categoryIndex) => {
		
		// Go through each product within the category
		categoryArray.forEach((product, itemIndex) => {
			// Checks if product name matches the search query, not case-sensitive
			if (product.name.toLowerCase().includes(query))
			{
				matchesFound++;

				// Load product details and the link to the product page
				const productCard = document.createElement("a");
				productCard.className = "product-item";
				productCard.href = `product.html?category=${categoryIndex}&item=${itemIndex}`;
				productCard.innerHTML = `
					<img src="${product.image}" alt="${product.name}" class="product-thumb" />
					<div class="product-info">
						<span class="product-name">${product.name}</span>
						<span class="product-price">RM ${product.price}</span>
					</div>
				`;

				// Append to the dropdown menu
				searchResults.appendChild(productCard);
			}
		});
	});

	// If no matches found
	if (matchesFound === 0)
	{
		searchResults.innerHTML = `<div class="no-results">No products found</div>`;
	}
}
