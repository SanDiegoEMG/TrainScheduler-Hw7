
//Creates a variable that allows us to 'call' the database
var database = firebase.database();

$(document).ready(function () {


    // variables to store the values from the form
    var name = "";
    var dest = "";
    var firstTime = 0;
    var freq = 0;
    var minsAway = 0;
    var nextArrival = 0;
    var myArr = [];
    var newTrain = [];

    function renderTrains(myArr) {
        $("#viewtrains").empty(); //empty out html


    }



    $("#submit-button").on("click", function () {
        event.preventDefault();

        name = $("#train-name").val().trim()
        dest = $("#train-destination").val().trim()
        firstTime = $("#train-first-time").val().trim()
        freq = $("#train-frequency").val().trim()

        newTrain = [name, dest, firstTime, freq];
        myArr.push(newTrain);
        console.log(myArr);

        // for (var i=0; i<myArr.length; i++) {
        //     var newTrainArr = [name, dest, firstTime, freq];
        //     localStorage.setItem("newTrain", newTrainArr);
        //     console.log(newTrainArr);
        // }


        // var newRow = $("<tr></tr>");
        // var rowName = "<td>" + name + "</td>";
        // var rowDestDisp = "<td>" + dest + "</td>";
        // var rowFreq = "<td>" + freq + "</td>";
        // var rowNextArrival = "<td>" + nextArrival + "</td>";
        // var rowMinsAway = "<td>" + minsAway + "</td>";

        // newRow.append(rowName, rowDestDisp, rowFreq, rowNextArrival, rowMinsAway);

        // $("#view-trains").append(newRow);

        // console.log(newRow);


        // database.ref().set({
        //     namedb: name,
        //     destdb: destination,
        //     firstTimedb: firstTime,
        //     freqdb: frequency, 
        // })

        resetForm()

    })







    //returns form fields to default placeholder
    function resetForm() {
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-first-time").val("")
        $("#train-frequency").val("")
    }


});

