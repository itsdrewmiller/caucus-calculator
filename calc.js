(function(app) {

	var calcDelegates = function(delegates, attendees, attendeesPerCandidate) {

		if (!attendees || !delegates || delegates < 1 || attendees < 1) {
			return new Array(attendeesPerCandidate.length).fill(0);
		}

		if (delegates === 1) {
			return mapPluralityWinner(attendeesPerCandidate);
		}

		var viability = calcViability(delegates,attendees);

		var totalDelegates = 0;
		var assignedDelegates = [];
		var roundingError = [];

		// First let's round
		for (var index=0;index<attendeesPerCandidate.length;index++) {
			if (attendeesPerCandidate[index] >= viability) {
				var unroundedDelegatesWon = attendeesPerCandidate[index]/attendees*delegates;
				var delegatesWon = Math.min(1,Math.round(unroundedDelegatesWon));
				assignedDelegates.push(delegatesWon);
				totalDelegates += delegatesWon;
				roundingError.push(delegatesWon - unroundedDelegatesWon);
			} else {
				assignedDelegates.push(0);
				roundingError.push(0);
			}
		}

		// If we needed to round down, let's find where to add
		// Add multiple at once if there are ties - we can flip coins later
		// Only add to viable groups
		while (totalDelegates < delegates) {
			var minIndices = [];
			var minError = Infinity;
			for(var index=0;index<roundingError.length;index++) {
				if (roundingError[index] < minError && assignedDelegates[index] > 0) {
					minIndices = [index];
					minError = roundingError[index];
				} else if (roundingError[index] === minError && assignedDelegates[index] > 0) {
					minIndices.push(index);
				}
			}
			for(var addIndex=0;addIndex<minIndices.length;addIndex++) {
				totalDelegates+=1;
				roundingError[minIndices[addIndex]] += 1;
				assignedDelegates[minIndices[addIndex]] += 1;				
			}
		}

		// Make sure we are flipping coins consistently given the components
		Math.seedrandom(attendeesPerCandidate.toString() + delegates.toString() + attendees.toString());
		
		// First we need to reduce down to a minimum of one delegate per viable candidate
		var findDelegateRemovalIndex = function(minDelegates) {

			var maxIndices = [];
			var maxError = -Infinity;

			for(var index=0;index<roundingError.length;index++) {
				if (roundingError[index] > maxError && assignedDelegates[index] > minDelegates) {
					maxIndices = [index];
					maxError = roundingError[index];
				} else if (roundingError[index] === maxError && assignedDelegates[index] > minDelegates) {
					maxIndices.push(index);
				}
			}
			var removeIndex = Math.floor(Math.random() * maxIndices.length);
			return maxIndices[removeIndex];
		}

		var hasMinDelegates = function(minDelegates) {
			for(var index=0;index<roundingError.length;index++) {
				if (assignedDelegates[index] >= minDelegates) {
					return true;
				}
			}
			return false;
		}

		while (totalDelegates > delegates && hasMinDelegates(2)) {
			var removalIndex = findDelegateRemovalIndex(1);
			totalDelegates-=1;
			roundingError[removalIndex] -= 1;
			assignedDelegates[removalIndex] -= 1;				
		}

		while (totalDelegates > delegates) {
			var removalIndex = findDelegateRemovalIndex(0);
			totalDelegates-=1;
			roundingError[removalIndex] -= 1;
			assignedDelegates[removalIndex] -= 1;				
		}

		// Then we need to take away delegates from viable candidates
		//   This may involve randomly breaking a tie


		return assignedDelegates;

	}

	var calcViability = function(delegates, attendees) {

		if (delegates === 1) {
			threshold = .5;
		} else if (delegates === 2) {
			threshold = .25;
		} else if (delegates === 3) {
			threshold = 1/6;
		} else {
		var threshold = .15;
		}
		return Math.ceil(threshold * attendees);
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
	app.calcViability = calcViability;

})(window.app || (window.app = {}));

