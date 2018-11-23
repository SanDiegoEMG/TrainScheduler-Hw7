
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


    $("#submit-button").on("click", function () {
        event.preventDefault();

        name = $("#train-name").val().trim()
        dest = $("#train-destination").val().trim()
        firstTime = $("#train-first-time").val().trim()
        freq = $("#train-frequency").val().trim()


        var newRow = "<tr><td id='namedisplay'>"+ name + "</td><td id='destinationdisplay'>" + dest + "</td><td id='timedisplay'>" + freq + "</td><td id='frequencydisplay'>" + nextArrival + "</td><td>" + minsAway + "</td></tr>"

        console.log(firstTime);

        $("#view-trains").append(newRow);

        // database.ref().set({
        //     name: name,
        //     dest: destination,
        //     firstTime: firstTime,
        //     freq: frequency, 
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

