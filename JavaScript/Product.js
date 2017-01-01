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
	, setPrice: function (aPrice) {
		this.price = aPrice;
	}
	, calculateNewPrice: function () {
		var newPrice = this.basePrice;
		for (var i = 0; i < this.upgrades.length; i++) {

			console.log(this.upgrades[i].getPrice());
			newPrice += this.upgrades[i].getPrice();

		}
		this.price = newPrice;
	}
	, addUpgrade: function (upgradeName, upgradePrice, upgradeValue) {
		for (var i = 0; i < this.upgrades.length; i++) {
			if (this.upgrades[i].getName().toString().toLowerCase() == upgradeName.toString().toLowerCase()) {
				this.upgrades[i].setPrice(upgradePrice);
				this.upgrades[i].setValue(upgradeValue);
				return;
			}
		}
		this.upgrades.push(new Upgrade(upgradeName, upgradePrice, upgradeValue));
	}
}
