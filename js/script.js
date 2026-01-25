const startVideo = document.getElementById("start-vid");
const loopVideo = document.getElementById("loop-vid");

loopVideo.currentTime = 15;
loopVideo.play();

/* AI Learnings:
- CSS transition = the instructions for how to change (smooth, 5 seconds, ease-in-out)
- JavaScript = the command that tells it to change (from current value to new value)
- I offset the video by 15 seconds so the replay is seamless
*/

let startFading = false;
let loopFading = false;

startVideo.addEventListener('timeupdate', function () {
    if (startVideo.currentTime >= 25 && !startFading) {
        startFading = true;  // flag so this doesn't run again
        startVideo.style.opacity = 0
        loopVideo.style.opacity = 1
    }
    if (startVideo.currentTime >= 29.5) {
        startVideo.currentTime = 0
        startFading = false;
    }
});

loopVideo.addEventListener('timeupdate', function () {
    if (loopVideo.currentTime >= 25 && !loopFading) {
        startVideo.style.opacity = 1
        loopVideo.style.opacity = 0
        loopFading = true;
    }
    if (loopVideo.currentTime >= 29.5) {
        loopVideo.currentTime = 0
        loopFading = false;  // reset the flag
    }
});

