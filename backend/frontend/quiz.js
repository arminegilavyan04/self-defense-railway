
document.addEventListener('DOMContentLoaded', function() {
    
    console.log("Script loaded");

    // Start Quiz Button Click Handler
    const startQuizButton = document.getElementById('startQuizButton');

    startQuizButton.addEventListener('click', function() {
        console.log('Start Quiz button clicked');
        startQuiz();
    });
    const answers = {
        q1: 'a',
        q2: 'a',
        q3: 'c',
        q4: 'a',
        q5: 'd',
        q6: 'b',
        q7: 'a'
    };

    let currentQuestionIndex = 0;
    const totalQuestions = Object.keys(answers).length;
    let userAnswers = {};
    let score = 0;  // Track score internally

    const questions = [
        {
            question: 'What is the first step in self-defense?',
            options: ['Avoid confrontation', 'Strike first', 'Call for help', 'None of the above'],
            id: 'q1'
        },
        {
            question: 'When should you call for help?',
            options: ['Before taking any action', 'When attacked', 'Only after striking', 'Never'],
            id: 'q2'
        },
        {
            question: 'What is the best way to defend yourself against a chokehold?',
            options: ['Punch the attacker', 'Use your hands to break the grip', 'Kick the attacker in the knee', 'None of the above'],
            id: 'q3'
        },
        {
            question: 'Which of these is a common self-defense move?',
            options: ['Palm strike', 'Kick to the chest', 'Chokehold', 'All of the above'],
            id: 'q4'
        },
        {
            question: 'What should you do if someone is following you?',
            options: ['Walk faster', 'Confront the person', 'Go to a public place', 'Ignore them'],
            id: 'q5'
        },
        {
            question: 'How can you increase your situational awareness?',
            options: ['Look at your phone', 'Walk with headphones on', 'Scan your surroundings', 'Ignore your environment'],
            id: 'q6'
        },
        {
            question: 'What is the best way to stay safe when walking alone at night?',
            options: ['Walk in isolated areas', 'Stay alert and keep your phone ready', 'Walk with a friend', 'None of the above'],
            id: 'q7'
        }
    ];

    // Function to load the quiz question
    function loadQuestion() {
        if (currentQuestionIndex >= totalQuestions) {
            displayResult();
            return;
        }

        const question = questions[currentQuestionIndex];
        const questionHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                <div>
                    ${question.options.map((option, index) => 
                        `<div>
                            <input type="radio" name="${question.id}" value="${String.fromCharCode(97 + index)}" id="${question.id}-option-${index}">
                            <label for="${question.id}-option-${index}">${option}</label>
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;

        document.getElementById('quizContainer').innerHTML = questionHTML;
        document.getElementById('validationMessage').innerHTML = '';

        // Hide the buttons initially
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';

        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                userAnswers[question.id] = this.value;

                // Show the "Next" button when an answer is selected
                document.getElementById('nextButton').style.display = 'inline-block';
            });
        });
    }

    // Display the result after quiz is completed
    function displayResult() {
        // Calculate score
        score = 0;  
        for (let [question, answer] of Object.entries(userAnswers)) {
            if (answers[question] === answer) {
                score++;
            }
        }

        // Display score and results only at the end
        const result = document.getElementById('result');
        result.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
        result.classList.add(score === totalQuestions ? 'correct' : 'incorrect');

        // Show "Retry" and "Submit" buttons after quiz is complete
        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'none';
    }

    // Start the quiz (hide Start button and show quiz content)
    function startQuiz() {

    console.log("Start Quiz button clicked");
        // Hide the Start button
        document.getElementById('startQuizButton').style.display = 'none';

        // Show the quiz content
        document.getElementById('quizContainer').style.display = 'block';

        // Load the first question
        loadQuestion();

        // Attach event listeners for buttons after quiz content is loaded
        document.getElementById('nextButton').addEventListener('click', nextButtonHandler);
        document.getElementById('retryButton').addEventListener('click', retryButtonHandler);
        document.getElementById('finalSubmissionButton').addEventListener('click', finalSubmissionButtonHandler);
    }

    // Next question handler
    function nextButtonHandler() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            loadQuestion(); // Load the next question
        }
    }

    // Retry the quiz by resetting the quiz state
    function retryButtonHandler() {
        currentQuestionIndex = 0;
        userAnswers = {};
        score = 0;
        document.getElementById('result').innerHTML = '';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';
        loadQuestion();
    }

    // Final submission handler
    function finalSubmissionButtonHandler() {
        const result = {
            score: score,
            totalQuestions: totalQuestions
        };
        sessionStorage.setItem('quizResult', JSON.stringify(result));

        // Clear quiz content and show results
        document.getElementById('quizContainer').innerHTML = '';
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';

        const scoreMessage = `Your score is ${score} out of ${totalQuestions}.`;
        let personalizedMessage = '';

        if (score >= 6) {
            personalizedMessage = 'Excellent job! Keep up the great work!';
        } else if (score >= 4) {
            personalizedMessage = 'Good effort! You’re almost there!';
        } else {
            personalizedMessage = 'Please contact our coach, Devis More, for further assistance.';
        }

        document.getElementById('result').innerHTML = `<p>${scoreMessage}</p><p>${personalizedMessage}</p>`;
    }

    // Attach the startQuiz function to the button
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);
});
