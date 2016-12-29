$(document).ready(function ($) {
    console.log("ready");
    var prodArr = init();
    var typeSelector = 0;
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
    for (var i = 0; i < prodArr.length; i++) {
        if (prodArr[i].getType() == typeSelector) {
            //belongs on this page
            addProductToGrid(prodArr[i], i);
        }
    }
    $(".productContainer").click(function(event){
        onProductGridItemClick(prodArr,$(this));
    });
});

function openProductPage(){
    //TODO: redirect to individual product page here
}

function onProductGridItemClick(prodArr, element){
    var index = element.data("index");
    var thisProduct = prodArr[index];
    localStorage.setItem("currentProduct",JSON.stringify(thisProduct));
    openProductPage();
}

function addProductToGrid(prod, index) {
    var prodAsHTMLItem = '<li><div data-index="' + index + '" class="productContainer"><img src="' + prod.getThumbnailPath() + '" class="productThumb"/><div class="productDescriptor"><p class="productTitle">' + prod.getName() + '</p><p class="productPrice">£' + prod.getBasePrice().toLocaleString('en-UK', {
        minimumFractionDigits: 2
    }) + '</p></div></div></li>';
    $("#productSection ul").append(prodAsHTMLItem);
}

function init() {
    var Products = [];
    //aventador
    Products.push(new Product("Lamborghini Aventador", "Forget the idea of performance you are used to. The Aventador Coupé has been engineered to revolutionize this concept and establish a new benchmark in the segment of super sports cars and beyond. This car aims to bring the future forward. This is a true supercar legend in the making, which combines the tradition of the Lamborghini brand with a level of innovation which takes the House of the Raging Bull to hitherto unexplored territory.", 225000.00, "Images/thumbnails/products/Aventador.png", "Models/Aventador/", "Avent.obj", "Avent.mtl", 0));
    //blackhawk
    Products.push(new Product("UH-60 Blackhawk", "The Sikorsky UH-60 Black Hawk is a four-bladed, twin-engine, medium-lift utility helicopter manufactured by Sikorsky Aircraft. Sikorsky submitted the S-70 design for the United States Army's Utility Tactical Transport Aircraft System (UTTAS) competition in 1972. The Army designated the prototype as the YUH-60A and selected the Black Hawk as the winner of the program in 1976, after a fly-off competition with the Boeing Vertol YUH-61.", 20000000, "Images/thumbnails/products/Blackhawk.png", "Models/Blackhawk/", "uh60.obj", "uh60.mtl", 1));
    //Boeing 787
    Products.push(new Product("Boeing 787-8", "The Boeing 787 Dreamliner is an American long-haul, mid-size widebody, twin-engine jet airliner made by Boeing Commercial Airplanes. Its variants seat 242 to 335 passengers in typical three-class seating configurations.", 250000000, "Images/thumbnails/products/Boeing787.png", "Models/Boeing787/", "Boeing_787_8.obj", "Boeing_787_8.mtl", 1));
    //M1A2 Abrams Tank
    Products.push(new Product("M1A2 Abrams Tank", "The M1 Abrams is an American third-generation main battle tank. It is named after General Creighton Abrams, former Army chief of staff and commander of United States military forces in the Vietnam War from 1968 to 1972. Highly mobile, designed for modern armored ground warfare, the M1 is well armed and heavily armored. Notable features include the use of a powerful multifuel turbine engine, the adoption of sophisticated composite armor, and separate ammunition storage in a blow-out compartment for crew safety. Weighing nearly 68 short tons (almost 62 metric tons), it is one of the heaviest main battle tanks in service.", 8000000, "Images/thumbnails/products/M1A2.png", "Models/M1A2/", "Abrams_BF3.obj", "Abrams_BF3.mtl", 0));
    //Row Boat
    Products.push(new Product("Row Boat", "A simple wooden rowing boat.", 500, "Images/thumbnails/products/RowBoat.png", "Models/RowBoat/", "OldBoat.obj", "OldBoat.mtl", 2));
    //Yacht
    Products.push(new Product("Yacht", "A Stylish traditional yacht.", 20000, "Images/thumbnails/products/Yacht.png", "Models/Yacht", "yacht.obj", "yacht.mtl", 2));
    return Products;
}
