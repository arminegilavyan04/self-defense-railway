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
            displayResult();  // Show results if all questions answered
            return;
        }
    
        const question = questions[currentQuestionIndex];  // Get the current question
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
    
        // Display the question HTML inside the quiz container
        document.getElementById('quizContainer').innerHTML = questionHTML;
    
        // Get the "Next" button and initially hide it
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    
        // Clear any validation messages (if any)
        document.getElementById('validationMessage').innerHTML = '';
    
        // Get all radio buttons for the current question
        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
    
        // Add a listener to each radio button to handle the answer selection
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                userAnswers[question.id] = this.value;  // Store the user's answer
                nextButton.style.display = 'inline-block';  // Show the "Next" button
            });
        });
    
        // Handle disabling of the radio buttons after "Next" is clicked on the last question
        if (isLastQuestion()) {
            nextButton.addEventListener('click', function() {
                // Disable the radio buttons only after clicking "Next" on the last question
                const radios = document.querySelectorAll(`input[name="${question.id}"]`);
                radios.forEach(radio => {
                    radio.disabled = true;  // Disable the radio buttons
                });
                nextButton.style.display = 'none';  // Hide the "Next" button after it's clicked
            });
        }
    }
    
    // Helper function to check if it's the last question
    function isLastQuestion() {
        return currentQuestionIndex === totalQuestions - 1;
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

    // Cleanup function to reset everything when navigating away from the quiz
    function cleanupQuiz() {
        // Remove event listeners for buttons and quiz interactions
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.removeEventListener('click', nextButtonHandler);
        }

        const retryButton = document.getElementById('retryButton');
        if (retryButton) {
            retryButton.removeEventListener('click', retryButtonHandler);
        }

        const finalSubmissionButton = document.getElementById('finalSubmissionButton');
        if (finalSubmissionButton) {
            finalSubmissionButton.removeEventListener('click', finalSubmissionButtonHandler);
        }

        // Clear the content
        document.getElementById('quizContainer').innerHTML = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';
        document.getElementById('validationMessage').innerHTML = '';
    }

    // Next question handler
    function nextButtonHandler() {
        currentQuestionIndex++;
        loadQuestion();
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

    // Attach event listeners to buttons
    document.getElementById('nextButton').addEventListener('click', nextButtonHandler);
    document.getElementById('retryButton').addEventListener('click', retryButtonHandler);
    document.getElementById('finalSubmissionButton').addEventListener('click', finalSubmissionButtonHandler);

    // Load the first question
    loadQuestion();

    // Ensure cleanup of quiz state on page navigation (via the navigation logic)
    window.addEventListener('beforeunload', function() {
        cleanupQuiz();
    });

    // Add cleanup when navigating away (from a different page)
    window.addEventListener('popstate', function() {
        cleanupQuiz();
    });
});
