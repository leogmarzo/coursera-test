(function() {
	'use strict';

	angular.module("ShoppingList", [])
	.controller("ToBuyController", ToBuyController)
	.controller("AlreadyBoughtController", AlreadyBoughtController)
	.service("ShoppingListService", ShoppingListService)
 	

	ToBuyController.$inject = ["ShoppingListService"];
	function ToBuyController(ShoppingListService) {
	
		var toBuyList = this;
		toBuyList.products = ShoppingListService.getProducts();

		toBuyList.buyProduct = function(index) {
			ShoppingListService.buyProduct(index);
		}
	} 

	AlreadyBoughtController.$inject = ["ShoppingListService"];
	function AlreadyBoughtController(ShoppingListService) {
	
		var alreadyBoughtCtrl = this;
		alreadyBoughtCtrl.products = ShoppingListService.getAlreadyBoughtProducts();
	} 

	function ShoppingListService() {
		var service = this;
		var products = [
						{name: "locros", quantity: 5 },
						{name: "empanadas", quantity: 12 },
						{name: "lomitos", quantity: 2 },
						{name: "fernet", quantity: 1 },
						{name: "choripanes", quantity: 10 }
					  ]

		var boughtProducts = [];

		service.getProducts = function() {
			return products;
		} 

		service.buyProduct = function(index) {
			var boughtProduct = products.splice(index,1);
			boughtProducts.push(boughtProduct[0]);
		}

		service.getAlreadyBoughtProducts = function() {
			return boughtProducts;
		}

	}

}) ();