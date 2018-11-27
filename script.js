//Creates a variable that allows us to 'call' the database
var database = firebase.database();

$(document).ready(function () {

    $("#submit-button").on("click", function (event) {
        event.preventDefault();

        // grab user input
        var nameNew = $("#train-name").val().trim()
        var destNew = $("#train-destination").val().trim()
        var firstTimeNew = $("#train-first-time").val().trim()
        var freqNew = $("#train-frequency").val().trim()


        // moment time work
        var convertFirstTime = moment(firstTimeNew, "HH:mm").subtract(1, "years");
        console.log("convert input field = " + convertFirstTime)

        var currentTime = moment();
        console.log(moment(currentTime).format("hh:mm") + " currentTime = formatted moment");

        var timeDif = moment().diff(moment(convertFirstTime), "minutes");
        console.log("Dif in cFT and m() in minutes = " + timeDif);

        var timeRemain = timeDif % freqNew;
        console.log("timeRemain is timeDif % freqNew = " + timeRemain);

        var minTilTrain = freqNew - timeRemain;
        console.log("mins til train = " + minTilTrain);

        var nextOne = moment().add(minTilTrain, "minutes");

        var nextTrain = moment(nextOne).format("hh:mm A");



        // create local 'temporary object' for holding input data
        var newTrain = {
            name: nameNew,
            dest: destNew,
            firstTime: firstTimeNew,
            freq: freqNew,
            next: nextTrain,
            wait: minTilTrain,
        };

        // upload new inputs to database
        database.ref().push(newTrain);

        resetForm()
    });


    database.ref().on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val());

        // Store everything into variables (again?!)
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest;
        var trainFirstTime = childSnapshot.val().firstTime;
        var trainFreq = childSnapshot.val().freq;
        var trainNext = childSnapshot.val().next;
        var trainWait = childSnapshot.val().wait;


        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainFreq),
            $("<td>").text(trainNext),
            $("<td>").text(trainWait),
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