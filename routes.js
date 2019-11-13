const routes = require('next-routes');

module.exports = routes()
	.add('index', '/')
	.add('auth', '/auth')
	.add('dashboard', '/dashboard');
