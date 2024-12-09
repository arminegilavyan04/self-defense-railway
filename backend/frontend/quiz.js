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
    let score = 0;  

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
    
        document.getElementById('quizContainer').innerHTML = questionHTML;  
    
        
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.disabled = false;  
            radio.checked = false;   
            console.log(`Radio button with ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    
        document.getElementById('validationMessage').innerHTML = '';
    
        
        const radios = document.querySelectorAll(`input[name="${question.id}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                userAnswers[question.id] = this.value;
                nextButton.style.display = 'inline-block';
            });
        });
    
        
        if (currentQuestionIndex === totalQuestions - 1) {
            nextButton.addEventListener('click', function() {
                
                allRadios.forEach(radio => {
                    radio.disabled = true;  
                });
                console.log('Radio buttons disabled on the last question');
            });
        }
    }
    
    function retryButtonHandler() {
        console.log('Retry button clicked!');  
    
        currentQuestionIndex = 0;  
        userAnswers = {};          
        score = 0;                 
        document.getElementById('result').innerHTML = '';  
        document.getElementById('retryButton').style.display = 'none';  
        document.getElementById('finalSubmissionButton').style.display = 'none';  
    
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            console.log(`Before reset - ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        allRadios.forEach(radio => {
            radio.disabled = false;  
            radio.checked = false;   
            console.log(`After reset - ID: ${radio.id}, Disabled: ${radio.disabled}, Checked: ${radio.checked}`);
        });
    
        loadQuestion();  
    }
    
    document.getElementById('retryButton').addEventListener('click', retryButtonHandler);

    
    function displayResult() {
       
        score = 0;  
        for (let [question, answer] of Object.entries(userAnswers)) {
            if (answers[question] === answer) {
                score++;
            }
        }

        const result = document.getElementById('result');
        result.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
        result.classList.add(score === totalQuestions ? 'correct' : 'incorrect');

        document.getElementById('retryButton').style.display = 'inline-block';
        document.getElementById('finalSubmissionButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'none';
    }

    function cleanupQuiz() {
        
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

        document.getElementById('quizContainer').innerHTML = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        document.getElementById('finalSubmissionButton').style.display = 'none';
        document.getElementById('validationMessage').innerHTML = '';
    }

    function nextButtonHandler() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function finalSubmissionButtonHandler() {
        const result = {
            score: score,
            totalQuestions: totalQuestions
    };

    sessionStorage.setItem('quizResult', JSON.stringify(result));

    window.location.href = 'quiz_results.html';  

    document.getElementById('nextButton').addEventListener('click', nextButtonHandler);
    document.getElementById('retryButton').addEventListener('click', retryButtonHandler);
    document.getElementById('finalSubmissionButton').addEventListener('click', finalSubmissionButtonHandler);

    
    loadQuestion();

    window.addEventListener('beforeunload', function() {
        cleanupQuiz();
    });

    window.addEventListener('popstate', function() {
        cleanupQuiz();
    });
    
    }
});
