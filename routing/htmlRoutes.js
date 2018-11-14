var path = require("path");//connects files

module.exports = function (app) {
    
    //create path to connect html pages
    app.get("/", function (request, response) {
        response.sendFile(path.join(__dirname, "index.html"));
    });

    app.get("/dashboard", function (request, response) {
        response.sendFile(path.join(__dirname, "dashboard.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(request, response) {
    response.sendFile(path.join(__dirname, "index.html"));
  });

};