// if whatever is clicked, return it as filter 

let categories = Array.from(document.getElementsByClassName("category")[0].children);


categories.forEach(function(category) {
    category.addEventListener("click", function() {
        buttonState(); 
        //
        var workoutType = category.id;
        //
        let button = document.getElementById(workoutType);
        button.classList.add('active');
        //
        return getVideos(workoutType);
        
    });
});

// FUNCTIONS 

function buttonState() {

    for (i = 0; i < categories.length; i++) { 
        if (categories[i].classList.contains('active') === true) {
            categories[i].classList.remove('active');
        };
      }
    
}

function getVideos(filter) {

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: ' ',
            q: filter,
            part: 'snippet',
            maxResults: 50,
            type: 'video',
            videoDefinition: 'high', 
            videoEmbeddable: true,
        },
        success: function(data){
            selectOneVideo(data);
        },
        error: function(response){
           getVideosBackUp(filter); 
           
        }
    });
}

function getVideosBackUp(filter){
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: ' ',
            q: filter,
            part: 'snippet',
            maxResults: 50,
            type: 'video',
            videoDefinition: 'high', 
            videoEmbeddable: true,
        },
        success: function(data){
            selectOneVideo(data);
        },
        error: function(response){
            document.querySelector('#section-video').innerHTML = '<div class="error-message"><center><font size="7px">&#128565</font></center><br>Sorry - We have reached the maximum number of API calls for today. Please try again <b>tomorrow from 3pm (GMT +8)</b>. We are very sorry for the inconvenience caused. Soon, a <b>new version</b> of fitnessbud will be released with <b>enhanced functionalities</b> and <b>no downtime</b>! &#128521; &#127793; &#127941;</div>';
           
        }
    });
}

function selectOneVideo(data){
    // SELECTS ONE VIDEO RANDOMLY 

    // 1. get random number out of 25
    var random = getRandomIntInclusive(1, 25);

    // 2. select index = random number from array, save data.items[i] into a variable
    var chosenVideo = data.items[random];  

    // 3. return video to user
    embedVideo(chosenVideo); 
    }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function embedVideo(data) {
    if (document.querySelector('img') != null) {
        document.querySelector('img').parentElement.innerHTML = '<div class="videoWrapper" id="video"><iframe src="" frameborder="0" allowfullscreen></iframe></div>';
    }; 
      $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.id.videoId);
}

