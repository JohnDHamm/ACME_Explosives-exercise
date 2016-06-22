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
