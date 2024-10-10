const startBtn = document.getElementById('startBtn');
const quizScreen = document.getElementById('quizScreen');
const welcomeScreen = document.getElementById('welcomeScreen');
const resultScreen = document.getElementById('resultScreen');
const questionText = document.getElementById('questionText');
const choices = document.getElementById('choices');
const progressBarFull = document.getElementById('progressBarFull');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('scoreText');
const retakeBtn = document.getElementById('retakeBtn');

let currentQuestion = 0;
let score = 0;
let acceptingAnswers = false;
let questions = [
  {
    question: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 0
  },
  {
    question: 'What is the largest planet in our solar system?',
    choices: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 2
  },
  {
    question: 'What is the chemical symbol for water?',
    choices: ['O2', 'H2O', 'CO2', 'NaCl'],
    answer: 1
  },
  {
    question: 'Which element is a gas at room temperature?',
    choices: ['Iron', 'Helium', 'Gold', 'Silver'],
    answer: 1
  },
  {
    question: 'Who wrote "To be, or not to be"?',
    choices: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Ernest Hemingway'],
    answer: 2
  }
];

// Start the quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  welcomeScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }
  const current = questions[currentQuestion];
  questionText.innerText = current.question;
  choices.innerHTML = '';
  current.choices.forEach((choice, index) => {
    const choiceBtn = document.createElement('div');
    choiceBtn.classList.add('choice');
    choiceBtn.innerText = choice;
    choiceBtn.addEventListener('click', () => selectAnswer(index, current.answer));
    choices.appendChild(choiceBtn);
  });
  progressText.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressBarFull.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  acceptingAnswers = true;
}

function selectAnswer(selectedIndex, correctIndex) {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;
  const choiceElements = document.querySelectorAll('.choice');
  
  // Highlight correct and incorrect answers
  choiceElements.forEach((choice, index) => {
    if (index === correctIndex) {
      // Highlight the correct answer in green
      choice.classList.add('correct');
    }
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      // Highlight the wrong answer (selected by the user) in red
      choice.classList.add('incorrect');
    }
  });

  // Update the score if the selected answer is correct
  if (selectedIndex === correctIndex) {
    score++;
  }

  // Move to the next question after a brief moment
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000);
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.innerText = `${score} / ${questions.length}`;
}

retakeBtn.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});