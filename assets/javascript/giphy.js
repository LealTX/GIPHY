$(document).ready(function () {

    var topics = ["the batman", "the superman", "joker", "darkseid", "godzilla", "predator", "terminator"]

    // Display Buttons
    function showButtons() {
        $("#buttons-view").empty();

        topics.forEach(function (val, i) {
            var topic = topics[i];
            topicNoSpace = topic.split(" ").join("+");
            // console.log(topicNoSpace);
            var newButton = $("<button>");
            newButton.addClass("topic-btn");
            newButton.attr("data-name",topicNoSpace);
            newButton.text(topic);
            $("#buttons-view").append(newButton);

        });
    }
    
    // Display Gifs when button click
    function displayGifs() {
               
        var searchTopic = $(this).attr("data-name");
        var apiURL = "https://api.giphy.com/v1/gifs/search?q="+ searchTopic +"&api_key=beDexIJohUGNq0cNMKoin2Vlmfhsn9Xc&limit=10";
        console.log(apiURL);

        $.ajax({
            url: apiURL,
            method:"GET"
        }).then(function(response) {
            $("#giphy-view").empty();

            var giphyDiv = $("<div class='newGiphy'>");
            
            var giphyLength = response.data.length;

            for(var i = 0; i < giphyLength; i++){
                var newRow = $("<tr>");
                var indDiv = $("<div class='single'>");
                var grabRating = response.data[i].rating;
                var pRating = $("<h5>").text("Rating: "+grabRating);
                
                var grabStill = response.data[i].images.fixed_height_still.url;
                var grabAnimate = response.data[i].images.fixed_height.url;
                var imageElmt = $("<img>");
                imageElmt.addClass("giphyImg");
                imageElmt.attr("src", grabStill);
                imageElmt.attr("data-status","still");
                imageElmt.attr("data-still", grabStill);
                imageElmt.attr("data-animate", grabAnimate);
                
                indDiv.prepend(imageElmt);
                newRow.prepend(pRating);
                indDiv.prepend(newRow);
                giphyDiv.append(indDiv);

                $("#giphy-view").append(giphyDiv);
            }
        })
    }

    // Start and Stop Animations when clicked 
    function animateGif() {
        if( $(this).attr("data-status") === "still" ){
            $(this).attr("data-status", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
        }else {
            $(this).attr("data-status", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    }

    // Run Function to Show Giphys
    $(document).on("click",".topic-btn",displayGifs);
    // Starts animateGif Function
    $(document).on("click",".giphyImg",animateGif);

    // Add New Buttons 
    $("#add-giphy").on("click", function(){
        event.preventDefault();
        var giphyNew = $("#giphy-input").val().trim();
        $("#giphy-input").val("");
        topics.push(giphyNew);
        showButtons();
    })

    showButtons();


});