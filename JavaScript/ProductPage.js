//script for the product category pages
//when the documnt loads
$(document).ready(function ($) {
	//delcare a variable and initalise the products array to it
    var prodArr = init();
	//declare the typeSelector variable
    var typeSelector = 0;
	//use a switch statement to determine the type of products to display
    switch (CURRENT_PAGE) {
		case "air":
			typeSelector = 1;
			break;
		case "sea":
			typeSelector = 2;
			break;
		case "land":
			typeSelector = 0;
			break;
    }
	//loop through the array of products, one by one
    for (var i = 0; i < prodArr.length; i++) {
		//if the product type matches the type selector
        if (prodArr[i].getType() == typeSelector) {
            //belongs on this page
            addProductToGrid(prodArr[i], i);
        }
    }
	//add click listener for each product item
    $(".productContainer").click(function (event) {
        onProductGridItemClick(prodArr, $(this));
    });
});

function openProductPage() {
	//change the window location to the product detail page
	window.location.href = "productdetail.html";
}

function onProductGridItemClick(prodArr, element) {
	//get the index from the html data attribute
    var index = element.data("index");
	//get the product using that index from the array
    var thisProduct = prodArr[index];
	//JSONify the product object and store in localstorage
    localStorage.setItem("currentProduct", JSON.stringify(thisProduct));
	//move to the product detail page
    openProductPage();
}

function addProductToGrid(prod, index) {
	//HTML for a product grid item, add all the variables in their correct location
    var prodAsHTMLItem = '<li><div data-index="' + index + '" class="productContainer"><a><img src="' + prod.getThumbnailPath() + '" class="productThumb"/><span class="imgOverlayText"><span>Click To Customise!</span></span></a><div class="productDescriptor"><p class="productTitle">' + prod.getName() + '</p><p class="productPrice">£' + prod.getBasePrice().toLocaleString('en-UK',{minimumFractionDigits: 2}) + '</p></div></div></li>';
	//add the HTML to the unordered list
    $("#productSection ul").append(prodAsHTMLItem);
}

function init() {
    var Products = [];
    //aventador
    Products.push(new Product("Lamborghini Aventador", "Forget the idea of performance you are used to. The Aventador Coupé has been engineered to revolutionize this concept and establish a new benchmark in the segment of super sports cars and beyond. This car aims to bring the future forward. This is a true supercar legend in the making, which combines the tradition of the Lamborghini brand with a level of innovation which takes the House of the Raging Bull to hitherto unexplored territory.", 225000.00, "Images/thumbnails/products/Aventador.png", "Models/Aventador/", "Avent.obj", "Avent.mtl", 0));
    //blackhawk
    Products.push(new Product("UH-60 Blackhawk", "The Sikorsky UH-60 Black Hawk is a four-bladed, twin-engine, medium-lift utility helicopter manufactured by Sikorsky Aircraft. Sikorsky submitted the S-70 design for the United States Army's Utility Tactical Transport Aircraft System (UTTAS) competition in 1972. The Army designated the prototype as the YUH-60A and selected the Black Hawk as the winner of the program in 1976, after a fly-off competition with the Boeing Vertol YUH-61.", 20000000, "Images/thumbnails/products/Blackhawk.png", "Models/Blackhawk/", "uh60.obj", "uh60.mtl", 1));
    //Boeing 787
    Products.push(new Product("Boeing 787-8", "The Boeing 787-8 is a mid-size, dual aisle, twin engine jet manufactured by Boeing, the American aerospace company. The aircraft is 20% more fuel efficient than similar sized commercial jets it is designed to replace, and to date, is Boeing's most fuel efficient aircraft. Composite materials make up 50 percent of the primary structure, including the fuselage and wing. The engine nacelles are made of serrated edges that reduce the noise levels both outside and inside the cabin, by up to 60%. The aircraft also features raked wingtip to further improve the fuel efficiency. The windows are more than 30 percent larger than those on most similarly sized airplanes. Instead of pulling shades up and down, customers can adjust the brightness of windows with a button. Using an electrochromic dimming system, the windows turn from fully transparent to completely dimmed in gradual steps.", 250000000, "Images/thumbnails/products/Boeing787.png", "Models/Boeing787/", "Boeing_787_8.obj", "Boeing_787_8.mtl", 1));
    //M1A2 Abrams Tank
    Products.push(new Product("M1A2 Abrams Tank", "The M1 Abrams is an American third-generation main battle tank. It is named after General Creighton Abrams, former Army chief of staff and commander of United States military forces in the Vietnam War from 1968 to 1972. Highly mobile, designed for modern armored ground warfare, the M1 is well armed and heavily armored. Notable features include the use of a powerful multifuel turbine engine, the adoption of sophisticated composite armor, and separate ammunition storage in a blow-out compartment for crew safety. Weighing nearly 68 short tons (almost 62 metric tons), it is one of the heaviest main battle tanks in service.", 8000000, "Images/thumbnails/products/M1A2.png", "Models/M1A2/", "Abrams_BF3.obj", "Abrams_BF3.mtl", 0));
    //Row Boat
    Products.push(new Product("Row Boat", "A simple wooden rowing boat.", 500, "Images/thumbnails/products/RowBoat.png", "Models/RowBoat/", "OldBoat.obj", "OldBoat.mtl", 2));
    //Yacht
    Products.push(new Product("Yacht", "A Stylish traditional yacht.", 20000, "Images/thumbnails/products/Yacht.png", "Models/Yacht/", "yacht.obj", "yacht.mtl", 2));
	//more products can be added easily by pushing another product object to the products array
    return Products;
}
