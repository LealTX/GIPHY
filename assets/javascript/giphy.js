$(document).ready(function () {

    var topics = ["batman", "superman", "joker", "darkseid", "godzilla", "predator", "terminator"]

    // Display Buttons
    function showButtons() {
        $("#buttons-view").empty();

        topics.forEach(function (val, i) {
            var topic = topics[i];
            console.log(topic);
            var newButton = $("<button>");
            newButton.addClass("topic");
            newButton.attr("data-name",topic);
            newButton.text(topic);
            $("#buttons-view").append(newButton);

        });
    }

    showButtons();


});