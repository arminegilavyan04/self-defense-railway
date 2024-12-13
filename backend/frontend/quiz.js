document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    const totalQuestions = 12;  // Total number of questions
    let userAnswers = {};
    let score = 0;  // Track score internally

    const questionScores = {
        q1: { a: 3, b: 2, c: 1 },
        q2: { a: 3, b: 2, c: 1 },
        q3: { a: 3, b: 2, c: 1 },
        q4: { a: 3, b: 2, c: 1 },
        q5: { a: 3, b: 2, c: 1 },
        q6: { a: 3, b: 2, c: 1 },
        q7: { a: 3, b: 2, c: 1 },
        q8: { a: 3, b: 2, c: 1 },
        q9: { a: 3, b: 2, c: 1 },
        q10: { a: 3, b: 2, c: 1 },
        q11: { a: 3, b: 2, c: 1 },
        q12: { a: 3, b: 2, c: 1 }
    };

    const questions = [
        {
            question: 'Do you have a sports background?',
            options: ['Yes, I regularly practice sports', 'Yes, but only occasionally', 'No, I don’t have any sports background'],
            id: 'q1'
        },
        {
            question: 'Have you ever practiced any form of martial arts or self-defense training?',
            options: ['Yes, I’m trained', 'I’ve tried it a few times', 'No, never'],
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
            question: 'How would you rate your physical stamina in challenging situations?',
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
        },
        {
            question: 'How prepared are you to defend yourself in case of a physical confrontation?',
            options: ['I feel very prepared', 'I feel somewhat prepared', 'I’m not prepared at all'],
            id: 'q10'
        },
        {
            question: 'How do you react in high-pressure situations?',
            options: ['I stay calm and think logically', 'I stay calm and think logically', 'I panic and struggle to respond'],
            id: 'q11'
        },
        {
            question: 'If faced with danger, are you able to make quick decisions?',
            options: ['Yes, I’m confident in my decisions', 'Sometimes, but I hesitate', 'No, I often feel paralyzed'],
            id: 'q12'
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
                <h3>${question.question}</h3><br><br>
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

        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedOption = this.value;
                userAnswers[question.id] = selectedOption;
                score += questionScores[question.id][selectedOption];  // Update score based on selected option

                // Show next button once an answer is selected
                document.getElementById('nextButton').style.display = 'inline-block';
            });
        });
    }

    function displayResult() {
        const result = document.getElementById('result');
        result.innerHTML = `You scored ${score} out of ${totalQuestions * 3}.`;  // Maximum possible score is 3 * totalQuestions
        result.classList.add(score === totalQuestions * 3 ? 'correct' : 'incorrect');
        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'none';
    }

    function retryButtonHandler() {
        currentQuestionIndex = 0;
        userAnswers = {};
        score = 0;
        document.getElementById('result').innerHTML = '';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';

        loadQuestion();
    }

    function finalSubmissionButtonHandler() {
        const result = {
            score: score,
            totalQuestions: totalQuestions
        };

        sessionStorage.setItem('quizResult', JSON.stringify(result));
        window.location.href = 'quiz_results.html';  // Redirect to results page
    }

    document.getElementById('retryButton').addEventListener('click', retryButtonHandler);
    document.getElementById('finalSubmissionButton').addEventListener('click', finalSubmissionButtonHandler);

    document.getElementById('nextButton').addEventListener('click', function() {
        currentQuestionIndex++;
        loadQuestion();
    });

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


    