const playlist = [];

const fileInput = document.getElementById("file-input");
const playlistElement = document.getElementById("playlist");

/* ADICIONAR MÚSICAS */

fileInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);

  if (!files.length) return;

  files.forEach((file) => {
    const url = URL.createObjectURL(file);

    playlist.push({
      name: file.name,
      file: url,
    });
  });

  renderPlaylist();
});

/* RENDERIZAR PLAYLIST */

function renderPlaylist() {
  playlistElement.innerHTML = "";

  playlist.forEach((track, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = track.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.className = "remove";

    removeBtn.onclick = (e) => {
      e.stopPropagation();

      playlist.splice(index, 1);

      renderPlaylist();
    };

    li.appendChild(span);
    li.appendChild(removeBtn);

    li.onclick = () => {
      player.load(index);

      player.play();

      updateTitle();
    };

    playlistElement.appendChild(li);
  });
}
