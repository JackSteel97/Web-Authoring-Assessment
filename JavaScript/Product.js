//This is a class for storing and manipulating the data relating to each product easily
//setup the constructor for this class
function Product(aName, aDescription, aPrice, aThumbnailPath, aBasePath, aObjFile, aMtlFile, aType) {
	this.name = aName;
	this.description = aDescription;
	this.basePrice = aPrice;
	this.price = aPrice;
	this.thumbnailPath = aThumbnailPath;
	this.basePath = aBasePath;
	this.objFile = aObjFile;
	this.mtlFile = aMtlFile;
	//0 = land, 1 = air, 2 = sea
	this.type = aType
	this.upgrades = [];
}
//assign the methods in object literal
Product.prototype = {
	constructor: Product
	, getName: function () {
		return this.name;
	}
	, getType: function () {
		return this.type;
	}
	, getDescription: function () {
		return this.description;
	}
	, getPrice: function () {
		return this.price;
	}
	, getThumbnailPath: function () {
		return this.thumbnailPath;
	}
	, getBasePath: function () {
		return this.basePath;
	}
	, getObjFile: function () {
		return this.objFile;
	}
	, getMtlFile: function () {
		return this.mtlFile;
	}
	, getBasePrice: function () {
		return this.basePrice;
	}
	, getUpgrades: function () {
		return this.upgrades;
	}
	, setPrice: function (aPrice) {
		this.price = aPrice;
	}
	, calculateNewPrice: function () {
		//start the price at the base price
		var newPrice = this.basePrice;
		//loop through the upgrades, one by one
		for (var i = 0; i < this.upgrades.length; i++) {
			//add the upgrade price to the total price
			newPrice += this.upgrades[i].getPrice();
		}
		//set the calculated price
		this.price = newPrice;
	}
	, addUpgrade: function (upgradeName, upgradePrice, upgradeValue) {
		//loop through the upgrades, one by one
		for (var i = 0; i < this.upgrades.length; i++) {
			//if the upgrade has the same name as the upgrade we are trying to add then it just needs altering
			if (this.upgrades[i].getName().toString().toLowerCase() == upgradeName.toString().toLowerCase()) {
				//update the values and then return
				this.upgrades[i].setPrice(upgradePrice);
				this.upgrades[i].setValue(upgradeValue);
				return;
			}
		}
		//if the upgrade didn't exist in our search above, then add it from scratch
		this.upgrades.push(new Upgrade(upgradeName, upgradePrice, upgradeValue));
	}
	, removeUpgrade: function (upgradeName) {
		//loop through the upgrades, one by one
		for (var i = 0; i < this.upgrades.length; i++) {
			//if this upgrade matches the specified name
			if (this.upgrades[i].getName().toString().toLowerCase() == upgradeName.toString().toLowerCase()) {
				//remove it from the array and return
				this.upgrades.splice(i, 1);
				return;
			}
		}
	}
}
