(function () {

'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.controller('FoundItemsController', FoundItemsController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: 'FoundItemsController as founditems',
    bindToController: true
  };

  return ddo;
}


// This controller is not used, so it is empty
function FoundItemsController() {
  var found = this;


};



// Controller for retreiving menu items from server
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrowit = this;

    // takes care of message box being empty
    narrowit.searchTerm = "";
    narrowit.found = [];
    narrowit.error = false;

    narrowit.NarrowItDownPlease = function () {
        narrowit.error = (narrowit.searchTerm.trim().length == 0);
        if (narrowit.error) {
            narrowit.found = [];
            return;
        }

        var promise = MenuSearchService.getMatchedMenuItems(narrowit.searchTerm.trim());

        promise.then( function (arreglo) {
            narrowit.found = arreglo;
            narrowit.error = (narrowit.found.length == 0);
        });
    };

    narrowit.removeItem = function(itemIndex) {
        MenuSearchService.removeItem(itemIndex);
    };
}



// Service for menu search
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
           method: "GET",
           url: (ApiBasePath + "/menu_items.json"),
        }).then(function (result) {
            // console.log(result.data)
            var menuit = result.data.menu_items;

            foundItems = [];

            for (var i = 0; i < menuit.length; i++) {
                if (menuit[i].description.toLowerCase().indexOf(searchTerm) != -1) {
                    foundItems.push(menuit[i]);
                }
            }

            return foundItems;
        }).catch(function (error) {
            console.log("Something went wrong.");
        });
    };

    service.removeItem = function(itemIndex) {
        foundItems.splice(itemIndex,1);
    };
}

})();
