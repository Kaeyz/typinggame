window.addEventListener('load', init)

// Globals

// Available Levels

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;


// DOM ELEMENTS
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat', 'river', 'lucky', 'statue', 'generate', 'stubborn', 'cocktail', 'runaway', 'joke', 'developer', 'establishment', 'hero', 'javascript', 'nutrition', 'revolver', 'echo', 'sibling', 'investigate', 'horrendous', 'symptoms', 'laughter', 'magic', 'space', 'definition', "abstract",	"arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto","if", "implements",	"import", "in", "instanceof", "int","interface", "let",	"long",	"native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"
];

const changeLevel = () => {
    if (score >= 20) {
        currentLevel = levels.medium;
        seconds.innerHTML = currentLevel;
    } else if (score >= 50) {
        currentLevel = levels.hard;
        seconds.innerHTML = currentLevel;
    } else {
        currentLevel = levels.easy;
    }
}


// Init Game

function init() {
    // show no of seconds in Ui
    seconds.innerHTML = currentLevel
    // load word from array
    showWord(words)
    // Start mactching on word  input
    wordInput.addEventListener('input', startMatch )
    // Call countdown every secound
    setInterval(countdown, 1000)
    // Check game Status
    setInterval(checkStaus, 50)
}

// Start Match
function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    // if score is -1 disaply 0
     if (score === -1) {
         scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
     }
}

// Match current word to word input
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'correct!!!!'
        return true;
    } else {
        message.innerHTML = '';
        return false
    }
}


// Pick and show random word
function showWord(words) {
    // generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex]
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if(time > 0) {
        // decrement time
        time--;
    } else if(time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game Status
function checkStaus() {
    if(!isPlaying && time == 0) {
        message.innerHTML = 'Game Over!!!'
        score = -1;
    }
}