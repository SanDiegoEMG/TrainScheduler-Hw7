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
        database.ref("/TrainBroken").push(newTrain);
        console.log(newTrain);
        var what = JSON.stringify(newTrain);
        console.log("This is stringified object newTrain: " + what);

        // OR 
        // could nest inside the command

        // database.ref("/TrainBroken").push({
        //     name: nameNew,
        //     dest: destNew,
        //     firstTime: firstTimeNew,
        //     freq: freqNew,
        //     next: nextTrain,
        //     wait: minTilTrain,
        // });

        //  Same Difference

        resetForm()
    });


    // Separate ... not a part of the submit-button function .. monitoring for changes to the database
    database.ref("/TrainBroken").on("child_added", function (Snapshot) {

        console.log(Snapshot.val());

        // Store everything into variables (again?!)
        var trainName = Snapshot.val().name;
        var trainDest = Snapshot.val().dest;
        var trainFreq = Snapshot.val().freq;
        var trainNext = Snapshot.val().next;
        var trainWait = Snapshot.val().wait;
        var keyName = Snapshot.key;


        // setting up and testing variables for update functionality
        var forUpdate = {
            key: keyName,
            TrainName: trainName,
            Destinations: trainDest,
            Frequency: trainFreq,
        };

        var forUpdateString = JSON.stringify(forUpdate);

        console.log(forUpdate.key) // This prints the key
        console.log("stringified reference: " + forUpdateString.key); // undefined bc you can't get a value from a key of a string!
        console.log("Just forUpdateString: " + forUpdateString);

        // Create the new row
        var tr = $("<tr>");
        tr.addClass(Snapshot.key)
        tr.append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainFreq + " mins"),
            $("<td>").text(trainNext),
            $("<td>").text(trainWait),
            $("<td>").append("<input class='delete' type='checkbox'>").attr("update-data", forUpdateString),
            $("<td>").append($("<button class='btn btn-secondary update-btn'></button>").text("Update").attr("update-data", forUpdateString)),
        );


        $(document).on("click", ".update-btn", function (e) {
            e.preventDefault();
            var forUpdate = JSON.parse($(this).attr("update-data"));
            console.log(forUpdate);
            var makeChanges = {};
            makeChanges["/TrainBroken/" + forUpdate.key] = {
                key: Snapshot.key,
                TrainName: "UPdateTHIS",
                Destinations: "fromUpdate",
                Frequency: trainFreq,
            }

            database.ref("/TrainBroken").on("child_changed, function(snapshot")
        
            database.ref().update(makeChanges);
        });

        $("#view-trains").append(tr);

    });





    function resetForm() {
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-first-time").val("");
        $("#train-frequency").val("");
    };
});


