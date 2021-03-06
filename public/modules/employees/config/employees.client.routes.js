'use strict';

//Setting up route
angular.module('employees').config(['$stateProvider',
	function($stateProvider) {
		// Employees state routing
		$stateProvider.
		state('listEmployees', {
			url: '/employees',
			templateUrl: 'modules/employees/views/list-employees.client.view.html'
		}).
		state('createEmployee', {
			url: '/employees/create',
			templateUrl: 'modules/employees/views/create-employee.client.view.html'
		}).
		state('viewEmployee', {
			url: '/employees/:employeeId',
			templateUrl: 'modules/employees/views/view-employee.client.view.html'
		}).
		state('editEmployee', {
			url: '/employees/:employeeId/edit',
			templateUrl: 'modules/employees/views/edit-employee.client.view.html'
		});
	}
]);
