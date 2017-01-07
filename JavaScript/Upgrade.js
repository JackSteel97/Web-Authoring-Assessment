//class for an upgrade, to be used in conjuction with the Product class
//delcare constructor for this class
function Upgrade(aName, aPrice, aValue) {
	//set properties
	this.name = aName;
	this.price = aPrice;
	this.value = aValue;
}
//declare class as object literal
Upgrade.prototype = {
	//set methods
	constructor: Upgrade
	, getName: function () {
		return this.name;
	}
	, getPrice: function () {
		return this.price;
	}
	, getValue: function () {
		return this.value;
	}
	, setPrice: function (aPrice) {
		this.price = aPrice;
	}
	, setValue: function (aValue) {
		this.value = aValue;
	}
}
