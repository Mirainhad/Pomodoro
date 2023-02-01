let work_time = 3000;
let short_time = 300;
let long_time = 600;

let countdown_time = 3000;
let countdown_state = 'Work';
let isRun = false;
let work_count = 0;

function loadPage() {
  document.getElementById('Work').innerHTML = secondToTime(work_time);
  document.getElementById('Short').innerHTML = secondToTime(short_time);
  document.getElementById('Long').innerHTML = secondToTime(long_time);
  document.getElementById("Nav-Short").style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  document.getElementById("Nav-Long").style.backgroundColor = "rgba(0, 0, 0, 0.0)";
}

function secondToTime(time) {
  let minute = Math.floor(time / 60);
  let second = time - minute * 60;
  if (second < 10) {
    second = '0' + second;
  } 
  if (minute < 10) {
    minute = '0' + minute;
  }
  return minute + ':' + second;
}

function playAudio(){
  var audio = document.getElementById("audio");
  audio.play();
}

function setDefaultClock(state) {
  if (state == 'Work') {
    countdown_time = work_time; 
    document.getElementById('Work').innerHTML = secondToTime(countdown_time);
    document.getElementById('Main').style.backgroundColor = "rgb(186, 73, 73)";
    document.getElementById('Clock-Control').style.color = "rgb(186, 73, 73)";
  }
  if (state == 'Short') {
    countdown_time = short_time; 
    document.getElementById('Short').innerHTML = secondToTime(countdown_time);
    document.getElementById('Main').style.backgroundColor = "rgb(56, 133, 138)";
    document.getElementById('Clock-Control').style.color = "rgb(56, 133, 138)";
  }
  if (state == 'Long') {
    countdown_time = long_time; 
    document.getElementById('Long').innerHTML = secondToTime(countdown_time);
    document.getElementById('Main').style.backgroundColor = "rgb(57, 112, 151)";
    document.getElementById('Clock-Control').style.color = "rgb(57, 112, 151)";
  }  
}

function switchClock(state) {
    let x = document.getElementsByClassName("Clock");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(state).style.display = "block";

    let y = document.getElementsByClassName("Clock-Nav");
    for (let i = 0; i < y.length; i++) {
      y[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    document.getElementById("Nav-" + state).style.backgroundColor = "rgba(0, 0, 0, 0.1)";

    if (isRun) forceEndClock();
    countdown_state = state;
    setDefaultClock(state);
}

function startClock() {
  document.getElementById('Start').style.display = "none";
  document.getElementById('Pause').style.display = "block";
  document.getElementById('End').style.display = "block";
  isRun = true;
  playAudio();
  countdown = setInterval(displayTime, 1000);
}

function pauseClock() {
  document.getElementById('Start').style.display = "block";
  document.getElementById('Pause').style.display = "none";
  document.getElementById('End').style.display = "none";
  isRun = false;
  clearInterval(countdown);
}

function forceEndClock() {
  document.getElementById('Start').style.display = "block";
  document.getElementById('Pause').style.display = "none";
  document.getElementById('End').style.display = "none";
  isRun = false;
  clearInterval(countdown);
  setDefaultClock(countdown_state); 
}

function endClock() {
  document.getElementById('Start').style.display = "block";
  document.getElementById('Pause').style.display = "none";
  document.getElementById('End').style.display = "none";
  isRun = false;
  clearInterval(countdown);
  setDefaultClock(countdown_state);
  nextClock();
}

function nextClock() {
  if (countdown_state == 'Work') {
    work_count += 1;
    if (work_count < 3) {
      switchClock('Short');
    } else {
      switchClock('Long');
      work_count = 0;
    }
  } else {
    switchClock('Work');
  }
}

function displayTime() {
  countdown_time -= 1;
  document.getElementById(countdown_state).innerHTML = secondToTime(countdown_time);
  if (countdown_time == 0) {
    clearInterval(countdown);
    endClock();
    playAudio();
  }
}