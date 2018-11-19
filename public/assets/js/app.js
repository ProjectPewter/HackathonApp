function getPosts(category) {
    var categoryString = category || "";
    $.get("/api/ideas" + categoryString, function (data) {
        console.log("Posts", data);
        var posts = data;
        if (!posts || !posts.length) {
            displayEmpty();
        }
        else {
            initializeRows(posts);
        }
    });
}

// Getting the initial list of posts
getPosts();
// InitializeRows handles appending all of our constructed post HTML inside
// blogContainer
function initializeRows(posts) {
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

$(document).ready(function() {
    function updateUserDisplay() {
        $.get("/users/id", function(data) {
            id = data[0].id
            $("#profileName").text(data[0].username)
        })
    }
    updateUserDisplay()
})

$(document).on("click", ".close", function () {
    $("#myModal").hide();
})
// // Modal stuff

// Function that makes the idea cards
var makeCard = function (idea) {
    var colDiv = $("<div>")
    var cardDiv = $("<div>")
    var head = $("<h5>")
    var desc = $("<p>")
    var read = $("<button>")
    var pin = $("<button>")

    colDiv.addClass("col-lg-3")
        .addClass("col-md-4")
        .addClass("col-xs-6")

    cardDiv.addClass("card-desc")

    read.addClass("read-card")
        .attr("id", "read")
        // .attr("data-toggle", "modal")
        // .attr("data-target", "#myModal")
        .attr("data-id", idea.id)
        .text("Read")

    pin.addClass("pin-card")
        .attr("data-id", idea.id)
        .text("Pin")

    head.addClass("card-head")
        .text(idea.name)

    desc.text(idea.details)

    //liking functionality 
    var likeButton = $("<button>")
    likeButton.addClass("like-button btn-default btn-sm")
        .attr("data-id", idea.id)
        .append('<i class="fas fa-thumbs-up"></i>')
        .append('<span class="count"> ' + idea.votes + '</span>')


    cardDiv.append(head)
        .append(desc)
        .append(read)
        .append(pin)
        .append(likeButton)

    colDiv.append(cardDiv)

    $("#cardHolder").append(colDiv)
}


// $("#submit").on("click", function (event) {
//     console.log("click");
//     event.preventDefault();
//     $("#submitModal").hide();
//     $("#successModal").modal();
// });

$(document).ready(function () {

    $("body").on("click", "#all", function () {
        getPosts()
    })
    $("body").on("click", "#recent", function () {
        getPosts("/recent/order")
    })
    $("body").on("click", "#random", function () {
        getPosts("/random/random")
    })
    $("body").on("click", "#votes", function () {
        getPosts("/votes/order")
    })
    $("body").on("click", "#easy", function () {
        getPosts("/difficulty/1")
    })
    $("body").on("click", "#medium", function () {
        getPosts("/difficulty/2")
    })
    $("body").on("click", "#hard", function () {
        getPosts("/difficulty/3")
    })

    $("#cardHolder").on("click", "#read", function () {
        console.log("click");
        var id = $(this).attr("data-id")
        // event.preventDefault();
        $.get("/api/ideas/" + id, function (data) {
            console.log(data)
            var projectName = $('#proj-name')
            var projectDetails = $('#proj-details')
            var projectTech = $('#proj-tech')
            var projectLevel = $('#proj-level')
            var difficultyConvert = {
                1: "Easy",
                2: "Medium",
                3: "Hard"
            }
            projectName.text(data[0].name)
            projectDetails.text(data[0].details)
            projectTech.text(data[0].tech)
            projectLevel.text(difficultyConvert[data[0].difficulty])
        })
        $("#myModal").modal();
    });

    $("#cardHolder").on("click", ".pin-card", function () {
        var alreadyPinned = false;
        console.log("click")
        var id = $(this).attr("data-id")
        alreadyLiked = true;

        if (alreadyLiked) {
            $(this).prop('disabled', true);
        }

        $.post("/api/user/pinned/" + id, function (data) {
            console.log(data)
        })
        alert("Pinned!")
    })


    $("#cardHolder").on("click", ".like-button", function (e) {
        var alreadyLiked = false;
        console.log("liked")
        var id = $(this).attr("data-id")
        var $counter = $(this).find(".count");
        var count = $counter.text() | 0; //corose current count to an int
        count++
        $counter.text(" " + count);//set new count
        alreadyLiked = true;

        if (alreadyLiked) {
            $(this).prop('disabled', true);
        }

        var sentData = {
            votes: count
        }

        //post
        $.post("/api/user/votes/" + id, sentData, function (data) {
            console.log(data)
        })
    });
})
