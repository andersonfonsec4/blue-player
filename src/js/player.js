const audio = new Audio();

let playlist = [];
let currentIndex = 0;

function playTrack(index) {
  currentIndex = index;
  const track = playlist[index];

  audio.src = track.url;
  audio.play();

  document.getElementById("trackTitle").innerText = track.name;

  updateMediaSession(track.name);
}

function nextTrack() {
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    playTrack(currentIndex);
  }
}

function prevTrack() {
  if (currentIndex > 0) {
    currentIndex--;
    playTrack(currentIndex);
  }
}

/* Media Session API */

function updateMediaSession(title) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: "BluePlayer",
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      prevTrack();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      nextTrack();
    });
  }
}

/* passar música automaticamente */

audio.addEventListener("ended", () => {
  nextTrack();
});
