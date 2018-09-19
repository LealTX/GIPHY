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
    
    // Display Gifs when click
    function displayGifs() {
               
        var searchTopic = $(this).attr("data-name");
        var apiURL = "https://api.giphy.com/v1/gifs/search?q="+ searchTopic +"&api_key=beDexIJohUGNq0cNMKoin2Vlmfhsn9Xc&limit=10";
        console.log(apiURL);

        $.ajax({
            url: apiURL,
            method:"GET"
        }).then(function(response) {
            console.log(response);
            $("#giphy-view").empty();

            var giphyDiv = $("<div class='newGiphy'>");
            
            var giphyLength = response.data.length;
            console.log(giphyLength);

            for(var i = 0; i < giphyLength; i++){
                var newRow = $("<tr>");
                var indDiv = $("<div class='single'>");
                var grabRating = response.data[i].rating;
                var pRating = $("<h5>").text("Rating: "+grabRating);
                console.log(pRating);
                
                var grabStill = response.data[i].images.fixed_height_small_still.url;
                var stillImage = $("<img class='singleImage'>").attr("src", grabStill);

                indDiv.prepend(stillImage);
                newRow.prepend(pRating);
                indDiv.prepend(newRow);
                giphyDiv.append(indDiv);

                $("#giphy-view").append(giphyDiv);
            }
        })
    }

    // Run Function to Show Giphys
    $(document).on("click",".topic-btn",displayGifs);
    $(document).on("click",".singleImage",displayGifs);

    showButtons();


});