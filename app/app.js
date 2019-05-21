/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//create
let createItem = function() {
  let songList = JSON.parse(window.localStorage.getItem('songList')) || [];
  let songName = $("#songName").val();
  let artist = $("#artist").val();
  let bpm = $("#bpm").val();
  let genre = $("#genre").val();
  let youtubeLink = $("#youtubeLink").val();
  let difficulty = $("#difficulty").val();

  let key = artist + ' - ' + songName;
  let value = {};

  value.songName = songName;
  value.artist = artist;
  value.bpm = bpm;
  value.genre = genre;
  value.youtubeLink = youtubeLink;
  value.difficulty = difficulty;

  songList.push(value);

  return window.localStorage.setItem('songList', JSON.stringify(songList));
}

// Delete button
let createDeleteButton = function(songName, artist, songNum) {
  let deleteButton = $('<button></button>').addClass('deleteButton').attr('id', 'del' + songNum);
  deleteButton.text('delete this song');

  
  return deleteButton;   
}

let deleteFromLocalStorage = function(artist, songName) {
  let songList = JSON.parse(window.localStorage.getItem('songList'));
  let filterSongList = songList.filter(function(ele) {
    return !(ele.artist === artist && ele.songName === songName);
  });
  return window.localStorage.setItem('songList', JSON.stringify(filterSongList));
}

let renderSongList = function() {
  let songList = JSON.parse(window.localStorage.getItem('songList')) || [];
  for (let i = 0; i < songList.length; i++) {
    let songNum = 'song' + i;
    let artist = songList[i].artist;
    let songName = songList[i].songName;
    // console.log(songNum);
    let $song = $('<li></li>').addClass('songItem').attr('id', songNum).text(artist + ' - ' + songName);
    // console.log(createDeleteButton(songName, artist, songNum));

    let $deleteButton = createDeleteButton(songName, artist, songNum);
    // console.log($deleteButton);

    $('#listContainer').append($song, $deleteButton);
    $('#del' + songNum).on('click', function() { // The delete functionality has to be defined after the button is appended.
      $('#' + songNum).remove(); // remove songDiv
      deleteFromLocalStorage(artist, songName); // delete from local storage
      $('#del' + songNum).remove(); // remove the button itself
    });
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
