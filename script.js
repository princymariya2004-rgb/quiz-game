const questions = [
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Bangalore", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: "HTML"
    },
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Control Processing Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        answer: "Mars"
    }
];

let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const backBtn = document.getElementById("back-btn");

// Shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Load question
function loadQuestion() {
    const q = shuffledQuestions[currentQuestion];
    questionEl.textContent = q.question;

    // Shuffle options
    let shuffledOptions = shuffleArray([...q.options]);

    optionsEl.forEach((btn, index) => {
        btn.textContent = shuffledOptions[index];
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    });
}

// Initialize Quiz
function startQuiz() {
    shuffledQuestions = shuffleArray([...questions]);
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-container").style.display = "block";
    scoreContainer.style.display = "none";
    loadQuestion();
}

// Option click
optionsEl.forEach(btn => {
    btn.addEventListener("click", function() {
        const selected = this.textContent;
        const correct = shuffledQuestions[currentQuestion].answer;

        if (selected === correct) {
            score++;
            this.classList.add("correct");
        } else {
            this.classList.add("wrong");
            // Highlight correct answer
            optionsEl.forEach(b => {
                if (b.textContent === correct) b.classList.add("correct");
            });
        }

        optionsEl.forEach(b => b.disabled = true);
    });
});

// Next question
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

// Show score
function showScore() {
    document.getElementById("quiz-container").style.display = "none";
    scoreContainer.style.display = "block";
    scoreEl.textContent = score + " / " + shuffledQuestions.length;
}

// Back button
backBtn.addEventListener("click", () => {
    startQuiz();
});

// Start quiz on page load
startQuiz();
