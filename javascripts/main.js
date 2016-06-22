"use strict";

// Create a simple user interface for your product catalog where a user can select a category from a dropdown. When a category is selected, you must use Promises to read, first, from the categories.json to load that array of objects, then load types.json, then products.json.

// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.


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


var displayProducts = function(selectedCat, catArray, typeArray, productArray) {

		console.log("selectedCat", selectedCat);
		console.log("catArray", catArray);
		console.log("typeArray", typeArray);
		console.log("productArray", productArray);

	// if no category selected, alert
	if (selectedCat === "Please select a category") {
		alert("Please select a category.");
		return;
	};

	// get catID for selected category
	for (let i=0; i<catArray.length; i++){
		if (catArray[i].name === selectedCat){
			var catID = i;	
		}
	};

	// check if type is of selected Cat and create new array of selected types
	var selectedTypes = [];
	for (let i=0; i<typeArray.length; i++){
		if (typeArray[i].category === catID){
			selectedTypes.push(i);
			console.log("selectedTypes", selectedTypes);
		}
	};

	// go through products and display those in category
	var $outputEl = $("#output");


	for (let i=0; i<productArray.length; i++) {
		for (let j=0; j<selectedTypes.length; j++) {
			if (productArray[i].type = selectedTypes[j]) {
			$outputEl.append(`<div id="card--${i}" class="card"></div>`);
				$(".card").append(`<h1>${productArray[i].name}</h1>
					<p>${productArray[i].description}</p>
					<h4>${selectedCat}</h4>
					<h6>${typeArray[j].name}</h6>
					<p>${typeArray[j].description}</p>`);
			}
		}
	}










};



$(document).ready(function() {

	$("#selectEl").change(function(){
		var selectedCat = $("#selectEl option:selected").text();
		// console.log("selectedCat", selectedCat);
		var catArray = [];
		var typeArray = [];
		var productArray = [];

		catAJAX()
			.then(function(data1) {
				catArray = data1.categories;
				// console.log("catArray", catArray);
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
