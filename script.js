const n = 20;
const array = [];
init();

let audioCtx = null;

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.5;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}

function play() {
  bubbleSort(array);
  showBars();
}

function play() {
  const copy = [...array];
  const moves = bubbleSort(array);
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }

  playNote(200 + array[i] * 500);
  playNote(200 + array[j] * 500);
  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, 100);
}

function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}

function bubbleSort(array) {
  const moves = [];
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      //moves.push({indices:[i-1,i],type:"swap"});
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({
          indices: [i - 1, i],
          type: "swap",
        });
        moves.push([i - 1, i]);
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}
