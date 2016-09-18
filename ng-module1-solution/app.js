(function() {
	angular.module("LunchApp", [])

	.controller("LunchController", LunchController);

	LunchController.$injector = ["$scope","$filter"];

	function LunchController ($scope, $filter) {
		$scope.checkIfTooMuch = function() {
			var nLunchs = 0;
			if ($scope.lunchs) {
				nLunchs = $scope.lunchs.split(",").length;
			}
			
			if (nLunchs == 0) {
				$scope.message = "Please enter data first";
			}
			
			else if (nLunchs>0 && nLunchs <=3) {
				$scope.message = "Enjoy!";
			}

			else if (nLunchs>3) {
				$scope.message = "Too Much!";
			}
		}
				
	}
})();