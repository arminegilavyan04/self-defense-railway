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
    
    function loadQuestion() {
        console.log('Loading Question...');
    
        if (currentQuestionIndex >= totalQuestions) {
            displayResult();  // Display the result when all questions are answered
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

    // // Retry the quiz by resetting the quiz state
    // function retryButtonHandler() {
    //     currentQuestionIndex = 0;  // Start from the first question
    //     userAnswers = {};          // Reset the answers
    //     score = 0;                 // Reset the score
    //     document.getElementById('result').innerHTML = '';  // Clear the result
    //     document.getElementById('retryButton').style.display = 'none';  // Hide the Retry button
    //     document.getElementById('finalSubmissionButton').style.display = 'none';  // Hide the Final Submission button
    //     loadQuestion();  // Reload the first question
    // }

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
