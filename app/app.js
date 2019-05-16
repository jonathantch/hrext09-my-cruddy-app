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
  var songList = JSON.parse(window.localStorage.getItem('songList')) || [];
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

  songList.push(value);

  return window.localStorage.setItem('songList', JSON.stringify(songList));
}

var renderSongList = function() {
  var songList = JSON.parse(window.localStorage.getItem('songList')) || [];
  for (var i = 0; i < songList.length; i++) {
    var artist = songList[i].artist;
    var songName = songList[i].songName;
    var $song = $('<div></div>').addClass('songItem').attr('id', artist + '-' + songName);
    $song.text(artist + ' - ' + songName);

    $('#listContainer').append($song);
  }
}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  renderSongList();
  $('#addSong').click(function(event) {
    // event.preventDefault();   
    createItem();
    renderSongList();
  });
});


// Good Love Is On The Way, John Mayer, 93, blues, https://www.youtube.com/watch?v=6OxE1p_YKOI, Easy
// I Don't Wanna Miss A Thing, AeroSmith, 61, soft rock, https://www.youtube.com/watch?v=Ss0kFNUP4P4, Easy
