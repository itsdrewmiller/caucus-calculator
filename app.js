(function(app) {
	app.CaucusCalculator =
		ng.core.Component({
			selector: 'caucus-calculator',
			template: `
				<div class="row">
					<label class="col-sm-2" for="delegates">Delegates</label>
					<div class="col-sm-2">
						<input type="phone" id="delegates" [(ngModel)]="delegates" />
					</div>
				</div>
				<div class="row">
					<label class="col-sm-2" for="attendees">Attendees</label>
					<div class="col-sm-2">
						<input type="phone" id="attendees" [(ngModel)]="attendees" />
					</div>
				</div>
				<div class="row">
					<label class="col-sm-2" for="clinton">Clinton</label>
					<div class="col-sm-2">
						<input type="phone" id="clinton" [(ngModel)]="clinton" />
					</div>
					<div class="col-sm-2">
						<span>{{clintonDelegates()}}</span>
					</div>
				</div>
				<div class="row">
					<label class="col-sm-2" for="omalley">O&#39;Malley</label>
					<div class="col-sm-2">
						<input type="phone" id="omalley" [(ngModel)]="omalley" />
					</div>
					<div class="col-sm-2">
						<span>{{omalleyDelegates()}}</span>
					</div>
				</div>
				<div class="row">
					<label class="col-sm-2" for="sanders">Sanders</label>
					<div class="col-sm-2" >
						<input type="phone" id="sanders" [(ngModel)]="sanders" />
					</div>
					<div class="col-sm-2" >
						<span>{{sandersDelegates()}}</span>
					</div>
				</div>
				<div class="row">
					<label class="col-sm-2" for="uncommitted">Uncommitted</label>
					<div class="col-sm-2">
						<span>{{uncommitted()}}</span>
					</div>
					<div>
						<span class="col-sm-2">{{uncommittedDelegates()}}</span>
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