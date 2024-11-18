document.addEventListener('DOMContentLoaded', function() {
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

    // Quiz Questions
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

    // Load the question dynamically
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
                    ${question.options.map((option, index) => `
                        <div>
                            <input type="radio" name="${question.id}" value="${String.fromCharCode(97 + index)}" id="${question.id}-option-${index}">
                            <label for="${question.id}-option-${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.getElementById('quizContainer').innerHTML = questionHTML;
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('validationMessage').innerHTML = '';

        // Enable next button when an option is selected
        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                userAnswers[question.id] = this.value;
                document.getElementById('nextButton').style.display = 'inline-block';
            });
        });
    }

    // Display the result after all questions are answered
    function displayResult() {
        let score = 0;
        for (let [question, answer] of Object.entries(userAnswers)) {
            if (answers[question] === answer) {
                score++;
            }
        }
        const result = document.getElementById('result');
        result.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
        result.classList.add(score === totalQuestions ? 'correct' : 'incorrect');

        // Show Retry and Final Submission buttons
        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'none';  // Hide the Next button at the end
    }

    // Event listener for the next button
    document.getElementById('nextButton').addEventListener('click', function() {
        currentQuestionIndex++;  // Move to the next question
        loadQuestion();  // Load the next question
    });

    // Event listener for the retry button
    document.getElementById('retryButton').addEventListener('click', function() {
        // Reset everything to restart the quiz
        currentQuestionIndex = 0;
        userAnswers = {};
        loadQuestion();
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';
        document.getElementById('result').innerHTML = '';
    });

    // Event listener for the final submission button
    document.getElementById('finalSubmissionButton').addEventListener('click', function() {
        // Scroll to the Chat section
        document.getElementById('chatSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Start quiz
    loadQuestion();
});
