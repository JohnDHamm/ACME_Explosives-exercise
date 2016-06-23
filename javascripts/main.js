"use strict";

// Create a simple user interface for your product catalog where a user can select a category from a dropdown. When a category is selected, you must use Promises to read, first, from the categories.json to load that array of objects, then load types.json, then products.json.

// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.

// get categories JSON data
var catAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../categories.json"
    }).done(function(data) {
    	// console.log("data", data);
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

// get types JSON data
var typeAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../types.json"
    }).done(function(data) {
    	// console.log("data", data);
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};


// get products JSON data
var productAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../products.json"
    }).done(function(data) {
    	// console.log("data", data);
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};




//function to display chosen products
var displayProducts = function(selectedCat, catArray, typeArray, productArray) {


	// if no category selected, alert
	if (selectedCat === "Please select a category") {
		alert("Please select a category.");
		return;
	};

	// get catID for selected category
	var catID = null;
	for (let i=0; i<catArray.length; i++){
		if (catArray[i].name === selectedCat){
			catID = i;	
		}
	};

	// check if type is of selected Cat and create new array of selected types
	var selectedTypes = [];
	for (let i=0; i<typeArray.length; i++){
		if (typeArray[i].category === catID){
			selectedTypes.push(i);
		};
	};


	// go through products and display those in category
	var $outputEl = $("#output");
	$outputEl.empty(); //clear the page

	// loop through selectedTypes array and check for products with that type and display that product
	selectedTypes.forEach(function(typeID) {
		// console.log("typeID", typeID);
		// go thru productArray to get object and check type
		productArray.forEach(function(productObj){
			for (var obj in productObj) {
				var currentProduct = productObj[obj];
				// console.log("currentProduct type:", currentProduct.type);
				if (currentProduct.type === typeID) {
					//build card to display
					$outputEl.append(`<div class="card">
						<h1 class="name">${currentProduct.name}</h1>
						<p class="description">${currentProduct.description}</p>
						<h4>Category: ${selectedCat}</h4>
						<h4 class="type">Type: ${typeArray[typeID].name}</h4>
						<p class="typeDescript">${typeArray[typeID].description}</p>
						</div>`
					);
				};
			};
		});
	});
};



$(document).ready(function() {
	// when select is changed, get category, load JSONs, deisplay products
	$("#selectEl").change(function(){
		var selectedCat = $("#selectEl option:selected").text();
		var catArray = [];
		var typeArray = [];
		var productArray = [];

		catAJAX()
			.then(function(data1) {
				catArray = data1.categories;
		    return typeAJAX(data1);
		  })
		  .then(function(data2) {
		  	typeArray = data2.types;
		    return productAJAX(data2);
		  }).then(function(data3){
		    productArray = data3.products;
		    displayProducts(selectedCat, catArray, typeArray, productArray);
		  });
	});
});
