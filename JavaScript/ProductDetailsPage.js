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
