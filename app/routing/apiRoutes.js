var friends = require("../data/friends");

module.exports = function (app) {
    // Return all friends found in friends.js
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        // Receive user input (name,photo,scores)
        var user = req.body;

        // parseInt for scores
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        // default friend match is the first but result will be whoever is closest to the score
        var bestFriendIndex = 0;
        var minimumDifference = 40;

        // This for-loop start with zero difference and compare user to the ith friend score
        // Add difference to the total difference
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        // After finding match, add user to friend array
        friends.push(user);

        //Send back to browser the best friend match
        res.json(friends[bestFriendIndex]);
    });
};