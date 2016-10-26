(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['categories'];
function CategoriesListController(categories) {
  var catList = this;

  catList.categories = categories;
}

})();
