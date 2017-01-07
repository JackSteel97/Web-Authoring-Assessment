//script for the shopping cart page
//declare an empty global cart list variable
var cartList;

//when the document loads
$(document).ready(function ($) {
	//if the cart does not exist in localstorage
	if (localStorage.getItem("cart") == null) {
		//alert the user
		$("#cart").text("There are currently no items in your shopping cart.");
		//move footer to bottom of page
		$("#cart").css('margin-bottom', window.innerHeight + 'px');
	}else {
		//get the cart from local storage and parse from JSON string
		cartList = JSON.parse(localStorage.getItem("cart"));
		//loop through the cartList, one by one
		for (var i = 0; i < cartList.length; i++) {
			//map each object to a product object so we can use its methods
			cartList[i] = $.extend(new Product(), cartList[i]);
		}
		//if the cartList is still empty
		if (cartList.length == 0) {
			//alert the user
			$("#cart").text("There are currently no items in your shopping cart.");
			//move footer to bottom of page
			$("#cart").css('margin-bottom', window.innerHeight + 'px');
		}
	}
	//populate the cart
	populateCart();

	//remove button click listener
	$(".removeBtn").click(function(){
		//get the index from the data attribute
		var i = $(this).data("index")
		//find this element
		var found = false;
		//loop through all the cart items
		$(".cartItem").each(function(index){
			//if this item matches the index we were looking for and we haven't found it yet
			if($(this).data("index") == i && !found){
				//remove this item from HTML document
				$(this).remove();
				//remove this item from carList array
				cartList.splice(i,1);
				//update the cart in localstorage
				localStorage.setItem("cart",JSON.stringify(cartList));
				//calculate new cart total price
				totalCart();
				//set found flag
				found = true;
			}else if(found){
				//we need to move all the items after the deleted one up by one
				var newIndex = (parseInt($(this).data("index"))-1).toString();
				//set the new index for the cartItem, both for compatibility
				$(this).data("index",newIndex);
				$(this).attr('data-index',newIndex);
				//set the new index on the remove button of each item, both for compatibility
				$(".removeBtn",this).data("index",newIndex);
				$(".removeBtn",this).attr('data-index',newIndex);
			}
		})
	});
	//calculate cart total price
	totalCart();
});

function totalCart(){
	//initalise total price counter
	var total = 0;
	//loop through the cartList, one by one
	for(var i = 0; i < cartList.length; i++){
		//add the product price to total counter
		total += cartList[i].getPrice();
	}
	//if total is not 0
	if(total != 0){
		//remove previous total if there is one
		if($("#totaller").length){
			$("#totaller").remove();
		}
		//add new total to HTML document, with UK formatted number string price
		var totallerHTML = '<p id="totaller" class="title">Cart Total: £' + total.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}) + '</p>'
		$("#cartItems").prepend(totallerHTML);
	}else{
		//remove previous total if there is one and don't add new total (because its 0)
		if($("#totaller").length){
			$("#totaller").remove();
		}
	}
}

function populateCart() {
	//get the cart DOM element
	var cart = $("#cart");
	//loop through the cart list, one by one
	for (var i = 0; i < cartList.length; i++) {
		//get the name of this product object
		var name = cartList[i].getName();
		//get the price of this product object, formatted as UK number string
		var price = cartList[i].getPrice().toLocaleString('en-UK', {
			minimumFractionDigits: 2
		});
		//get the thumbnail of this product object
		var thumbnail = cartList[i].getThumbnailPath();
		//set up the HTML with the values from the product object
		var baseItemHTML = '<li class="cartItem" data-index="' + i + '"><div class="titleBar"><h3 class="itemName">' + name + '</h3>						<h3 class="itemPrice">£' + price + '</h3>					</div>					<div class= "detailSection">						<div class="imageDiv">					<img class="thumbnail" src="'+ thumbnail + '" align="center" />							</div>					<div class="upgrades">						<ul class="upgradeList">						</ul>				</div>						<div class="btnDiv">							<a href="#" class="removeBtn" data-index="' + i + '">Remove</a>						</div>						</div>				</li>'
		//add this to the HTML document
		cart.append(baseItemHTML);
		//get the upgrade list DOM element for this product
		var upgradeList = $(".upgradeList").eq(i);
		//get the upgrades for this product object
		var upgrades = cartList[i].getUpgrades();
		//declare HTML string for the upgrades
		var upgradeHTMLStr = "";
		//loop through the upgrade list, one by one
		for (var n = 0; n < upgrades.length; n++) {
			//map the upgrade properties to an Upgrade object so we can use its methods
			upgrades[n] = $.extend(new Upgrade(),upgrades[n]);
			//add to the upgrade HTML with the values for this upgrade
			upgradeHTMLStr += '<li><span class="leftPart">' + upgrades[n].getName() + ': ' + upgrades[n].getValue() + '</span><span class="centerPart">|</span><span class="rightPart">£' + upgrades[n].getPrice().toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}) + '</span></li>'
		}
		//add the upgrade string to the upgradeList DOM element
		upgradeList.append(upgradeHTMLStr);
	}
}
