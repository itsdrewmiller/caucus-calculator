(function(app) {
	app.CaucusCalculator =
		ng.core.Component({
			selector: 'caucus-calculator',
			template: `
				<div class="row form-group">
					<div class="col-sm-9">
						<h2>Precinct Results Calculator</h2>
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="delegates">Total Delegates</label>
					<div class="col-sm-3">
						<input class="form-control" type="phone" id="delegates" [(ngModel)]="delegates" />
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="attendees">All Attendees</label>
					<div class="col-sm-3">
						<input class="form-control" type="phone" id="attendees" [(ngModel)]="attendees" />
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="clinton">Clinton Preference Group</label>
					<div class="col-sm-3">
						<input class="form-control" type="phone" id="clinton" [(ngModel)]="clinton" />
					</div>
					<div class="col-sm-3">
						<span>{{clintonDelegates()}} Delegates earned</span>
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="omalley">O&#39;Malley Preference Group</label>
					<div class="col-sm-3">
						<input class="form-control" type="phone" id="omalley" [(ngModel)]="omalley" />
					</div>
					<div class="col-sm-3">
						<span>{{omalleyDelegates()}} Delegates earned</span>
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="sanders">Sanders Preference Group</label>
					<div class="col-sm-3" >
						<input class="form-control" type="phone" id="sanders" [(ngModel)]="sanders" />
					</div>
					<div class="col-sm-3" >
						<span>{{sandersDelegates()}} Delegates earned</span>
					</div>
				</div>
				<div class="row form-group">
					<label class="col-sm-3 form-control-label" for="uncommitted">Uncommitted Preference Group</label>
					<div class="col-sm-3">
						<span>{{uncommitted()}}</span>
					</div>
					<div>
						<span class="col-sm-3">{{uncommittedDelegates()}} Delegates earned</span>
					</div>
				</div>
			`
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
					return (parseInt(that.attendees) || 0) - (parseInt(that.clinton) || 0) - (parseInt(that.omalley) || 0) - (parseInt(that.sanders) || 0);
				};

				var calcDelegates = function() {
					return app.calcDelegates(that.delegates, that.attendees, 
						[
							parseInt(that.clinton),
							parseInt(that.omalley),
							parseInt(that.sanders),
							parseInt(that.uncommitted())
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
			}
		});
})(window.app || (window.app = {}));