const questions = [
    {
        question : "What is the name of the sport played on flying broomsticks in the wizarding world of Harry Potter?",
        answers :[
            {text: "Gobstones", correct: false},
            {text: "Quidditch", correct: true},
            {text: "Herbology", correct: false},
            {text: "Apparition", correct: false}
        ]
    },
    {
        question : "What is the three-headed dog guarding the trapdoor in Hogwarts called?",
        answers :[
            {text: "Fluffy", correct: true},
            {text: "Fang", correct: false},
            {text: "Mrs. Norris", correct: false},
            {text: "Hedwig", correct: false}
        ]
    },
    {
        question : "Which house is Harry Potter sorted into at Hogwarts School of Witchcraft and Wizardry?",
        answers :[
            {text: "Slytherin", correct: false},
            {text: "Hufflepuff", correct: false},
            {text: "Ravenclaw", correct: false},
            {text: "Gryffindor", correct: true}
        ]
    },
    {
        question : "What is the name of the magic mirror that shows your deepest desire in Harry Potter and the Sorcerer's Stone?",
        answers :[
            {text: "The Mirror of Erised", correct: true},
            {text: "The Marauder's Map", correct: false},
            {text: "The Pensieve", correct: false},
            {text: "The Sorting Hat", correct: false}
        ]
    },
    {
        question : "Which of these is a Unforgivable Curse in Harry Potter?",
        answers :[
            {text: "Impediment Jinx", correct: false},
            {text: "Petrificus Totalus", correct: false},
            {text: "Stupefy", correct: false},
            {text: "Crucio", correct: true}
        ]
    }
]

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    nextButton.addEventListener('click', handleNextButton);
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', handleNextButton);

function handleNextButton() {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = 'block';
  nextButton.addEventListener('click', startGame);
}

startGame();