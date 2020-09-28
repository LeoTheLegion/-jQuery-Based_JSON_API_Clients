
var APIKEY = "";
var POSTERROOT = "http://image.tmdb.org/t/p/w300_and_h450_bestv2/";

$(document).ready(function(){

    $('#term').focus(function(){
       var full = $("#poster").has("img").length ? true : false;
       if(full == false){
          $('#poster').empty();
       }
    });
 
    var getPoster = function(){
 
         var film = $('#term').val();
 
          if(film == '’'){
 
             $('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");
 
          } else {
 
             $('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");
 
             $.getJSON("https://api.themoviedb.org/3/search/movie?api_key="+APIKEY+"&query=" + film, function(json) {
                console.log(json);
                if (json.total_results != 0){
                    var poster_path = POSTERROOT + json.results[0].poster_path;
                    
                    console.log(poster_path);
                      $('#poster').html('<h2 class="loading">Well, gee whiz! We found you a poster, skip!</h2><img id="thePoster" src=' +poster_path+ ' />');
                   } else {
                      $.getJSON("https://api.themoviedb.org/3/search/movie?api_key="+APIKEY+"&query=goonies", function(json) {
                        var poster_path = POSTERROOT + json.results[0].poster_path;
                    
                        console.log(poster_path);
                         $('#poster').html('<h2 class="loading">We\'re afraid nothing was found for that search. Perhaps you were looking for The Goonies?</h2><img id="thePoster" src=' + poster_path + ' />');
                      });
                   }
              });
 
           }
 
         return false;
    }
 
    $('#search').click(getPoster);
    $('#term').keyup(function(event){
        if(event.keyCode == 13){
            getPoster();
        }
    });
 
 });
