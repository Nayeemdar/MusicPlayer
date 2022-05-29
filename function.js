// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Meri Zindagi Hai Tu",
	artist: "",
	image: "data:image/jpeg;base64,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",
	path: "output/Meri Zindagi Hai Tu_320(PagalWorld.com.se).mp3"
},
{
	name: "Rehna Tere Paas",
	artist: "",
	image: "",
	path: "output/Rehna Tere Paas_320(PagalWorld.com.se).mp3"
},
{
	name: "Sohna",
	artist: "",
	image: "",
	path: "output/Sohna_320(PagalWorld.com.se).mp3",
},
{
	name: "Tumse Pyaar Karke",
	artist: "",
	image: "https://c.saavncdn.com/204/Tumse-Pyaar-Karke-Hindi-2022-20220201031001-500x500.jpg",
	path: "output/Tumse Pyaar Karke_320(PagalWorld.com.se).mp3",
},


];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }

        
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);
            