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
	//remove button click
	$(".removeBtn").click(function(){
		var i = $(this).data("index")
		//find this element
		console.log(i);
		var found = false;
		$(".cartItem").each(function(index){

			if($(this).data("index") == i && !found){
				console.log(index);
				$(this).remove();
				cartList.splice(i,1);
				localStorage.setItem("cart",JSON.stringify(cartList));
				totalCart();
				found = true;
			}else if(found){
				var newIndex = (parseInt($(this).data("index"))-1).toString();
				$(this).data("index",newIndex);
				$(this).attr('data-index',newIndex);
				$(".removeBtn",this).data("index",newIndex);
				$(".removeBtn",this).attr('data-index',newIndex);
			}
		})
	});
	totalCart();
});

function totalCart(){
	var total = 0;
	for(var i = 0; i < cartList.length; i++){
		total += cartList[i].getPrice();
	}
	if(total != 0){
		if($("#totaller").length){
			$("#totaller").remove();
		}
		var totallerHTML = '<p id="totaller" class="title">Cart Total: £' + total.toLocaleString('en-UK', {
				minimumFractionDigits: 2
			}) + '</p>'
		$("#cartItems").prepend(totallerHTML);
	}else{
		if($("#totaller").length){
			$("#totaller").remove();
		}
	}
}

function populateCart() {
	var cart = $("#cart");
	for (var i = 0; i < cartList.length; i++) {
		var name = cartList[i].getName();
		var price = cartList[i].getPrice().toLocaleString('en-UK', {
			minimumFractionDigits: 2
		});
		var thumbnail = cartList[i].getThumbnailPath();
		var baseItemHTML = '<li class="cartItem" data-index="' + i + '"><div class="titleBar"><h3 class="itemName">' + name + '</h3>						<h3 class="itemPrice">£' + price + '</h3>					</div>					<div class= "detailSection">						<div class="imageDiv">					<img class="thumbnail" src="'+ thumbnail + '" align="center" />							</div>					<div class="upgrades">						<ul class="upgradeList">						</ul>				</div>						<div class="btnDiv">							<a href="#" class="removeBtn" data-index="' + i + '">Remove</a>						</div>						</div>				</li>'
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
