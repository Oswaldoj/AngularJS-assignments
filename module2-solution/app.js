(function () {

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// Controller for List items to buy
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var tobuyItemsList = this;

	  tobuyItemsList.errorMessage = "Everything is bought!";
	  tobuyItemsList.items = ShoppingListCheckOffService.getItemsToBuy();

    tobuyItemsList.buyItem = function (itemIndex) {
    		ShoppingListCheckOffService.buyItem(itemIndex);
    		tobuyItemsList.items = ShoppingListCheckOffService.getItemsToBuy();
    };
}


// Controller for List of already bought items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtItemsList = this;

    boughtItemsList.errorMessage = "Nothing bought yet";
    boughtItemsList.items = ShoppingListCheckOffService.getBoughtItems();
}


// Service for Check Off Shopping List
function ShoppingListCheckOffService() {
    var service = this;

    // Array of items to buy (initialized with at least five object literals)
    var tobuyItems =
                  	  [
                  		  { name: 'cookies'        ,  quantity: 10 } ,
                  		  { name: 'chips'          ,  quantity:  6 } ,
                  		  { name: 'sugary drinks'  ,  quantity:  8 } ,
                  		  { name: 'chocolate bars' ,  quantity: 20 } ,
                  		  { name: 'pepto bismol'   ,  quantity:  4 }
                  	  ];

  	// Array of bought items, initially empty
  	var boughtItems = [];

    // Buy an item
    service.buyItem = function(itemIndex) {
        // Update both lists at the same time
         boughtItems.push(tobuyItems.splice(itemIndex,1)[0]);
    };

    // Get items to buy
    service.getItemsToBuy = function() {
    	   return tobuyItems;
    };

  	// Get bought items
    service.getBoughtItems = function() {
  	     return boughtItems;
    };

    // Get error messages
    service.everythingIsBought = function() {
         return tobuyItems.length == 0;
    };

    service.nothingBoughtYet = function() {
         return boughtItems.length == 0;
    };
}

})();
