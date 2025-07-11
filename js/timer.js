const playBtn = document.querySelector(".play-btn");
const resetBtn = document.querySelector(".reset");

let timerId;
function timerHandler(endTime, timeout) {
  function timer() {
    const now = Date.now();
    const timeLeft = endTime - now;
    let calcHrs = Math.floor(timeLeft / 3600000);
    let calcMin = Math.floor((timeLeft % 3600000) / 60000);
    let calcSec = Math.floor((timeLeft % 60000) / 1000);

    document.getElementById("hrs").value = calcHrs;
    document.getElementById("min").value = calcMin;
    document.getElementById("sec").value = calcSec;

    if (timeLeft <= 0) {
      alert("타이머 종료");
      clearInterval(timerId);
      document.getElementById("hrs").value = 0;
      document.getElementById("min").value = 0;
      document.getElementById("sec").value = 0;
      playBtn.classList.remove("stop");
      playBtn.classList.add("start");
    }
  }
  timer();
  timerId = setInterval(timer, timeout);
}

playBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) {
    e.target.classList.remove("start");
    e.target.classList.add("stop");
    const hrsNum = Number(document.getElementById("hrs").value * 3600000);
    const minNum = Number(document.getElementById("min").value * 60000);
    const secNum = Number(document.getElementById("sec").value * 1000);
    const totalTime = hrsNum + minNum + secNum;
    const endTime = Date.now() + totalTime;
    timerHandler(endTime, 1000);
  } else {
    e.target.classList.remove("stop");
    e.target.classList.add("start");
    clearInterval(timerId);
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  document.getElementById("hrs").value = 0;
  document.getElementById("min").value = 0;
  document.getElementById("sec").value = 0;
  if (playBtn.classList.contains("stop")) {
    playBtn.classList.remove("stop");
    playBtn.classList.add("start");
  }
});
