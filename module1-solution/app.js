(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  // Initialize scope and default variables
  $scope.dishes = "";
  var mensajeFaltanDatos = "Please enter data first";
  var mensajeDemasiado = "Too much!";
  var mensajeExito = "Enjoy!";
  var colorError = "red";
  var colorExito = "green";

  $scope.cuantaComida = function () {
    if ($scope.dishes.length == 0) {
      actualizarMensaje(mensajeFaltanDatos,colorError);
      return;
    }

    // Split input string into items using a separator
    var platos = $scope.dishes.split(",");
    var numberOfDishes = 0; // counter for number of items

    // Count non empty items
    for (var i=0;i<platos.length;i++) {
      if (platos[i].trim().length) numberOfDishes++;
    }

    // Put corresponding message
    if (numberOfDishes == 0) {
      actualizarMensaje(mensajeFaltanDatos,colorError);
    } else if (numberOfDishes > 3) {
      actualizarMensaje(mensajeDemasiado,colorError);
    } else {
      actualizarMensaje(mensajeExito,colorExito);
    }

  };

  // Message manage function
  function actualizarMensaje(mensaje,color) {
    $scope.mensajeFinal = mensaje;
    $scope.colorBorde = color;
    $scope.colorMensaje = color;
  }
}

})();
