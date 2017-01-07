//declare an index counter and set to 0
var currentIndex = 0;
//declare a global variable for holding the featured products
var prods;

//when the document loads
$(document).ready(function ($) {
	//get the featured products
	prods = initaliseProducts();
	//start the slideshow and change every 15 seconds
	startSlideshow();
	setInterval(startSlideshow, 15000);
	//set a click listener on the slideshow
	$("#slideshowContainer").click(function (event) {
		//get the currently displayed product and add to localstorage before moving to the product detail page
		localStorage.setItem("currentProduct", JSON.stringify(prods[currentIndex-1]));
		window.location.href = "productdetail.html";
	})
});

function startSlideshow() {
	//get the product to be displayed
	var currentProd = prods[currentIndex];
	//remove the previous product if it exists
	$("#slideshowContainer canvas").remove();
	//setup the new product
	var display3D = new Vehicle3D(document.getElementById("slideshowContainer"), currentProd, true, 10, 4, 0, true);
	display3D.setPainting(false);
	//increment the index counter
	currentIndex++;
	//loop the counter back to start if it exceeds the max product index
	if (currentIndex > prods.length - 1) {
		currentIndex = 0;
	}
}

function initaliseProducts() {
	var Products = [];
	//aventador
	Products.push(new Product("Lamborghini Aventador", "Forget the idea of performance you are used to. The Aventador Coupé has been engineered to revolutionize this concept and establish a new benchmark in the segment of super sports cars and beyond. This car aims to bring the future forward. This is a true supercar legend in the making, which combines the tradition of the Lamborghini brand with a level of innovation which takes the House of the Raging Bull to hitherto unexplored territory.", 225000.00, "Images/thumbnails/products/Aventador.png", "Models/Aventador/", "Avent.obj", "Avent.mtl", 0));
	//Boeing 787
	Products.push(new Product("Boeing 787-8", "The Boeing 787-8 is a mid-size, dual aisle, twin engine jet manufactured by Boeing, the American aerospace company. The aircraft is 20% more fuel efficient than similar sized commercial jets it is designed to replace, and to date, is Boeing's most fuel efficient aircraft. Composite materials make up 50 percent of the primary structure, including the fuselage and wing. The engine nacelles are made of serrated edges that reduce the noise levels both outside and inside the cabin, by up to 60%. The aircraft also features raked wingtip to further improve the fuel efficiency. The windows are more than 30 percent larger than those on most similarly sized airplanes. Instead of pulling shades up and down, customers can adjust the brightness of windows with a button. Using an electrochromic dimming system, the windows turn from fully transparent to completely dimmed in gradual steps.", 250000000, "Images/thumbnails/products/Boeing787.png", "Models/Boeing787/", "Boeing_787_8.obj", "Boeing_787_8.mtl", 1));
	//M1A2 Abrams Tank
	Products.push(new Product("M1A2 Abrams Tank", "The M1 Abrams is an American third-generation main battle tank. It is named after General Creighton Abrams, former Army chief of staff and commander of United States military forces in the Vietnam War from 1968 to 1972. Highly mobile, designed for modern armored ground warfare, the M1 is well armed and heavily armored. Notable features include the use of a powerful multifuel turbine engine, the adoption of sophisticated composite armor, and separate ammunition storage in a blow-out compartment for crew safety. Weighing nearly 68 short tons (almost 62 metric tons), it is one of the heaviest main battle tanks in service.", 8000000, "Images/thumbnails/products/M1A2.png", "Models/M1A2/", "Abrams_BF3.obj", "Abrams_BF3.mtl", 0));
	return Products;
}
