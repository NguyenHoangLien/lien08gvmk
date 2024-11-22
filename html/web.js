 // Wait for DOM content to be loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Get the audio element by its ID
    const audio = document.getElementById("myAudio");
   
let  playingOnHide =false;

  
    // Event listener for visibility change
    document.addEventListener("visibilitychange", () => {
      // Check if document is hidden
      if (document.hidden) {
        // Pause audio when document is hidden
        playingOnHide = !audio.paused; // Check if audio was playing before hiding
        audio.pause(); // Pause audio playback
      } else {
        // Resume audio playback when document becomes visible
        if (playingOnHide) {
          audio.play(); // Resume playback if audio was playing before hiding
        }
      }
    });
  });


var myAudio = document.getElementById("myAudio");

function togglePlay() {
if(!myAudio.ended) { return myAudio.paused ? myAudio.play() : myAudio.pause();}
};

$(".panel-main").resizable({
   handleSelector: ".splitter",
   resizeHeight: window.matchMedia("(max-aspect-ratio: 1)").matches,
resizeWidth:window.matchMedia("(min-aspect-ratio: 1)").matches,
 });
// 
window.onresize = function(event) {
    $(".panel-main").resizable({
   handleSelector: ".splitter",
   resizeHeight: window.matchMedia("(max-aspect-ratio: 1)").matches,
resizeWidth:window.matchMedia("(min-aspect-ratio: 1)").matches,
 });

};
    var myFullpage = new fullpage('#fullpage', {
            controlArrows: false,
       
        slidesNavigation: true, 
        navigation: true,
        normalScrollElements: '.scrollable-element',
        
    });



 
    


       
   
				