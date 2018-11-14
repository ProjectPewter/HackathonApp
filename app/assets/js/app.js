// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

$(document).on("click", ".close", function(){
    $("#myModal").hide();
})

// // Activate submit button
$("#read-card").on("click", function(event) {
console.log("click");
event.preventDefault();
$("#myModal").modal();
});

// Function that makes the idea cards
var makeCard = function (idea) {
    var colDiv = $("<div>")
    var cardDiv = $("<div>")
    var head = $("<h5>")
    var desc = $("<p>")
    var read = $("<a>")
    var pin = $("<a>")

    colDiv.addClass("col-lg-3")
    .addClass("col-md-4")
    .addClass("col-xs-6")

    cardDiv.addClass("card-desc")

    read.attr("href", idea.link)
    .addClass("read-card")
    .attr("data-toggle", "modal")
    .attr("data-target", "#myModal")
    .text("Read")

    pin.attr("href", idea.link)
    .addClass("pin-card")
    .text("Pin")

    head.text(idea.name)

    desc.text(idea.details)

    cardDiv.append(head)
    .append(desc)
    .append(read)
    .append(pin)

    colDiv.append(cardDiv)

    $("#cardHolder").append(colDiv)
}

// Capture the form inputs
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Form validation
    function validateForm() {
        var isValid = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });

        $(".chosen-select").each(function () {

            if ($(this).val() === "") {
                isValid = false;
            }
        });
        return isValid;
    }

    // If all required fields are filled
    if (validateForm()) {
        // Create an object for the user"s data
        var userData = {
            name: $("#name").val(),
            details: $("#photo").val(),
            tech: 3,
            difficulty: 4

        };

        // AJAX post the data to the friends API.
        $.post("/api/friends", userData, function (data) {

            // Grab the result from the AJAX post so that the best match's name and photo are displayed.
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

            // Show the modal with the best match
            $("#results-modal").modal("toggle");

        });
    } else {
        alert("Please fill out all fields before submitting!");
    }
});