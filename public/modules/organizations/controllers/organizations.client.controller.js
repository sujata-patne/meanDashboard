'use strict';

// Organizations controller
angular.module('organizations').controller('OrganizationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Organizations', 'Projects','Employees',
	function($scope, $stateParams, $location, Authentication, Organizations, Projects, Employees) {
		$scope.authentication = Authentication;

		$scope.getBenchHeadCount = function(){
			if($scope.totalHeadCount > $scope.billableHeadCount || $scope.totalHeadCount == $scope.billableHeadCount){
				$scope.benchHeadCount = parseInt($scope.totalHeadCount) - parseInt($scope.billableHeadCount);
			}else{
				$scope.benchHeadCount = '';
			}
		}
		$scope.getBillableHeadCount = function(){
			if($scope.totalHeadCount > $scope.benchHeadCount || $scope.totalHeadCount == $scope.benchHeadCount){
				$scope.billableHeadCount = parseInt($scope.totalHeadCount) - parseInt($scope.benchHeadCount);
			}else{
				$scope.billableHeadCount = '';
			}
		}

		// Create new Organization
		$scope.create = function() {
			// Create new Organization object
			var organization = new Organizations ({
				name: this.name,
				totalHeadCount: this.totalHeadCount,
				benchHeadCount: this.benchHeadCount,
				billableHeadCount: this.billableHeadCount,
				owner: this.owner
			});

			// Redirect after save
			organization.$save(function(response) {
				$location.path('organizations/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Organization
		$scope.remove = function(organization) {
			if ( organization ) { 
				organization.$remove();

				for (var i in $scope.organizations) {
					if ($scope.organizations [i] === organization) {
						$scope.organizations.splice(i, 1);
					}
				}
			} else {
				$scope.organization.$remove(function() {
					$location.path('organizations');
				});
			}
		};

		// Update existing Organization
		$scope.update = function() {
			var organization = $scope.organization;
			console.log(organization);
			organization.$update(function() {
				$location.path('organizations/' + organization._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Organizations
		$scope.find = function() {
			$scope.organizations = Organizations.query();
		};

		// Find existing Organization
		$scope.findOne = function() {
			$scope.organization = Organizations.get({ 
				organizationId: $stateParams.organizationId
			});
			$scope.organization.$promise.then(function(organization){
				//$scope.owners = Employees.query();
				$scope.owners = organization.members;
			})
			//$scope.owners = Employee.query();
			console.log($scope.organization);
		};
	}
]);
