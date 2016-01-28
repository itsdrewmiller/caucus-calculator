(function(app) {

	var calcDelegates = function(delegates, attendees, attendeesPerCandidate) {

		if (delegates === 1) {
			return mapPluralityWinner(attendeesPerCandidate);
		}
		
		if (delegates === 2) {
			threshold = .25;
		} else if (delegates === 3) {
			threshold = 1/6;
		} else {
		var threshold = .15;				
		}
		var viability = Math.ceil(threshold * attendees);

		var virtualAttendance = 0;

		for (var index=0;index<attendeesPerCandidate.length;index++) {
			if (attendeesPerCandidate[index] >= viability) {
				virtualAttendance += attendeesPerCandidate[index];
			} else {
			}
		}

		var totalDelegates = 0;
		var assignedDelegates = [];
		var roundingError = [];
		for (var index=0;index<attendeesPerCandidate.length;index++) {
			if (attendeesPerCandidate[index] >= viability) {
				var unroundedDelegatesWon = attendeesPerCandidate[index]/virtualAttendance*delegates;
				var delegatesWon = Math.round(unroundedDelegatesWon);
				assignedDelegates.push(delegatesWon);
				totalDelegates += delegatesWon;
				roundingError.push(delegatesWon - unroundedDelegatesWon);
			} else {
				assignedDelegates.push(0);
				roundingError.push(0);
			}
		}

		while (totalDelegates < delegates) {
			var maxIndices = [];
			var minError = Infinity;
			for(var index=0;index<roundingError.length;index++) {
				if (roundingError[index] < minError) {
					maxIndices = [index];
					minError = roundingError[index];
				} else if (roundingError[index] === minError) {
					maxIndices.push(index);
				}
			}
			for(var addIndex=0;addIndex<maxIndices.length;addIndex++) {
				totalDelegates+=1;
				roundingError[maxIndices[addIndex]] += 1;
				assignedDelegates[maxIndices[addIndex]] += 1;				
			}
		}

		// Need to figure out what to do about over-assigning; deterministic coin flip?

		return assignedDelegates;

	}

	var mapPluralityWinner = function(attendeesPerCandidate) {
		var maxIndex = -1;
		var maxAmount = -Infinity;
		for (var index=0;index<attendeesPerCandidate.length;index++) {
			if (attendeesPerCandidate[index] > maxAmount) {
				maxAmount = attendeesPerCandidate[index];
				maxIndex = index;
			} else if (attendeesPerCandidate[index] === maxAmount) {
				maxIndex = -1;
			}
		}
		var mapped = new Array(attendeesPerCandidate.length).fill(0);
		if (maxIndex > -1)
		{
			mapped[maxIndex] = 1;
		}
		return mapped;
	};

	app.calcDelegates = calcDelegates;

})(window.app || (window.app = {}));

