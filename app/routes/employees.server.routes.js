'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var employees = require('../../app/controllers/employees.server.controller');

	// Employees Routes
	app.route('/employees')
		.get(employees.list)
		.post(users.requiresLogin, employees.create);

	app.route('/employees/:employeeId')
		.get(employees.read)
		.put(users.requiresLogin, employees.hasAuthorization, employees.update)
		.delete(users.requiresLogin, employees.hasAuthorization, employees.delete);

	app.route('/employees/organization/:organization')
		.get(employees.getOrganization);

	app.route('/employees/projects/:project')
		.get(employees.getProjects);

	// Finish by binding the Employee middleware
	app.param('employeeId', employees.employeeByID);
	app.param('organization',employees.organizationByName);
	app.param('project',employees.projectsByName);
};
