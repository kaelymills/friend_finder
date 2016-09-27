
var friendData = require('../data/friends.js');
//var path = require('path');


module.exports = function(app){

//loads page of API data where all of the members are listed
//     app.get('/api/friends', function(req, res){
//         res.json(friendData);
//     });

    app.get('/api/friends', function(req, res){
        res.json(friendData);
    });


    app.post('/api/friends', function(req, res){

        var newFriend = req.body;

        for(var i = 0; i < newFriend.scores.length; i++) {
            if(newFriend.scores[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }

        var differencesArray = [];

        for(var i = 0; i < friendData.length; i++) {

            var comparedFriend = friendData[i];
            var totalDifference = 0;

            for(var k = 0; k < comparedFriend.scores.length; k++) {
                var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
                totalDifference += differenceOneScore;
            }

            differencesArray[i] = totalDifference;
        }

        var bestFriendNum = differencesArray[0];
        var bestFriendIndex = 0;

        for(var i = 1; i < differencesArray.length; i++) {
            if(differencesArray[i] < bestFriendNum) {
                bestFriendNum = differencesArray[i];2
                bestFriendIndex = i;
            }
        }



        friendData.push(req.body);

        res.json(friendData[bestFriendIndex]);
    });
};