//script for the product details page
//declare a global products variable
var product;
//when the documet is loaded
$(document).ready(function ($) {
	//check if the product exists in localstorage
	if (localStorage.getItem("currentProduct") == null) {
		//no product has been selected yet, you should not be on this page
		alert("Error: No product selected. Redirecting to homepage");
		window.location.href = "index.html";
		return;
	}

	//get JSON object from storage and map it's attributes to a new product object so it can be used as needed.
	product = $.extend(new Product(), JSON.parse(localStorage.getItem("currentProduct")));
	//set the starting values
	var startDistance = 10;
	var startHeight = 5;
	var rotationNeeded = 0;
	//set the product name
	$("#prodName").text(product.getName());
	//set the product base price, formatted to UK number string
	$("#prodBasePrice").text("£" + product.getBasePrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
	//set the product description
	$("#prodDescription").text(product.getDescription());
	//set the product total price, formatted to UK number string
	$("#totalPrice").text("£" + product.getPrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
	//switch statement for the product name to execute specific code for each product
	switch (product.getName()) {
		case "Lamborghini Aventador":
			startDistance = 3.6;
			startHeight = 2;
			populateUpgradesForAventador();
			break;
		case "UH-60 Blackhawk":
			startDistance = 15;
			startHeight = 3;
			rotationNeeded = -Math.PI / 2;
			populateUpgradesForBlackhawk();
			break;
		case "Boeing 787-8":
			startDistance = 3.5;
			startHeight = 1;
			populateUpgradesForBoeing787();
			break;
		case "M1A2 Abrams Tank":
			startDistance = 10;
			startHeight = 5;
			populateUpgradesForAbrams();
			break;
		case "Row Boat":
			startDistance = 26;
			startHeight = 13;
			//the row boat has no customisation options other than painting
			break;
		case "Yacht":
			startDistance = 1060;
			startHeight = 325;
			populateUpgradesForYacht();
			break;
	}
	//instantiate a new vehicle 3D object for handling the 3D render of this product
	var vehicle3DHandler = new Vehicle3D(document.getElementById("Container3D"), product, true, startDistance, startHeight, rotationNeeded);
	//set up a listener for the colour picker changing value
	$("#colourPicker").change(function (event) {
		//change the paint colour to the selected value
		vehicle3DHandler.setPaintColour(this.value);
	});
	//set up a lstener for the 'add to cart' button being clicked
	$(".cartBtn").click(function (event) {
		//create an image from the current 3D display and store in Base 64
		product.thumbnailPath = $("#Container3D canvas")[0].toDataURL();
		//call add product to cart
		addProductToCart();
	});
});

function addProductToCart() {
	//check if the cart actually exists in local storage yet
	if (localStorage.getItem("cart") == null) {
		//if it doesn't then
		//create an array for the cart items
		var cartList = [];
		//add the product to the cart list
		cartList.push(product);
		//JSONify the array and store in localstorage
		localStorage.setItem("cart", JSON.stringify(cartList));
	}else {
		//if it does then
		//get the current cart from localstorage and parse from JSON format
		var cartList = JSON.parse(localStorage.getItem("cart"));
		//loop through the retrieved cart list and map each item to a product object
		for (var i = 0; i < cartList.length; i++) {
			cartList[i] = $.extend(new Product(), cartList[i]);
		}
		//add the product to the cart list
		cartList.push(product);
		//JSONify the array and store in localstorage
		localStorage.setItem("cart", JSON.stringify(cartList));
	}
	//remove the current product
	localStorage.setItem("currentProduct", null);
	moveToShoppingCart();
}

function moveToShoppingCart() {
	//set the current page to the shopping cart
	window.location.href = "shoppingcart.html";
}

function populateUpgradesForAventador() {
	//declare the specific HTML for this product. This html string was first built by hardcoding it to the HTML document and then copied here to allow for dynamic addition of different html, without having to hide and show several different sections each time.
	var specificHtml = '<li> <label for="armourUpgrade"><b>Armour</b></label> <div id="armourUpgrade" class="upgradeSection"> <input type="radio" name="armour" value="None" data-price="0" checked /> None&emsp; <input type="radio" name="armour" value="Light" data-price="15000" /> Light&emsp; <input type="radio" name="armour" value="Medium" data-price="25000" /> Medium&emsp; <input type="radio" name="armour" value="Heavy" data-price="50000" /> Heavy&emsp; </div> </li> <li> <label for="brakeUpgrade"><b>Brakes</b></label> <div id="brakeUpgrade" > <input type="radio" name="brakes" value="Stock" data-price="0" checked /> Stock&emsp; <input type="radio" name="brakes" value="Street" data-price="5000" /> Street&emsp; <input type="radio" name="brakes" value="Sport" data-price="7500" /> Sport&emsp; <input type="radio" name="brakes" value="Race" data-price="10000" /> Race&emsp; </div> </li> <li> <label for="engineUpgrade"><b>Engine</b></label> <div id="engineUpgrade" > <input type="radio" name="engine" value="V6" data-price="0" checked /> V6&emsp; <input type="radio" name="engine" value="V8" data-price="14999.99" /> V8&emsp; <input type="radio" name="engine" value="V10" data-price="39999.99" /> V10&emsp; <input type="radio" name="engine" value="V12" data-price="79999.99" /> V12&emsp; </div> </li> <li> <label for="turboUpgrade"><b>Turbo</b></label> <div id="turboUpgrade"> <input type="checkbox" name="turbo" value="Turbo Charged" data-price="100000" /> Turbo Charged&emsp; </div> </li>'
	//add the html for aventador
	$("#configurator").append(specificHtml);
	//armour
	$('#armourUpgrade input:radio').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "None") {
			removeFromPartsList("armour");
			removeUpgradeFromProduct("Armour");
		}
		else {
			addToPartsList("armour", value + " Armour", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Armour", cost, value);
		}
		updateTotalPrice();
	});
	//brakes
	$('#brakeUpgrade input:radio').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "Stock") {
			removeFromPartsList("brakes");
			removeUpgradeFromProduct("Armour");
		}
		else {
			addToPartsList("brakes", value + " Brakes", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Brakes", cost, value);
		}
		updateTotalPrice();
	});
	//engine
	$('#engineUpgrade input:radio').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "V6") {
			removeFromPartsList("engine");
			removeUpgradeFromProduct("Engine");
		}
		else {
			addToPartsList("engine", value + " Engine", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Engine", cost, value);
		}
		updateTotalPrice();
	});
	//turbo
	$('#turboUpgrade input:checkbox').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		//since this is a checkbox we have to check the state of the checkbox instead of the value
		if (!$(this).prop('checked')) {
			removeFromPartsList("turbo");
			removeUpgradeFromProduct("Turbo");
		}
		else {
			addToPartsList("turbo", value, "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Turbo", cost, "Yes");
		}
		updateTotalPrice();
	});
}

function populateUpgradesForBlackhawk() {
	//declare the specific HTML for this product. This html string was first built by hardcoding it to the HTML document and then copied here to allow for dynamic addition of different html, without having to hide and show several different sections each time.
	var specificHTML = '<li> <label for="miniguns"><b>Miniguns: </b></label> <div id="miniguns"> <input type="radio" name="miniguns" value="None" data-price="0" checked>None&emsp;<br /> <input type="radio" name="miniguns" value="1x M134 7.62mm 6-barreled minigun" data-price="50000" >1x M134 7.62mm 6-barreled minigun&emsp; <br /><input type="radio" name="miniguns" value="2x M134 7.62mm 6-barreled minigun" data-price="95000" >2x M134 7.62mm 6-barreled minigun&emsp; </div> </li>';
	$("#configurator").append(specificHTML);
	//miniguns
	$('#miniguns input:radio').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "None") {
			removeFromPartsList("miniguns");
			removeUpgradeFromProduct("Miniguns");
		}
		else {
			addToPartsList("miniguns", value, "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Miniguns", cost, value);
		}
		updateTotalPrice();
	});
}

function populateUpgradesForBoeing787() {
	//declare the specific HTML for this product. This html string was first built by hardcoding it to the HTML document and then copied here to allow for dynamic addition of different html, without having to hide and show several different sections each time.
	var specificHTML = '<li> <label for="interiorUpgrade"><b>Interior:</b></label> <div id="interiorUpgrade"> <input type = "radio" name="interior" value = "Standard" data-price="0" checked/> Standard<br/> <input type = "radio" name="interior" value = "Private Jet Retrofit" data-price="15000000"/> Private Jet Retrofit </div> </li>';
	$("#configurator").append(specificHTML);
	//interior
	$('#interiorUpgrade input:radio').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "Standard") {
			removeFromPartsList("interior");
			removeUpgradeFromProduct("Interior");
		}
		else {
			addToPartsList("interior", value + " Interior", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Interior", cost, value);
		}
		updateTotalPrice();
	});
}

function populateUpgradesForAbrams() {
	//declare the specific HTML for this product. This html string was first built by hardcoding it to the HTML document and then copied here to allow for dynamic addition of different html, without having to hide and show several different sections each time.
	var specificHTML = '<li> <label for="enginePower"><b>Engine Power:</b></label> <div id="enginePower"> <input type="range" min="1500" max="2500" value="1500" data-price="5000"/> <span id="val">1500 hp</span> </div> </li> <li> <label for="reactiveArmour"><b>Reactive Armour:</b></label> <div id="reactiveArmour"> <input type="checkbox" name="reactiveArmour" value="Reactive Armour Plates" data-price="3000000" /> Reactive Armour Plates&emsp; </div> </li> <li> <label for="missileCountermeasures"><b>Missile Countermeasures:</b></label> <div id="missileCountermeasures"> <input type="checkbox" name="missileCountermeasures" value="Missile Countermeasures" data-price="1500000" /> Missile Countermeasures&emsp; </div> </li> <li> <label for="depletedUrainiumArmour"><b>Depleted Urainium Armour:</b></label> <div id="depletedUrainiumArmour"> <input type="checkbox" name="depletedUrainiumArmour" value="Depleted Urainium Armour" data-price="750000" /> Depleted Urainium Armour&emsp; </div> </li> ';
	//add the html for abrams tank
	$("#configurator").append(specificHTML);
	//engine
	$('#enginePower input').on('input', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price") * (value - 1500);
		$("#enginePower #val").text(value + " hp");
		if (value == 1500) {
			removeFromPartsList("enginePower");
			removeUpgradeFromProduct("Engine Power");
		}
		else {
			addToPartsList("enginePower", value + " hp", "£" + (cost).toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Engine Power", cost, value + "hp");
		}
		updateTotalPrice();
	});
	//reactiveArmour
	$('#reactiveArmour input:checkbox').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		//since this is a checkbox we have to check the state of the checkbox instead of the value
		if (!$(this).prop('checked')) {
			removeFromPartsList("reactiveArmour");
			removeUpgradeFromProduct("Reactive Armour Plates")
		}
		else {
			addToPartsList("reactiveArmour", value, "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Reactive Armour Plates", cost, "Yes");
		}
		updateTotalPrice();
	});
	//missileCountermeasures
	$('#missileCountermeasures input:checkbox').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		//since this is a checkbox we have to check the state of the checkbox instead of the value
		if (!$(this).prop('checked')) {
			removeFromPartsList("missileCountermeasures");
			removeUpgradeFromProduct("Missile Countermeasures")
		}
		else {
			addToPartsList("missileCountermeasures", value, "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Missile Countermeasures", cost, "Yes");
		}
		updateTotalPrice();
	});
	//depletedUrainiumArmour
	$('#depletedUrainiumArmour input:checkbox').on('change', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		var cost = $(this).data("price");
		//since this is a checkbox we have to check the state of the checkbox instead of the value
		if (!$(this).prop('checked')) {
			removeFromPartsList("depletedUrainiumArmour");
			removeUpgradeFromProduct("Depleted Urainium Armour")
		}
		else {
			addToPartsList("depletedUrainiumArmour", value, "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Depleted Urainium Armour", cost, "Yes");
		}
		updateTotalPrice();
	});
}

function populateUpgradesForYacht() {
	//declare the specific HTML for this product. This html string was first built by hardcoding it to the HTML document and then copied here to allow for dynamic addition of different html, without having to hide and show several different sections each time.
	var specificHTML = '<li> <label for="boatName"><b>Engraved Name: </b></label> <div id="boatName"> <input type="text" value="" data-price="4950"/> </div> </li>';
	$("#configurator").append(specificHTML);
	//name
	$('#boatName input:text').on('input', function () {
		//get the value and price from the html attributes
		var value = $(this).val();
		//it costs the base price plus 50 for each character
		var cost = $(this).data("price") + ((value.length) * 50)
		if (value.length == 0) {
			removeFromPartsList("name");
			removeUpgradeFromProduct("Engraved Name")
		}
		else {
			addToPartsList("name", 'Name: "' + value + '"', "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
			applyUpgradeToProduct("Engraved Name", cost, '"' + value + '"');
		}
		updateTotalPrice();
	});
}

function addToPartsList(id, leftPartText, rightPartText) {
	var selector = "#partsList #" + id;
	//check if the element exists
	if ($(selector).length) {
		//it does exist so we actually want to modify it instead
		$(selector + " .leftPart").text(leftPartText);
		$(selector + " .rightPart").text(rightPartText);
	}
	else {
		//it doesn't exist so we need to add it
		var partsList = $("#partsList");
		var itemToAdd = '<li id="' + id + '"><span class="leftPart">' + leftPartText + '</span><span class="rightPart">' + rightPartText + '</span></li>'
		//add the HTML
		partsList.append(itemToAdd);
	}
}

function removeFromPartsList(id) {
	$("#partsList #" + id).remove();
}

function applyUpgradeToProduct(name, price, value) {
	//add the upgrade and calculate the new price
	product.addUpgrade(name, price, value);
	product.calculateNewPrice();
}

function removeUpgradeFromProduct(name) {
	//remove the upgrade and calculate the new price
	product.removeUpgrade(name);
	product.calculateNewPrice();
}

function updateTotalPrice() {
	//update the price shown as text, formatted to UK number string
	$("#totalPrice").text("£" + product.getPrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
}
