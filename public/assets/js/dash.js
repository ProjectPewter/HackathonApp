$(document).ready(function () {
    function updateUserDisplay() {
        $.get("/users/id", function (data) {
            id = data[0].id
            $("#profileName").text(data[0].username)
        })
    }

    updateUserDisplay()

    function getPosts(category) {
        var categoryString = category || "";
        $.get("/api/ideas" + categoryString, function (data) {
            console.log("Posts", data);
            var posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            }
            else {
                makeCard(posts[0]);
            }
        });
    }
    function getPins() {
        $.get("/api/user/pinned", function (data) {
            console.log("Pins", data)
            var pins = data
            for (var i = 0; i < pins.length; i++) {
                getPosts("/" + pins[i].pin)
            }
            // getPosts()
        })
    }
    getPins()
    
    // This function displays a message when there are no posts
    function displayEmpty() {
        $(".profile-content").empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No pins yet, navigate <a href='/'>here</a> in order to pin more posts.");
        $(".profile-content").append(messageH2);
    }

    $(document).on("click", ".close", function () {
        $("#myModal").hide();
    })

    $("body").on("click", "#submit", function (event) {
        console.log("click");
        event.preventDefault();
        // Gather user inputs
        function validateForm() {
            var isValid = true;
            $(".form-control").each(function () {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });

            $(".select").each(function () {

                if ($(this).val() === "") {
                    isValid = false;
                }
            });
            return isValid;
        }
        if (validateForm()) {

            console.log($(".text-tags"))
            console.log($(".text.tag"))
            console.log($('.text-label'))
            var techno = Array.from($('.text-tags .text-tag .text-label'), x => x.innerText)

            var newIdea = {
                ideaName: $("#idea-name-input").val().trim(),
                details: $("#details-input").val().trim(),
                tech: techno.join(', '),
                difficulty: $("#level").val().trim()
            };
            $.post("/api/ideas", newIdea, function (data) {
                console.log(data)
            })
            console.log("click");
            $("#submitModal").hide();
            // $("#successModal").hide();
            $("#successModal").show();

            $(".modal-backdrop").hide();
        } else {
            alert("Please fill out all fields before submitting!");
        }
    });

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
            // .attr("data")
            // .attr("data-toggle", "modal")
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
            // .append(pin)
            // .append(likeButton)
    
        colDiv.append(cardDiv)
    
        $(".profile-content").append(colDiv)
    }

    $(".profile-content").on("click", "#read", function () {
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
})

$(document).ready(function() {
    function updateUserDisplay() {
        $.get("/users/id", function(data) {
            id = data[0].id
            $("#profileName").text(data[0].username)
        })
    }
    updateUserDisplay()
})

var availableTags = [
    "4th Dimension",
    "ABAP",
    "ABC",
    "ActionScript",
    "Ada",
    "Agilent VEE",
    "Algol",
    "Alice",
    "Angelscript",
    "Apex",
    "APL",
    "AppleScript",
    "Arc",
    "Arduino",
    "ASP",
    "AspectJ",
    "Assembly",
    "ATLAS",
    "Augeas",
    "AutoHotkey",
    "AutoIt",
    "AutoLISP",
    "Automator",
    "Avenue",
    "Awk",
    "Bash",
    "(Visual) Basic",
    "bc",
    "BCPL",
    "BETA",
    "BlitzMax",
    "Boo",
    "Bourne Shell",
    "Bro",
    "C",
    "C Shell",
    "C#",
    "C++",
    "C++/CLI",
    "C-Omega",
    "Caml",
    "Ceylon",
    "CFML",
    "cg",
    "Ch",
    "CHILL",
    "CIL",
    "CL (OS/400)",
    "Clarion",
    "Clean",
    "Clipper",
    "Clojure",
    "CLU",
    "COBOL",
    "Cobra",
    "CoffeeScript",
    "ColdFusion",
    "COMAL",
    "Common Lisp",
    "Coq",
    "cT",
    "Curl",
    "D",
    "Dart",
    "DCL",
    "DCPU-16 ASM",
    "Delphi/Object Pascal",
    "DiBOL",
    "Dylan",
    "E",
    "eC",
    "Ecl",
    "ECMAScript",
    "EGL",
    "Eiffel",
    "Elixir",
    "Emacs Lisp",
    "Erlang",
    "Etoys",
    "Euphoria",
    "EXEC",
    "F#",
    "Factor",
    "Falcon",
    "Fancy",
    "Fantom",
    "Felix",
    "Forth",
    "Fortran",
    "Fortress",
    "(Visual) FoxPro",
    "Gambas",
    "GNU Octave",
    "Go",
    "Google AppsScript",
    "Gosu",
    "Groovy",
    "Haskell",
    "haXe",
    "Heron",
    "HPL",
    "HyperTalk",
    "Icon",
    "IDL",
    "Inform",
    "Informix-4GL",
    "INTERCAL",
    "Io",
    "Ioke",
    "J",
    "J#",
    "JADE",
    "Java",
    "Java FX Script",
    "JavaScript",
    "JScript",
    "JScript.NET",
    "Julia",
    "Korn Shell",
    "Kotlin",
    "LabVIEW",
    "Ladder Logic",
    "Lasso",
    "Limbo",
    "Lingo",
    "Lisp",
    "Logo",
    "Logtalk",
    "LotusScript",
    "LPC",
    "Lua",
    "Lustre",
    "M4",
    "MAD",
    "Magic",
    "Magik",
    "Malbolge",
    "MANTIS",
    "Maple",
    "Mathematica",
    "MATLAB",
    "Max/MSP",
    "MAXScript",
    "MEL",
    "Mercury",
    "Mirah",
    "Miva",
    "ML",
    "Monkey",
    "Modula-2",
    "Modula-3",
    "MOO",
    "Moto",
    "MS-DOS Batch",
    "MUMPS",
    "NATURAL",
    "Nemerle",
    "Nimrod",
    "NQC",
    "NSIS",
    "Nu",
    "NXT-G",
    "Oberon",
    "Object Rexx",
    "Objective-C",
    "Objective-J",
    "OCaml",
    "Occam",
    "ooc",
    "Opa",
    "OpenCL",
    "OpenEdge ABL",
    "OPL",
    "Oz",
    "Paradox",
    "Parrot",
    "Pascal",
    "Perl",
    "PHP",
    "Pike",
    "PILOT",
    "PL/I",
    "PL/SQL",
    "Pliant",
    "PostScript",
    "POV-Ray",
    "PowerBasic",
    "PowerScript",
    "PowerShell",
    "Processing",
    "Prolog",
    "Puppet",
    "Pure Data",
    "Python",
    "Q",
    "R",
    "Racket",
    "REALBasic",
    "REBOL",
    "Revolution",
    "REXX",
    "RPG (OS/400)",
    "Ruby",
    "Rust",
    "S",
    "S-PLUS",
    "SAS",
    "Sather",
    "Scala",
    "Scheme",
    "Scilab",
    "Scratch",
    "sed",
    "Seed7",
    "Self",
    "Shell",
    "SIGNAL",
    "Simula",
    "Simulink",
    "Slate",
    "Smalltalk",
    "Smarty",
    "SPARK",
    "SPSS",
    "SQR",
    "Squeak",
    "Squirrel",
    "Standard ML",
    "Suneido",
    "SuperCollider",
    "TACL",
    "Tcl",
    "Tex",
    "thinBasic",
    "TOM",
    "Transact-SQL",
    "Turing",
    "TypeScript",
    "Vala/Genie",
    "VBScript",
    "Verilog",
    "VHDL",
    "VimL",
    "Visual Basic .NET",
    "WebDNA",
    "Whitespace",
    "X10",
    "xBase",
    "XBase++",
    "Xen",
    "XPL",
    "XSLT",
    "XQuery",
    "yacc",
    "Yorick",
    "Z shell",
];
$('#LanguagesTags').textext({
    plugins: 'autocomplete filter tags'
}).bind('getSuggestions', function (e, data) {
    textext = $(e.target).textext()[0]
    query = (data ? data.query : '') || ''

    $(this).trigger(
        'setSuggestions',
        { result: textext.itemManager().filter(availableTags, query) }
    );
})