
//Creates a variable that allows us to 'call' the database
var database = firebase.database();

$(document).ready(function () {


    // variables to store the values from the form
    // var name = "";
    // var dest = "";
    // var firstTime = 0;
    // var freq = 0;
    // var minsAway = 0;
    // var nextArrival = 0;
    // var myArr = [];


    $("#submit-button").on("click", function (event) {
        event.preventDefault();

        // grab user input
        var nameNew = $("#train-name").val().trim()
        var destNew = $("#train-destination").val().trim()
        var firstTimeNew = $("#train-first-time").val().trim()
        var freqNew = $("#train-frequency").val().trim()

        // create local 'temporary object' for holding input data
        var newTrain = {
            name: nameNew,
            dest: destNew,
            firstTime: firstTimeNew,
            freq: freqNew,
        };
        // upload new inputs to database
        database.ref().push(newTrain);

        // check it out
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.firstTime);
        console.log(newTrain.freqNew);

        resetForm()
    })


    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into variables (again?!)
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest;
        var trainFirstTime = childSnapshot.val().firstTime;
        var trainFreq = childSnapshot.val().freq;

        // Train data 
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFirstTime);
        console.log(trainFreq);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainFreq),
            $("<td>").text(trainFirstTime),
            $("<td>").text("train mins away"),
        );

        $("#view-trains").append(newRow);

    });


    function resetForm() {
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-first-time").val("")
        $("#train-frequency").val("")
    };
});


            // var trainForLoop = function () {
            //     for (var i = 0; i < myArr.length; i++) {
            //         var newTrainArr = [name, dest, firstTime, freq];
            //     }

            // newRow.append(rowName, rowDestDisp, rowFreq, rowNextArrival, rowMinsAway);

            // $("#view-trains").append(newRow);

            // var newRow = $("<tr></tr>");
            // var rowName = "<td>" + name + "</td>";
            // var rowDestDisp = "<td>" + dest + "</td>";
            // var rowFreq = "<td>" + freq + "</td>";
            // var rowNextArrival = "<td>" + nextArrival + "</td>";
            // var rowMinsAway = "<td>" + minsAway + "</td>";