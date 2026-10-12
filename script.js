// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is Your GrandMother Name?",
    answers: [
      { text: "Pathima", correct: false },
      { text: "Khathija", correct: false },
      { text: "Nabisa", correct: true },
      { text: "BPathu", correct: false },
    ],
  },
  {
    question: "What is Your GrandFather Name?",
    answers: [
      { text: "Mohammad Kunhi", correct: false },
      { text: "Ibrahim", correct: false },
      { text: "Ammaba", correct: false },
      { text: "Abdul Rahman", correct: true },
    ],
  },
  {
    question: "Who is Big boy in our family?",
    answers: [
      { text: "Rafi", correct: false },
      { text: "Razeen", correct: false },
      { text: "Shammaz", correct: false },
      { text: "Adi", correct: false },
      { text: "Sakib", correct: false },
      { text: "Sabith", correct: false },
      { text: "Muneer", correct: false },
      { text: "Zayyan", correct: false },
      { text: "Ishal", correct: false },
      { text: "Icchu", correct: false },
      { text: "Arfan", correct: true },
      { text: "Innu", correct: false },
      { text: "Sahalabath", correct: false },
      { text: "Jaseem", correct: false },
    ],
  },
  {
    question: "Who is Small girl in our family?",
    answers: [
      { text: "Ismath", correct: false },
      { text: "Sipana", correct: false },
      { text: "Riza", correct: false },
      { text: "Chunni", correct: false },
      { text: "Api", correct: false },
      { text: "ifha", correct: true },
      { text: "Anni", correct: false },
      { text: "Jazeela", correct: false },
      { text: "Inaya", correct: false },
      { text: "Sana", correct: false },
      
    ],
  },
  {
    question: "Who is small grandson in our family ",
    answers: [
      { text: "Rafi", correct: false },
      { text: "Razeen", correct: false },
      { text: "Shammaz", correct: false },
      { text: "Adi", correct: false },
      { text: "Sakib", correct: false },
      { text: "Sabith", correct: false },
      { text: "Muneer", correct: false },
      { text: "Zayyan", correct: false },
      { text: "Ishal", correct: false },
      { text: "Icchu", correct: false },
      { text: "Arfan", correct: false },
      { text: "Innu", correct: true },
      { text: "Sahalabath", correct: false },
      { text: "Jaseem", correct: false },
    ],
  },
  {
    question: "Who is angery girl",
    answers: [
      { text: "Riza", correct: true },
      { text: "Ismath", correct: true },
      { text: "Jazeela", correct: true },
      { text: "Sana", correct: true },
      { text: "Api", correct: true },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
