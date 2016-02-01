(function(app) {
	ng.core.enableProdMode();
	app.CaucusCalculator =
		ng.core.Component({
			selector: 'caucus-calculator',
			template: '<div class="row form-group">' +
					'<div class="col-sm-9">' + 
						'<h2>Precinct Results Calculator</h2>' +
					'</div>' +
				'</div>' +
				'<div class="row form-group">' +
					'<label class="col-sm-3 form-control-label" for="delegates">Total Delegates</label>' +
					'<div class="col-sm-3">' +
						'<input class="form-control" type="tel" id="delegates" [(ngModel)]="delegates" />' +
					'</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'	<label class="col-sm-3 form-control-label" for="attendees">All Attendees</label>' +
				'	<div class="col-sm-3">' +
				'		<input class="form-control" type="tel" id="attendees" [(ngModel)]="attendees" />' +
				'	</div>' +
				'	<div class="col-sm-3">' +
				'		<span>{{viability()}} needed for viability</span>' +
				'	</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'	<label class="col-sm-3 form-control-label" for="clinton">Clinton Preference Group</label>' +
				'	<div class="col-sm-3">' +
				'		<input class="form-control" type="tel" id="clinton" [(ngModel)]="clinton" />' +
				'	</div>' +
				'	<div class="col-sm-3">' +
				'		<span>{{clintonDelegates()}} Delegates earned</span>' +
				'	</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'	<label class="col-sm-3 form-control-label" for="omalley">O&#39;Malley Preference Group</label>' +
				'	<div class="col-sm-3">' +
				'		<input class="form-control" type="tel" id="omalley" [(ngModel)]="omalley" />' +
				'	</div>' +
				'	<div class="col-sm-3">' +
				'		<span>{{omalleyDelegates()}} Delegates earned</span>' +
				'	</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'	<label class="col-sm-3 form-control-label" for="sanders">Sanders Preference Group</label>' +
				'	<div class="col-sm-3" >' +
				'		<input class="form-control" type="tel" id="sanders" [(ngModel)]="sanders" />' +
				'	</div>' +
				'	<div class="col-sm-3" >' +
				'		<span>{{sandersDelegates()}} Delegates earned</span>' +
				'	</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'	<label class="col-sm-3 form-control-label" for="uncommitted">Uncommitted Preference Group</label>' +
				'	<div class="col-sm-3">' +
				'		<span>{{uncommitted()}}</span>' +
				'	</div>' +
				'	<div>' +
				'		<span class="col-sm-3">{{uncommittedDelegates()}} Delegates earned</span>' +
				'	</div>' +
				'</div>'
		})
		.Class({
			constructor: function() {

				var that = this;

				that.delegates = 8;
				that.attendees = 100;
				that.clinton = 25;
				that.omalley = 25;
				that.sanders = 25;

				that.uncommitted = function() {
					return (parseInt(that.attendees,10) || 0) - (parseInt(that.clinton,10) || 0) - (parseInt(that.omalley,10) || 0) - (parseInt(that.sanders,10) || 0);
				};

				var calcDelegates = function() {
					return app.calcDelegates(parseInt(that.delegates,10), parseInt(that.attendees,10), 
						[
							parseInt(that.clinton,10),
							parseInt(that.omalley,10),
							parseInt(that.sanders,10),
							parseInt(that.uncommitted(),10)
						]);
				}

				that.clintonDelegates = function() {
					return calcDelegates()[0];
				}

				that.omalleyDelegates = function() {
					return calcDelegates()[1];
				}

				that.sandersDelegates = function() {
					return calcDelegates()[2];
				}

				that.uncommittedDelegates = function() {
					return calcDelegates()[3];
				}

				that.viability = function() {
					return app.calcViability(parseInt(that.delegates,10), parseInt(that.attendees,10));
				}
			}
		});
})(window.app || (window.app = {}));