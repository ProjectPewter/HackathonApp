

function getPosts(category) {
    var categoryString = category || "";
    $.get("/api/ideas" + categoryString, function (data) {
        console.log("Posts", data);
        posts = data;
        if (!posts || !posts.length) {
            displayEmpty();
        }
        else {
            initializeRows();
        }
    });
}

// Getting the initial list of posts
getPosts();
// InitializeRows handles appending all of our constructed post HTML inside
// blogContainer
function initializeRows() {
    $("#cardHolder").empty();
    for (var i = 0; i < posts.length; i++) {
        makeCard(posts[i])
    }
}
// This function displays a message when there are no posts
function displayEmpty() {
    $("#cardHolder").empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/dashboard'>here</a> in order to create a new post.");
    $("#cardHolder").append(messageH2);
}

// This function handles reloading new posts when the category changes
function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modal things
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

//For the modal
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

$(document).on("click", ".close", function () {
    $("#myModal").hide();
})

// // Modal stuff
$("#read-card").on("click", function (event) {
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
    var projectName = $('#proj-name')
    var projectDetails = $('#proj-details')
    var projectTech = $('#proj-tech')
    var projectLevel = $('#proj-level')
    var difficultyConvert = {
        1: "Easy",
        2: "Medium",
        3: "Hard"
    }
    projectName.text(idea.name)
    projectDetails.text(idea.details)
    projectTech.text(idea.tech)
    projectLevel.text(difficultyConvert[idea.difficulty])

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

    head.addClass("card-head")
        .text(idea.name)

    desc.text(idea.details)

    cardDiv.append(head)
        .append(desc)
        .append(read)
        .append(pin)

    colDiv.append(cardDiv)

    $("#cardHolder").append(colDiv)
}

// Capture the form inputs
// $("#submit").on("click", function (event) {
//     event.preventDefault();

//     // Form validation
//     function validateForm() {
//         var isValid = true;
//         $(".form-control").each(function () {
//             if ($(this).val() === "") {
//                 isValid = false;
//             }
//         });

//         $(".chosen-select").each(function () {

//             if ($(this).val() === "") {
//                 isValid = false;
//             }
//         });
//         return isValid;
//     }

//     // If all required fields are filled
//     if (validateForm()) {
//         // Create an object for the user"s data
//         var userData = {
//             name: $("#name").val(),
//             details: $("#photo").val(),
//             tech: 3,
//             difficulty: 4

//         };

//         // AJAX post the data to the friends API.
//         $.post("/api/friends", userData, function (data) {

//             // Grab the result from the AJAX post so that the best match's name and photo are displayed.
//             $("#match-name").text(data.name);
//             $("#match-img").attr("src", data.photo);

//             // Show the modal with the best match
//             $("#results-modal").modal("toggle");

//         });
//     } else {
//         alert("Please fill out all fields before submitting!");
//     }
// });

$("#submit").on("click", function (event) {
    console.log("click");
    event.preventDefault();
    // Gather user inputs
    var newIdea = {
        ideaName: $("#idea-name-input").val().trim(),
        details: $("#details-input").val().trim(),
        tech: $("#tech-input").val().trim(),
        difficulty: $("#level-input").val().trim()
    };
    $.post("/api/ideas", newIdea, function (data) {
        console.log(data)
    })
    console.log("click");
    $("#submitModal").hide();
    $("#successModal").modal();
});

// $("#submit").on("click", function (event) {
//     console.log("click");
//     event.preventDefault();
//     $("#submitModal").hide();
//     $("#successModal").modal();
// });
$(document).on("click", ".close-success", function () {
    $("#successModal").hide();
    $(".modal-backdrop").hide();
})


$(document).ready(function () {


    $("#recent").on("click", function () {
        getPosts("/recent")
    })
    $("#votes").on("click", function () {
        getPosts("/votes")
    })
    $("#easy").on("click", function () {
        getPosts("/difficulty/1")
    })
    $("#medium").on("click", function () {
        getPosts("/difficulty/2")
    })
    $("#hard").on("click", function () {
        getPosts("/difficulty/3")
    })
})
