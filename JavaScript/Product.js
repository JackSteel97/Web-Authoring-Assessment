function Product(aName, aDescription, aPrice, aThumbnailPath, aBasePath, aObjFile, aMtlFile){
	this.name = aName;
	this.description = aDescription;
	this.basePrice = aPrice;
	this.price = aPrice;
	this.thumbnailPath = aThumbnailPath;
	this.basePath = aBasePath;
	this.objFile = aObjFile;
	this.mtlFile = aMtlFile;
	this.upgrades = [];
}

Product.prototype = {
	constructor: Product,

	getName:function(){
		return this.name;
	},
	getDescription:function(){
		return this.description;
	},
	getPrice:function(){
		return this.price;
	},
	getThumbnailPath:function(){
		return this.thumbnailPath;
	},
	getBasePath:function(){
		return this.basePath;
	},
	getObjFile:function(){
		return this.objFile;
	},
	getMtlFile:function(){
		return this.mtlFile;
	},
	getBasePrice:function(){
		return this.basePrice;
	},
	setPrice:function(aPrice){
		this.price = aPrice;
	},
	calculateNewPrice:function(){
		upgrades.forEach(function(element){
			this.price += element.getPrice();
		})
	},
	addUpgrade:function(upgradeName, upgradePrice, upgradeValue){
		var alteration = new Upgrade(upgradeName,upgradePrice,upgradeValue);
		this.upgrades.push(alteration);
	},

}
