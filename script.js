document.getElementById('startTestBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});

const questions = [
    // Your question objects here...
];

let currentQuestionIndex = 0;

const testContainer = document.getElementById('testContainer');
const questionContainer = document.getElementById('questionContainer');
const nextBtn = document.getElementById('nextBtn');

function startTest() {
    document.getElementById('startTestBtn').style.display = 'none';
    testContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = '';

    if (question.type === 'grammar') {
        const optionsHTML = question.options.map(option => `<input type="radio" name="answer" value="${option}">${option}<br>`).join('');
        questionContainer.innerHTML = `<h3>${question.question}</h3>${optionsHTML}`;
    } else if (question.type === 'typing') {
        questionContainer.innerHTML = `<textarea id="typedText" rows="4" cols="50"></textarea>`;
    } else if (question.type === 'reading') {
        const optionsHTML = question.options.map(option => `<input type="radio" name="answer" value="${option}">${option}<br>`).join('');
        questionContainer.innerHTML = `<p>${question.paragraph}</p><h3>${question.question}</h3>${optionsHTML}`;
    } else if (question.type === 'listening') {
        questionContainer.innerHTML = `<audio controls><source src="${question.audioSrc}" type="audio/mpeg">Your browser does not support the audio element.</audio><br>${question.question}<br>`;
        const optionsHTML = question.options.map(option => `<input type="radio" name="answer" value="${option}">${option}<br>`).join('');
        questionContainer.innerHTML += optionsHTML;
    }
}

document.getElementById('startTestBtn').addEventListener('click', startTest);
nextBtn.addEventListener('click', nextQuestion);

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const question = questions[currentQuestionIndex];

        if (question.answer === selectedAnswer.value) {
            // Handle correct answer
            console.log('Correct!');
        } else {
            // Handle incorrect answer
            console.log('Incorrect!');
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            // End of test
            console.log('End of test');
            testContainer.innerHTML = '<h2>End of Test</h2>';
        }
    } else {
        // User hasn't selected an answer
        alert('Please select an answer.');
    }
}
