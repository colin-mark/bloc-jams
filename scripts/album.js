var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    var $row = $(template);

    var onHover = function(event) {
        var songNumber = $(this).find('.song-item-number');

        if (songNumber.data('song-number') != currentlyPlayingSongNumber) {
            songNumber.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.data('song-number');
        if (songNumber != currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    var clickHandler = function(event) {
        var songNumber = $(this).data('song-number');

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell();
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong(null);
        }
    };

    $row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    //identify the nodes and return the nod values
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    //clear the song list HTML to make sure there are no interfering elements
    $albumSongList.empty();
    //use for loop to go through all the songs and insert them into the html
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function () {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
