document.addEventListener('DOMContentLoaded', function() {
    // Correct answers
    const answers = {
        q1: 'a',
        q2: 'a',
        q3: 'c',
        q4: 'a',
        q5: 'd',
        q6: 'b',
        q7: 'a'
    };

    // Function to enable the submit button if all questions are answered
    const allQuestionsAnswered = () => {
        let allAnswered = true;
        const missingQuestions = [];
        
        // Check each question for a selected answer
        for (let i = 1; i <= 7; i++) {
            if (!document.querySelector(`input[name="q${i}"]:checked`)) {
                allAnswered = false;
                missingQuestions.push(i); // Track missing questions
            }
        }

        // Enable submit button if all questions are answered
        document.getElementById('submitButton').disabled = !allAnswered;

        // Display validation message for missing questions
        const validationMessage = document.getElementById('validationMessage');
        if (missingQuestions.length > 0) {
            validationMessage.innerHTML = `Please answer the following questions: ${missingQuestions.join(', ')}`;
        } else {
            validationMessage.innerHTML = ''; // Clear the validation message when all questions are answered
        }
    };

    // Add event listener to all radio buttons to trigger checking the answers
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', allQuestionsAnswered);
    });

    // Event listener for form submission
    document.getElementById('quizForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission to validate answers first

        let score = 0;
        const formData = new FormData(event.target);

        // Check if each question has a selected answer
        for (let [question, answer] of formData.entries()) {
            if (answers[question] === answer) {
                score++;
            }
        }

        // Display result
        const result = document.getElementById('result');
        result.innerHTML = `You scored ${score} out of 7.`;
        result.classList.add(score === 7 ? 'correct' : 'incorrect');

        // Hide Submit button and show Retry and Final Submission button
        document.getElementById('submitButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'inline-block';
    });

    // Retry button functionality
    document.getElementById('retryButton').addEventListener('click', function() {
        // Reset the form but keep the results hidden
        document.getElementById('quizForm').reset();

        // Hide result, show the submit button, and reset retry button visibility
        document.getElementById('result').innerHTML = '';
        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('submitButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'none';
        document.getElementById('validationMessage').innerHTML = ''; // Clear validation message
    });

    // Final submission button functionality
    document.getElementById('finalSubmissionButton').addEventListener('click', function() {
        loadPage('home');  // Assuming 'home' is the page identifier you've set up for the Home page
    });
});
