/**
 * Created by JohnYeg on 7/25/15.
 */
//A non-empty zero-indexed array A consisting of N integers is given. The first covering prefix of array A is the smallest integer P such that 0≤P<N and such that every value that occurs in array A also occurs in sequence A[0], A[1], ..., A[P].
//
//	For example, the first covering prefix of the following 5−element array A:
//
//	A[0] = 2
//A[1] = 2
//A[2] = 1
//A[3] = 0
//A[4] = 1
//is 3, because sequence [ A[0], A[1], A[2], A[3] ] equal to [2, 2, 1, 0], contains all values that occur in array A.
//
//	Write a function
//
//function solution(A);
//
//that, given a zero-indexed non-empty array A consisting of N integers, returns the first covering prefix of A.
//
//	For example, given array A such that
//
//A[0] = 2
//A[1] = 2
//A[2] = 1
//A[3] = 0
//A[4] = 1
//the function should return 3, as explained above.
//
//	Assume that:
//
//	N is an integer within the range [1..1,000,000];
//each element of array A is an integer within the range [0..N−1].
//Complexity:
//
//	expected worst-case time complexity is O(N);
//expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
//Elements of input arrays can be modified.

// you can use console.log for debugging purposes, i.e.
// console.log('this is a debug message');

//function solution(A) {
//	// write your code in JavaScript (Node.js 0.12)
//	var storage = {};
//	A.forEach(function(val){
//		if(storage[val]===undefined){
//			storage[val]=1;
//		}
//	});
//	var prefixIndex = 0;
//	A.forEach(function(val, index){
//		if(storage[val]){
//			delete storage[val];
//			Object.keys(storage).length===0 ? prefixIndex = index : null;
//		}else{
//			!prefixIndex && Object.keys(storage).length===0 ? prefixIndex = index : null;
//		}
//	});
//	return prefixIndex
//}

//console.log((function solution(N) {
//	// write your code in JavaScript (Node.js 0.12)
//	var minDepthToSolve = -1;
//	var recurse = function(depth, sum){
//
//		if(sum === N){
//			minDepthToSolve = minDepthToSolve === 0 ? depth : (minDepthToSolve > depth ) ? depth : minDepthToSolve;
//		}else{
//
//			//if(counter === 0 && depth > counter){
//				if(sum < N){
//					 if((sum+1)<=N){
//					  recurse(depth+1,1+sum);
//					 }
//					if((sum*2)<=N){
//						recurse(depth+1,sum*2);
//					 }
//				}
//			//}
//		}
//	};
//	recurse(0,1);
//
//	return minDepthToSolve;
//})(18));

/*
 * Create a simple application  that tracks foosball ratings. You should be able to:

 • Display the current rankings of all the players

 • Add a new game on-the-fly

 • Update existing results
 */
// var _ = ('underscore');
 var scores = [

	 {	"player1":	"Alex",	"score1":	4,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Alex",	"score1":	1,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Alex",	"score1":	2,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Alex",	"score1":	0,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Alex",	"score1":	6,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Alex",	"score1":	5,	"player2":	"Barrett",	"score2":	2 },

	 {	"player1":	"Alex",	"score1":	4,	"player2":	"Barrett",	"score2":	0 },

	 {	"player1":	"Joel",	"score1":	4,	"player2":	"Barrett",	"score2":	5 },

	 {	"player1":	"Tim" ,	"score1":	4,	"player2":	"Alex",				"score2":	5 },

	 {	"player1":	"Tim" ,	"score1":	5,	"player2":	"Alex",				"score2":	2 },

	 {	"player1":	"Alex",	"score1":	3,	"player2":	"Tim",					"score2":	5 },

	 {	"player1":	"Alex",	"score1":	5,	"player2":	"Tim",					"score2":	3 },

	 {	"player1":	"Alex",	"score1":	5,	"player2":	"Joel",				"score2":	4 },

	 {	"player1":	"Joel",	"score1":	5,	"player2":	"Tim",					"score2":	2 }

 ];
var storage = [];

$(document).ready(function () {
	// populate storage on load;

	// Handler for .ready() called.
	$('#newGameForm').submit(function (e) {
		e.preventDefault();
		// add manual validation
			// if hit prevent default
//       if ( $( "input" ).val() !== " " ) {

//       }
		// TODO: clear form, validate for edge cases, negative #s, same number, write tests

		var tempGame = {"player1": "", "score1": 0, "player2": "", "score2": 0};
		var data = $(this).serializeArray();
		_.each(data, function (val, key) {
			tempGame[val.name] = val.value;
		});
		// add new score
		calcScore([tempGame]);

		// Re-Rank
		rank();
	});


	// rank
	var rank = function () {
		$(".leaderboard").empty();

		storage = _.sortBy(storage, "score").reverse();

		var sortedArray = _.each(storage, function (val, key) {
			$(".leaderboard").append('<li class="person"><span class="person-name">' +
				val.name + ' - </span><span class="person-name">' + val.score + '</span></li>');
		});

	};

	//used to make the initial call to populate scores.
	calcScore(scores);
	rank();
});


// array of objects or a hash map? discuss/explain trade off.
var calcScore = function (input) {
	_.each(input, function (game, idx) {
		var player1Winner = doesPlayer1Win(game);
		// if not in storage add them.
		var player1Idx = _.findIndex(storage, function (val) {
			return val.name === game.player1;
		});
		if (player1Idx === -1) {
			storage.push({"name": game.player1, "score": (player1Winner ? 1 : 0)});

		} else if (player1Winner) {
			storage[player1Idx].score = storage[player1Idx].score + 1;

		}

		var player2Idx = _.findIndex(storage, function (val) {
			return val.name === game.player2;
		});

		if (player2Idx === -1) {
			storage.push({"name": game.player2, "score": (player1Winner ? 0 : 1)});
		} else if (!player1Winner) {
			storage[player2Idx].score = storage[player2Idx].score + 1;
		}
	});

	return storage;
};

var doesPlayer1Win = function (game) {
	if (game.score1 > game.score2) {
		return true;
	} else {
		return false;
	}
};

console.log(calcScore(scores));














