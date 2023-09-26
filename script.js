
const quizData = {
    "name": "Jack",
    "questions": [
        {
            "id": 0,
            "question": "Prout",
            "correct": "0",
            "answers": [
                "ok",
                "non",
                "non",
                "nope"
            ]
        },
        {
            "id": 1,
            "question": "quest 2",
            "correct": "2",
            "answers": [
                "agaga",
                "agaze",
                "bazeaze",
                "aazeazezae"
            ]
        },
        {
            "id": 2,
            "question": "test",
            "correct": "3",
            "answers": [
                "a ",
                "a ",
                "a ",
                "b"
            ]
        },
        {
            "id": 3,
            "question": "test",
            "correct": "3",
            "answers": [
                "a ",
                "a ",
                "a ",
                "b"
            ]
        },
        {
            "id": 4,
            "question": "test",
            "correct": "3",
            "answers": [
                "a ",
                "a ",
                "a ",
                "b"
            ]
        }
    ]
}



const quizContainer = document.getElementById('quiz-container');

// Place le nom du quiz en haut de page
const quizName = document.getElementById('quizname');
quizName.innerHTML = `<h1>${quizData.name}</h1>`;

function buildQuiz() {
    // Boucle à travers les questions du tableau
    quizData.questions.forEach((questionData, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Créez un élément <p> pour afficher la question
        const questionElement = document.createElement('p');
        questionElement.innerHTML = `Question ${index + 1} : ${questionData.question}`;
        questionDiv.appendChild(questionElement);

        // Boucle à travers les réponses possibles (0, 1, 2, 3)
        for (let optionIndex = 0; optionIndex < questionData.answers.length; optionIndex++) {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${questionData.id}`;
            input.value = optionIndex; // Utilisez l'index de l'option comme valeur
            label.appendChild(input);
            label.textContent = questionData.answers[optionIndex];

            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.appendChild(input);
            answerDiv.appendChild(label);

            // Permet de cliquer sur le label ou sur l'input pour plus de facilité
            label.addEventListener('click', () => {
                input.checked = true;
            });

            questionDiv.appendChild(answerDiv);
        }

        quizContainer.appendChild(questionDiv);
    });
}

// Function to calculate the final score and display it with color coding
function scoreFinal(score) {
    const scorePercent = (score * 100) / quizData.questions.length;

    // Define color codes
    const greenColor = '#004225';
    const orangeColor = '#FFB000';
    const redColor = '#8B0000';

    let color;

    // Determine the color based on the score percentage
    if (scorePercent >= 70) {
        color = greenColor;
    } else if (scorePercent >= 40 && scorePercent < 70) {
        color = orangeColor;
    } else {
        color = redColor;
    }

    // Return the final score message with the specified color
    return `<p style="color: ${color};"> Score final : ${score} / ${quizData.questions.length}</p>`;
}

// Function to display the final score at the bottom of the page
function showScore(score) {
    const scoreDisplayer = document.querySelector('.sendanswers');
    const scoreMessage = document.createElement("div");
    scoreMessage.classList.add("finalscore")
    scoreMessage.innerHTML = scoreFinal(score);
    scoreDisplayer.appendChild(scoreMessage)
}

// Function for sending answers with the final score: ${score} / ${quizQuestions.length}
// It checks the user's answers, removes the button, and any error messages from the DOM.
function sendAnswers() {
    // Initialize a variable to track the user's score
    let score = 0;

    // Loop through the questions and check the user's answers
    quizData.questions.forEach((questionData) => {
        const selectedOption = document.querySelector(`input[name="question${questionData.id}"]:checked`);

        if (selectedOption) {
            const userAnswer = selectedOption.value;
            console.log(userAnswer);
            console.log(questionData.correct)

            if (userAnswer === questionData.correct) {
                // Correct answer, increment the score
                console.log("score++")
                score++;
            }
        }
    });

    // Remove the button and any missing checked answers message if they exist
    const buttonToRemove = document.getElementById("sendButton");
    const messageElement = document.querySelector('.missing-message');
    if (messageElement) {
        messageElement.remove()
    }
    buttonToRemove.remove()

    // Show the final score
    showScore(score);
}

// Check first if every question has at least 1 checked box before checking if the answers are correct
function checkAnswers() {
    const quizQuestions = document.querySelectorAll('.question');

    let atLeastOneChecked = true;

    // Loop through the questions and check if any radio button is checked
    quizQuestions.forEach((question) => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        let questionChecked = false;

        radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
                questionChecked = true;
            }
        });

        if (!questionChecked) {
            atLeastOneChecked = false;
        }
    });

    const sendAnswersContainer = document.querySelector('.sendanswers');
    const messageElement = sendAnswersContainer.querySelector('.missing-message');

    if (atLeastOneChecked) {
        sendAnswers();
    } else {
        if (!messageElement) {
            // Create an element to display the message if it doesn't exist
            const newMessageElement = document.createElement('p');
            newMessageElement.textContent = 'You forgot to check some answers, idiot!';
            newMessageElement.classList.add('missing-message');

            // Add this element to the send container (e.g., ".sendanswers")
            sendAnswersContainer.appendChild(newMessageElement);
        }
    }
}


const button = document.getElementById("sendButton")
button.onclick = checkAnswers;






function togglePopup() {
    const popup = document.querySelector("#popup-overlay");
    popup.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    const addQuestionButton = document.getElementById("add-question");
    const quizForm = document.getElementById("quiz-form");

    let questionCounter = 1; // Compteur pour suivre le numéro de la question

    addQuestionButton.addEventListener("click", function () {
        questionCounter++; // Incrémente le compteur à chaque nouvelle question

        // Crée un nouvel élément div pour la nouvelle question
        const newQuestionContainer = document.createElement("div");
        newQuestionContainer.classList.add("question-container");

        // Crée un titre pour la nouvelle question
        const newQuestionTitle = document.createElement("h2");
        newQuestionTitle.textContent = `Question ${questionCounter}`;
        newQuestionContainer.appendChild(newQuestionTitle);

        // Crée un conteneur pour les réponses de la nouvelle question
        const newAnswersContainer = document.createElement("div");
        newAnswersContainer.classList.add("answers");

        // Crée un champ de texte pour la nouvelle question
        const newQuestionInput = document.createElement("input");
        newQuestionInput.type = "text";
        newQuestionInput.name = `question${questionCounter}`;
        newQuestionInput.placeholder = `Question ${questionCounter}`;
        newQuestionInput.required = true;
        newAnswersContainer.appendChild(newQuestionInput);

        // Crée les réponses (labels et champs de texte) pour la nouvelle question
        for (let i = 1; i <= 4; i++) {
            const newAnswerDiv = document.createElement("div");

            const newAnswerLabel = document.createElement("label");
            newAnswerLabel.htmlFor = `answer${questionCounter}${String.fromCharCode(96 + i)}`;
            const newAnswerRadio = document.createElement("input");
            newAnswerRadio.type = "radio";
            newAnswerRadio.name = `correct${questionCounter}`;
            newAnswerRadio.value = `answer${questionCounter}${String.fromCharCode(96 + i)}`;
            newAnswerLabel.appendChild(newAnswerRadio);

            const newAnswerInput = document.createElement("input");
            newAnswerInput.type = "text";
            newAnswerInput.name = `answer${questionCounter}${String.fromCharCode(96 + i)}`;
            newAnswerInput.placeholder = `Réponse`;
            newAnswerInput.required = true;

            newAnswerDiv.appendChild(newAnswerLabel);
            newAnswerDiv.appendChild(newAnswerInput);

            newAnswersContainer.appendChild(newAnswerDiv);
        }

        // Ajoute le conteneur de réponses à la nouvelle question
        newQuestionContainer.appendChild(newAnswersContainer);

        // Ajoute la nouvelle question au formulaire
        quizForm.appendChild(newQuestionContainer);
    });


});

document.addEventListener("DOMContentLoaded", function () {
    // ...

    // Gestionnaire d'événements pour le bouton "Enregistrer"
    const saveButton = document.querySelector('button[type="submit"]');
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        // Collectez les données du formulaire
        const quizName = document.querySelector('input[name="quizname"]').value;
        const questions = [];

        // Boucle à travers les questions du formulaire
        const questionContainers = document.querySelectorAll('.question-container');
        questionContainers.forEach((questionContainer, index) => {
            const question = questionContainer.querySelector('input[name^="question"]').value;

            // Recherchez l'index de la réponse correcte
            const correctAnswerIndex = Array.from(questionContainer.querySelectorAll('input[name^="correct"]')).findIndex((radioInput) => radioInput.checked);

            const answers = [];
            questionContainer.querySelectorAll('input[name^="answer"]').forEach((answerInput, answerIndex) => {
                answers.push(answerInput.value);
            });

            // Créez un objet représentant une question
            const questionObject = {
                id: index,
                question: question,
                correct: correctAnswerIndex, // Utilisez l'index de la réponse correcte
                answers: answers
            };

            questions.push(questionObject);
        });

        // Créez un objet représentant le quiz complet
        const quizObject = {
            name: quizName,
            questions: questions
        };
        const quizDataJSON = JSON.stringify(quizObject)
        console.log(quizDataJSON); // Affichez l'objet dans la console pour le moment
    });
});




buildQuiz();



