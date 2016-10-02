(function() {
	'use strict'
	
	angular.module('NarrowItDownApp', [])
	.controller('MenuController', MenuController)
	.constant('ApiBasePath', "data")
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)

	function FoundItemsDirective () {
		var ddo = {
			templateUrl: "foundItems.html",
			scope: {
				found : "<",
				onRemove: "&"
				},
			controller: FoundItemsDirectiveController,
    		controllerAs: 'menu',
    		bindToController: true
		};

		return ddo;
	}

	function FoundItemsDirectiveController () {
		var menu = this;

		menu.hasError = function () {
			console.log ("number of items", menu.found.length)
			return menu.found.length < 1;
		}
 	}

	MenuController.$inject = ['MenuSearchService'];
	function MenuController(MenuSearchService) {
		var controller = this;
		controller.searchTerm = "";
		controller.found = [];
		controller.errorMessage = "";

		controller.search = function () {
			
			controller.found = [];
			
			if (controller.searchTerm == "") {
				controller.errorMessage = "error";
				return;
			}

			var promise = MenuSearchService.searchMenuItems(controller.searchTerm);
			
			promise.then(function(result) {
				controller.found = result;
				if (controller.found.length < 1) {
					controller.errorMessage = "error";
				}else {
					controller.errorMessage = "";
				}
			})
		} 

		controller.removeItem = function(index) {
			console.log("remove called");
			MenuSearchService.removeItem(index);
		}
	}


	MenuSearchService.$inject = ['ApiBasePath', "$http"];
	function MenuSearchService(ApiBasePath, $http) {

		var service = this;

		service.found = [];

		service.removeItem = function(index) {
			console.log("indexToRemove", index);
			service.found.splice(index,1);
		}

		service.searchMenuItems = function(search) {
			service.found = [];
			return $http({
				method: 'GET',
				url: ApiBasePath + '/menu_items.json'
			}).then(
				function(response){
					var items = response.data.menu_items;
					for (var i = 0; i < items.length; i++) {
						if (items[i].description.indexOf(search) > -1) {
							service.found.push(items[i]);
						}	
					}
				return service.found;
				}
				);
		};
	}

})();
