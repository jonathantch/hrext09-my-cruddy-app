/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

// Add functionality
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

// Delete functionality
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

    let $song = $('<li></li>').addClass('songItem').attr('id', songNum).text(artist + ' - ' + songName);
    let $deleteButton = createDeleteButton(songName, artist, songNum);

    $('#listContainer').append($song, $deleteButton);

    $('#del' + songNum).on('click', function() { // The delete functionality has to be defined after the button is appended.
      $('#' + songNum).remove(); // remove songDiv
      deleteFromLocalStorage(artist, songName); // delete from local storage
      $('#del' + songNum).remove(); // remove the button itself
    });

    // Render song details when you click on a certain song
    $('#' + songNum).on('click', function() {
      $('#infoContainer').empty();
      for (let key in songList[i]) {
        let $itemContainer = $('<li></li').addClass('itemContainer').attr('id', songNum + key + '');  
        let $infoKey = $('<div></div>').addClass('infoKey').attr('id', songNum + key + 'InfoKey').text(key + ': ');
        let $infoValue = $('<div></div>').addClass('infoValue').attr('id', songNum + key + 'InfoValue').attr('contenteditable', 'true').text(songList[i][key]);
        let $saveButton = $('<button></button>').addClass('saveButton').attr('id', songNum + key + 'SaveButton').text('Save');
        
        $itemContainer.append($infoKey, $infoValue);
        $('#infoContainer').append($itemContainer, $saveButton);
        
        // Edit Functionality
        $('#' + songNum + key + 'SaveButton').on('click', function() {
          songList[i][key] = $infoValue.text();
          window.localStorage.setItem('songList', JSON.stringify(songList));
          alert('Save Successfully!')
        });
      }
    });
  }
}


$(document).ready(function() {
  renderSongList();
  $('#addSong').click(function(event) {
    $('#listContainer').empty();   
    createItem();
    renderSongList();
    $('#addSong').reset()
  });
});


// Good Love Is On The Way, John Mayer, 93, blues, https://www.youtube.com/watch?v=6OxE1p_YKOI, Easy
// I Don't Wanna Miss A Thing, AeroSmith, 61, soft rock, https://www.youtube.com/watch?v=JkK8g6FMEXE, Easy
