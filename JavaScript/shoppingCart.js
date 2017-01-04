var cartList;
$(document).ready(function ($) {
	if (localStorage.getItem("cart") == null) {
		$("#cart").text("There are currently no items in your shopping cart.");
		$("#cart").css('margin-bottom', window.innerHeight + 'px');
	}
	else {
		cartList = JSON.parse(localStorage.getItem("cart"));
		for (var i = 0; i < cartList.length; i++) {
			cartList[i] = $.extend(new Product(), cartList[i]);
		}
		if (cartList.length == 0) {
			$("#cart").text("There are currently no items in your shopping cart.");
			$("#cart").css('margin-bottom', window.innerHeight + 'px');
		}
	}
	populateCart();
});

function populateCart() {
	var cart = $("#cart");
	for (var i = 0; i < cartList.length; i++) {
		var name = cartList[i].getName();
		var price = cartList[i].getPrice().toLocaleString('en-UK', {
			minimumFractionDigits: 2
		});
		var thumbnail = cartList[i].getThumbnailPath();
		var baseItemHTML = '<li class="cartItem" data-index="' + i + '"><div class="titleBar"><h3 class="itemName">' + name + '</h3>						<h3 class="itemPrice">£' + price + '</h3>					</div>					<div class= "detailSection">						<div class="imageDiv">					<img class="thumbnail" src="'+ thumbnail + '" align="center" />							</div>					<div class="upgrades">						<ul class="upgradeList">						</ul>				</div>						<div class="btnDiv">							<a href="#" class="removeBtn">Remove</a>						</div>						</div>				</li>'
		cart.append(baseItemHTML);

		var upgradeList = $(".upgradeList").eq(i);
		var upgrades = cartList[i].getUpgrades();

		var upgradeHTMLStr = "";
		for (var n = 0; n < upgrades.length; n++) {
			upgrades[n] = $.extend(new Upgrade(),upgrades[n]);
			upgradeHTMLStr += '<li><span class="leftPart">' + upgrades[n].getName() + ': ' + upgrades[n].getValue() + '</span><span class="centerPart">|</span><span class="rightPart">£' + upgrades[n].getPrice().toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}) + '</span></li>'
		}
		upgradeList.append(upgradeHTMLStr);
	}
}
