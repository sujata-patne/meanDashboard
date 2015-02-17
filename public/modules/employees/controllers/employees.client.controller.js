'use strict';

// Employees controller
angular.module('employees').controller('EmployeesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Employees','Organizations','Projects',
	function($scope, $stateParams, $location, Authentication, Employees,Organizations,Projects) {
		$scope.authentication = Authentication;
		$scope.roles = [
			'Junior Software Developer',
			'Software Developer',
			'Senior Software Developer',
			'Junior QA Engineer',
			'QA Engineer',
			'Senior QA Engineer',
			'Tech Lead',
			'QA Lead',
			'Engineering Manager',
			'QA Manager',
			'Architect',
			'BU Head'
		];
		$scope.genders = ['Male', 'Female'];
		$scope.organizations = Organizations.query();
		//$scope.projects = Projects.query();

		$scope.getProjectUrl = function(org){
			//$scope.employee.worksFor = [];
			$scope.projectURL = "employees/projects/"+org.belongsTo;
		};
		// Create new Employee
		$scope.create = function() {
			// Create new Employee object
			var projData = [];
			this.worksFor.forEach(function(project){
				projData.push(project._id);
			});
			var employee = new Employees ({
				firstName: this.firstName,
				lastName: this.lastName,
				skills: this.skills,
				role: this.role,
				belongsTo: this.belongsTo,
				worksFor: projData,
				yearExp:this.yearExp,
				billable:this.billable,
				gender:this.gender
			});
			// Redirect after save
			employee.$save(function(response) {
				$location.path('employees/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log($scope.error)
			});
		};

		// Remove existing Employee
		$scope.remove = function(employee) {
			if ( employee ) { 
				employee.$remove();

				for (var i in $scope.employees) {
					if ($scope.employees [i] === employee) {
						$scope.employees.splice(i, 1);
					}
				}
			} else {
				$scope.employee.$remove(function() {
					$location.path('employees');
				});
			}
		};

		// Update existing Employee
		$scope.update = function () {
			var employee = $scope.employee;

			employee.$update(function () {
				$location.path('employees/' + employee._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Employees
		$scope.find = function() {
			$scope.employees = Employees.query();
		};

		// Find existing Employee
		$scope.findOne = function() {
			$scope.employee = Employees.get({ 
				employeeId: $stateParams.employeeId
			});

			$scope.employee.$promise.then(function (employee) {
				var indexOf = $scope.roles.indexOf(employee.role);
				employee.role = $scope.roles[indexOf];

				var indexOfGender = $scope.genders.indexOf(employee.gender);
				employee.gender = $scope.genders[indexOfGender];

				$scope.projectURL = "employees/projects/"+$scope.employee.belongsTo._id;
			});
			//$scope.organizations = Organizations.query();
			//$scope.projects = Projects.query();
		};
	}
]);
