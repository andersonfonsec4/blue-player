const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 200;

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(player.audio);

/* filtros */

const bass = audioCtx.createBiquadFilter();
bass.type = "lowshelf";
bass.frequency.value = 200;

const mid = audioCtx.createBiquadFilter();
mid.type = "peaking";
mid.frequency.value = 1000;
mid.Q.value = 1;

const treble = audioCtx.createBiquadFilter();
treble.type = "highshelf";
treble.frequency.value = 3000;

source.connect(bass);
bass.connect(mid);
mid.connect(treble);
treble.connect(analyser);

analyser.connect(audioCtx.destination);

document.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
});

/* EQ CONTROLES */

function bindEQ(id, filter, valueId) {
  const slider = document.getElementById(id);
  const value = document.getElementById(valueId);

  slider.oninput = (e) => {
    filter.gain.value = e.target.value;

    value.textContent = e.target.value;

    value.style.opacity = 1;
  };

  slider.onmouseleave = () => {
    value.style.opacity = 0;
  };
}

bindEQ("bass", bass, "bass-value");
bindEQ("mid", mid, "mid-value");
bindEQ("treble", treble, "treble-value");

/* volume % */

const volumeSlider = document.getElementById("volume");
const volumeValue = document.getElementById("volume-value");

volumeSlider.oninput = (e) => {
  player.audio.volume = e.target.value;

  volumeValue.textContent = Math.round(e.target.value * 100) + "%";

  volumeValue.style.opacity = 1;
};

volumeSlider.onmouseleave = () => {
  volumeValue.style.opacity = 0;
};

/* visualizer */

analyser.fftSize = 256;

function draw() {
  requestAnimationFrame(draw);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLength;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];

    ctx.fillStyle = "#3a7bff";

    ctx.fillRect(i * barWidth, 200 - barHeight, barWidth - 1, barHeight);
  }
}

draw();
