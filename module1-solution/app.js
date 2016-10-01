(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.dishes = "";

  $scope.howMuchFood = function () {
    if ($scope.dishes.length == 0) {
      $scope.mensajeFinal = "Please enter data first";
    } else {
      var platos = $scope.dishes.split(",");
      var numberOfDishes = 0;

      for (var i=0;i<platos.length;i++) {
        if (platos[i].trim().length) numberOfDishes++;
      }

      $scope.mensajeFinal = "Enjoy!";
      if (numberOfDishes > 3) {
        $scope.mensajeFinal = "Too much!";
      }
    }

  };
}

})();
