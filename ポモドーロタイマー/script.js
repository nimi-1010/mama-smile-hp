const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

let mode = 'work'; // 'work' or 'break'
let timer = WORK_MINUTES * 60;
let intervalId = null;

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const countDisplay = document.getElementById('count');
const historyList = document.getElementById('history');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let workCount = 0;
let history = [];

function updateDisplay() {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    modeDisplay.textContent = mode === 'work' ? '作業中' : '休憩中';
    countDisplay.textContent = `完了回数: ${workCount}`;
    historyList.innerHTML = '';
    history.slice(-10).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateDisplay();
        } else {
            if (mode === 'work') {
                mode = 'break';
                timer = BREAK_MINUTES * 60;
                workCount++;
                history.push(`作業完了 (${new Date().toLocaleTimeString()})`);
                alert('休憩時間です！');
            } else {
                mode = 'work';
                timer = WORK_MINUTES * 60;
                history.push(`休憩完了 (${new Date().toLocaleTimeString()})`);
                alert('作業時間に戻ります！');
            }
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    stopTimer();
    mode = 'work';
    timer = WORK_MINUTES * 60;
    // workCountやhistoryはリセットしない
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();