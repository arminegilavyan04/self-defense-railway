document.addEventListener('DOMContentLoaded', function() {
    const answers = {
        q1: 'a',
        q2: 'a',
        q3: 'c',
        q4: 'a',
        q5: 'd',
        q6: 'b',
        q7: 'a',
        q8: 'b',
        q9: 'c'
    };

    let currentQuestionIndex = 0;
    const totalQuestions = Object.keys(answers).length;
    let userAnswers = {};
    let score = 0;  // Track score internally

    const questions = [
        {
            question: 'Do you have a sports background?',
            options: ['Yes, I regularly practice sports','Yes, but only occasionally','No, I don’t have any sports background'],
            id: 'q1'
        },
        {
            question: 'Have you ever practiced any form of martial arts or self-defense training?',
            options: ['Yes, I’m trained', 'I’ve tried it a few times ', 'No, never'],
            id: 'q2'
        },
        {
            question: 'How physically active are you on a weekly basis?',
            options: ['Very active (5+ days a week)', 'Moderately active (2–4 days a week)', 'Rarely active (1 day or less a week)'],
            id: 'q3'
        },
        {
            question: 'Do you engage in regular strength or endurance training?',
            options: ['Yes, frequently', 'Occasionally', 'No, never'],
            id: 'q4'
        },
        {
            question: 'How would you rate your physical stamina in challenging situations? ',
            options: ['High, I can last long under physical stress', 'Moderate, I can manage but not for long', 'Low, I struggle with physical stress'],
            id: 'q5'
        },
        {
            question: 'If someone suddenly approaches you aggressively, what would you do?',
            options: ['Stay calm and prepare to defend myself', 'Look for an escape route', 'Freeze and hope the situation resolves itself'],
            id: 'q6'
        },
        {
            question: 'Are you comfortable using objects around you as tools for self-defense?',
            options: ['Yes, I can improvise easily', 'Maybe, I’d need time to think', 'No, I wouldn’t know what to do'],
            id: 'q7'
        },
        {
            question: 'How often do you plan an escape route when entering a new environment?',
            options: ['Always, it’s a habit', 'Sometimes, when I feel uneasy', 'Rarely or never'],
            id: 'q8'
        },
        {
            question: 'If you suspect someone is following you, what’s your first response?',
            options: ['Change my route and stay alert', 'Confront the person', 'Ignore and hope it’s nothing'],
            id: 'q9'
        }

    ];
    
    function loadQuestion() {
    
        if (currentQuestionIndex >= totalQuestions) {
            displayResult();  
            return;
        }
    
        const question = questions[currentQuestionIndex];  
        const questionHTML = `
            <div class="question">
                <h3>${question.question}</h3> <br><br>
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
    
        document.getElementById('quizContainer').innerHTML = questionHTML;  // Display the question HTML
    
        // Ensure all radio buttons are enabled for the current question
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.disabled = false;  // Explicitly enable the radio buttons
            radio.checked = false;   // Uncheck them
            console.log(`Radio button with ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    
        document.getElementById('validationMessage').innerHTML = '';
    
        // Add event listeners for the radio buttons to update answers and show next button
        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                userAnswers[question.id] = this.value;
                nextButton.style.display = 'inline-block';
            });
        });
    
        // Check if it's the last question, and if so, disable radio buttons when next is clicked
        if (currentQuestionIndex === totalQuestions - 1) {
            nextButton.addEventListener('click', function() {
                // Disable all radio buttons when on the last question
                allRadios.forEach(radio => {
                    radio.disabled = true;  // Disable the radio buttons after Next is clicked
                });
                console.log('Radio buttons disabled on the last question');
            });
        }
    }
    
    function retryButtonHandler() {
        console.log('Retry button clicked!');  // Log when Retry is clicked
    
        currentQuestionIndex = 0;  // Reset to the first question
        userAnswers = {};          // Reset answers
        score = 0;                 // Reset score
        document.getElementById('result').innerHTML = '';  // Clear results
        document.getElementById('retryButton').style.display = 'none';  // Hide Retry button
        document.getElementById('finalSubmissionButton').style.display = 'none';  // Hide Final Submission button
    
        // Get all radio buttons and log their current state
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            console.log(`Before reset - ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        // Reset all radio buttons to be enabled and unchecked for retry
        allRadios.forEach(radio => {
            radio.disabled = false;  // Re-enable all radio buttons
            radio.checked = false;   // Uncheck any previously selected options
            console.log(`After reset - ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        loadQuestion();  // Reload the first question
    }
    
    document.getElementById('retryButton').addEventListener('click', retryButtonHandler);

    
   
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

    // Final submission handler
    // Final submission handler
function finalSubmissionButtonHandler() {
    const result = {
        score: score,
        totalQuestions: totalQuestions
    };

    // Store the result in sessionStorage
    sessionStorage.setItem('quizResult', JSON.stringify(result));

    // Redirect to a results page
    window.location.href = 'quiz_results.html';  // Change 'quiz-results.html' to your actual results page URL
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
