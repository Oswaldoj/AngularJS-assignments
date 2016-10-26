(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);


ItemsListController.$inject = ['items'];
function ItemsListController(items) {
  var itList = this;

  itList.items = items.menu_items;
  itList.category = items.category;
}

})();
