(function(app) {
	document.addEventListener('DOMContentLoaded', function() {
		ng.platform.browser.bootstrap(app.CaucusCalculator);
	});
})(window.app || (window.app = {}));
