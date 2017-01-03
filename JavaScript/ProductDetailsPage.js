var product;
$(document).ready(function ($) {
	if (localStorage.getItem("currentProduct") == null) {
		//no product has been selected yet, you should not be on this page
		alert("Error: No product selected. Redirecting to homepage");
		window.location.href = "index.html";
		return;
	}
	$("#loadingDisplay").css({
		opacity: 1
	});
	//get JSON object from storage and map it's attributes to a new product object so it can be used as needed.
	product = $.extend(new Product(), JSON.parse(localStorage.getItem("currentProduct")));
	console.log(product);
	var startDistance = 10;
	var startHeight = 5;
	var rotationNeeded = 0;
	$("#prodName").text(product.getName());
	$("#prodBasePrice").text("£" + product.getBasePrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
	$("#prodDescription").text(product.getDescription());
	$("#totalPrice").text("£" + product.getPrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
	switch (product.getName()) {
	case "Lamborghini Aventador":
		startDistance = 10;
		startHeight = 5;
		populateUpgradesForAventador();
		break;
	case "UH-60 Blackhawk":
		startDistance = 25;
		startHeight = 5;
		rotationNeeded = -Math.PI / 2;
		populateUpgradesForBlackhawk();
		break;
	case "Boeing 787-8":
		startDistance = 5;
		startHeight = 5;
		populateUpgradesForBoeing787();
		break;
	case "M1A2 Abrams Tank":
		startDistance = 10;
		startHeight = 5;
		populateUpgradesForAbrams();
		break;
	case "Row Boat":
		startDistance = 30;
		startHeight = 15;
		populateUpgradesForRowBoat();
		break;
	case "Yacht":
		startDistance = 500;
		startHeight = 400;
		populateUpgradesForYacht();
		break;
	}
	var vehicle3DHandler = new Vehicle3D(document.getElementById("Container3D"), product, true, startDistance, startHeight, rotationNeeded);
	$("#colourPicker").change(function (event) {
		console.log(this.value);
		vehicle3DHandler.setPaintColour(this.value);
	})
});

function populateUpgradesForAventador() {
	var specificHtml = '<li> <label for="armourUpgrade"><b>Armour</b></label> <div id="armourUpgrade" class="upgradeSection"> <input type="radio" name="armour" value="None" data-price="0" checked /> None&emsp; <input type="radio" name="armour" value="Light" data-price="15000" /> Light&emsp; <input type="radio" name="armour" value="Medium" data-price="25000" /> Medium&emsp; <input type="radio" name="armour" value="Heavy" data-price="50000" /> Heavy&emsp; </div> </li> <li> <label for="brakeUpgrade"><b>Brakes</b></label> <div id="brakeUpgrade" > <input type="radio" name="brakes" value="Stock" data-price="0" checked /> Stock&emsp; <input type="radio" name="brakes" value="Street" data-price="5000" /> Street&emsp; <input type="radio" name="brakes" value="Sport" data-price="7500" /> Sport&emsp; <input type="radio" name="brakes" value="Race" data-price="10000" /> Race&emsp; </div> </li> <li> <label for="engineUpgrade"><b>Brakes</b></label> <div id="engineUpgrade" > <input type="radio" name="engine" value="V6" data-price="0" checked /> V6&emsp; <input type="radio" name="engine" value="V8" data-price="14999.99" /> V8&emsp; <input type="radio" name="engine" value="V10" data-price="39999.99" /> V10&emsp; <input type="radio" name="engine" value="V12" data-price="79999.99" /> V12&emsp; </div> </li> <li> <label for="turboUpgrade"><b>Turbo</b></label> <div id="turboUpgrade"> <input type="checkbox" name="turbo" value="Turbo Charged" data-price="100000" /> Turbo Charged&emsp; </div> </li>'

	//add the html for aventador
	$("#configurator li").append(specificHtml);


		//armour
	$('#armourUpgrade input:radio').on('change', function () {
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "None") {
			removeFromPartsList("armour");
		}
		else {
			addToPartsList("armour", value + " Armour", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
		}
		applyUpgradeToProduct("Armour", cost, value);
		updateTotalPrice();
	});
	//brakes
	$('#brakeUpgrade input:radio').on('change', function () {
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "Stock") {
			removeFromPartsList("brakes");
		}
		else {
			addToPartsList("brakes", value + " Brakes", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
		}
		applyUpgradeToProduct("Brakes", cost, value);
		updateTotalPrice();
	});
	//engine
	$('#engineUpgrade input:radio').on('change', function () {
		var value = $(this).val();
		var cost = $(this).data("price");
		if (value == "V6") {
			removeFromPartsList("engine");
		}
		else {
			addToPartsList("engine", value + " Engine", "£" + cost.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}));
		}
		applyUpgradeToProduct("Engine", cost, value);
		updateTotalPrice();
	});
	//turbo
	$('#turboUpgrade input:checkbox').on('change', function () {
		var value = $(this).val();
		var cost = $(this).data("price");
		if (!$(this).prop('checked')) {
			removeFromPartsList("turbo");
			applyUpgradeToProduct("Turbo", 0, "No");
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

function populateUpgradesForBlackhawk() {}

function populateUpgradesForBoeing787() {}

function populateUpgradesForAbrams() {}

function populateUpgradesForRowBoat() {}

function populateUpgradesForYacht() {}

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
		partsList.append(itemToAdd);
	}
}

function removeFromPartsList(id) {
	$("#partsList #" + id).remove();
}

function applyUpgradeToProduct(name, price, value) {
	product.addUpgrade(name, price, value);
	product.calculateNewPrice();
}

function updateTotalPrice() {
	$("#totalPrice").text("£" + product.getPrice().toLocaleString('en-UK', {
		minimumFractionDigits: 2
	}));
}
