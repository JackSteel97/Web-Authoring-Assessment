function Upgrade(aName, aPrice, aValue){
	this.name = aName;
	this.price = aPrice;
	this.value = aValue;
	}

Upgrade.prototype = {

	constructor: Upgrade,

	getName:function(){
		return this.name;
	},
	getPrice:function(){
		return this.price;
	},
	getValue:function(){
		return this.value;
	},
	setPrice:function(aPrice){
		this.price = aPrice;
	},
	setValue:function(aValue){
		this.value = aValue;
	}
}
