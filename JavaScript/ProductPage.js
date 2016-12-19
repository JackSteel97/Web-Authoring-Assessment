$(document).ready(function ($) {
	console.log("ready");
	var prodArr = init();
	console.log(prodArr);
});

function init() {
	var Products = [];
	//aventador
	Products.push(new Product("Lamborghini Aventador",
							  "Forget the idea of performance you are used to. The Aventador Coupé has been engineered to revolutionize this concept and establish a new benchmark in the segment of super sports cars and beyond. This car aims to bring the future forward. This is a true supercar legend in the making, which combines the tradition of the Lamborghini brand with a level of innovation which takes the House of the Raging Bull to hitherto unexplored territory.",
							  225000.00,
							  "Images/thumbnails/Aventador.png",
							  "Models/Aventador/",
							  "Avent.obj",
							  "Avent.mtl",
							  0));

	//blackhawk
	Products.push(new Product("UH-60 Blackhawk",
							  "The Sikorsky UH-60 Black Hawk is a four-bladed, twin-engine, medium-lift utility helicopter manufactured by Sikorsky Aircraft. Sikorsky submitted the S-70 design for the United States Army's Utility Tactical Transport Aircraft System (UTTAS) competition in 1972. The Army designated the prototype as the YUH-60A and selected the Black Hawk as the winner of the program in 1976, after a fly-off competition with the Boeing Vertol YUH-61.",
							 20000000,
							 "Imgages/thumbnails/Blackhawk.png",
							 "Models/Blackhawk/",
							 "uh60.obj",
							 "uh60.mtl",
							 1));



	return Products;
}
