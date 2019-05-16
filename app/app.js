/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
}

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

var renderList = function() {
  for (var key in window.localStorage) { // key = artist + songName
    var songObj = JSON.stringify(getItem(key));
    var $song = $('<div></div>').addClass('songItem');
    $song.text(key);
    console.log(songObj);
    // eachItemDiv.appendTO('#listContainer');
  }
}

// //update
// var updateItem = function(key, value) {
//   return window.localStorage.setItem(key, value);
// }

// //delete
// var deleteItem = function(key) {
//   return window.localStorage.removeItem(key);
// }

// //clear everything
// var clearEverything = function() {
//   return window.localStorage.clear();
// }

// var keyExists = function(key) {
//   var currentValue = getItem(key);
//   return currentValue !== null;
// }


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  renderList();
  $('#addSong').click(function(event) {
    // event.preventDefault();
    createItem();
  });
  
});
