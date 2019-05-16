/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//create
var createItem = function() {
  var songName = $("#songName").val();
    var artist = $("#artist").val();
    var bpm = $("#bpm").val();
    var genre = $("#genre").val();
    var youtubeLink = $("#youtubeLink").val();
    var difficulty = $("#difficulty").val();

    var key = artist + ' - ' + songName;
    var value = {};

    value.songName = songName;
    value.artist = artist;
    value.bpm = bpm;
    value.genre = genre;
    value.youtubeLink = youtubeLink;
    value.difficulty = difficulty;

    return window.localStorage.setItem(key, JSON.stringify(value));
}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  $('#addSong').click(function(event) {
    // event.preventDefault();
    createItem();
  });
});
