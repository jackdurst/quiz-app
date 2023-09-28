async function loadQuizWithTimeout(url, timeout) {
    let timerId;
    const timeoutPromise = new Promise((_, reject) => {
        timerId = setTimeout(() => {
            clearTimeout(timerId);
            reject(new Error('Chargement du quiz expiré. Veuillez réessayer.'));
            // if it takes too long
        }, timeout);
    });

    try {
        const response = await Promise.race([fetch(url), timeoutPromise]);
        clearTimeout(timerId); // clear timer if request ok
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du quiz.');
            // if file not exist for example
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function launchApp() {

    const quizURL = './quiz/capitale.json';
    const quizTimeout = 10000 // 10 seconds delay before timeout

    try {
        const quizData = await loadQuizWithTimeout(quizURL, quizTimeout);


    // Set up click event for the "Check Answers" button
    const button = document.getElementById("sendButton");
    button.onclick = checkAnswers;

    const quizContainer = document.getElementById('quiz-container');

    // Set the quiz name at the top of the page
    const quizName = document.getElementById('quizname');
    quizName.innerHTML = `<h1>${quizData.name}</h1>`;

    // Build the quiz
    async function buildQuiz() {
        // Loop through the questions in the data
        quizData.questions.forEach((questionData, index) => {
            // Create a container for each question
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            // Create a <p> element to display the question text
            const questionElement = document.createElement('p');
            questionElement.innerHTML = `Question ${index + 1}: ${questionData.question}`;
            questionDiv.appendChild(questionElement);

            // Loop through the possible answers (0, 1, 2, 3)
            for (let optionIndex = 0; optionIndex < questionData.answers.length; optionIndex++) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${questionData.id}`;
                input.value = optionIndex; // Use the option index as the value
                label.appendChild(input);
                label.textContent = questionData.answers[optionIndex];

                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.appendChild(input);
                answerDiv.appendChild(label);

                // Allow clicking on the label or input for convenience
                label.addEventListener('click', () => {
                    input.checked = true;
                });
                questionDiv.appendChild(answerDiv);
            }
            quizContainer.appendChild(questionDiv);
        });
    }

    // Function to calculate and display the final score with color coding
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
        return `<p style="color: ${color};"> Final Score: ${score} / ${quizData.questions.length}</p>`;
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

    // Check if every question has at least 1 checked box before checking answers
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

    // Build the quiz
    await buildQuiz();
    } catch (error) {
        console.error(error.message)
    }
}

function togglePopup() {
    const popup = document.querySelector("#popup-overlay");
    popup.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    const addQuestionButton = document.getElementById("add-question");
    const quizForm = document.getElementById("quiz-form");

    let questionCounter = 1; // Counter to track question number

    addQuestionButton.addEventListener("click", function () {
        questionCounter++; // Increment the counter for each new question
        if (questionCounter > 20) {
            alert("Ton quiz ne peut pas excéder 20 questions !")
            return;
        }
        // Create a new div element for the new question
        const newQuestionContainer = document.createElement("div");
        newQuestionContainer.classList.add("question-container");

        // Create a title for the new question
        const newQuestionTitle = document.createElement("h2");
        newQuestionTitle.textContent = `Question ${questionCounter}`;
        newQuestionContainer.appendChild(newQuestionTitle);

        // Create a container for the answers of the new question
        const newAnswersContainer = document.createElement("div");
        newAnswersContainer.classList.add("answers");

        // Create a text field for the new question
        const newQuestionInput = document.createElement("input");
        newQuestionInput.type = "text";
        newQuestionInput.maxLength = 200;
        newQuestionInput.name = `question${questionCounter}`;
        newQuestionInput.placeholder = `Question ${questionCounter}`;
        newQuestionInput.required = true;
        newAnswersContainer.appendChild(newQuestionInput);

        // Create answers (labels and text fields) for the new question
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
            newAnswerInput.maxLength = 100;
            newAnswerInput.name = `answer${questionCounter}${String.fromCharCode(96 + i)}`;
            newAnswerInput.placeholder = `Answer`;
            newAnswerInput.required = true;

            newAnswerDiv.appendChild(newAnswerLabel);
            newAnswerDiv.appendChild(newAnswerInput);

            newAnswersContainer.appendChild(newAnswerDiv);
        }

        // Add the answers container to the new question
        newQuestionContainer.appendChild(newAnswersContainer);

        // Add the new question to the form
        quizForm.appendChild(newQuestionContainer);
    });
});

// Event listener to save the form and create a quizObject
// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Find the "Save" button in the form
    const saveButton = document.querySelector('button[type="submit"]');

    // Add a click event listener to the "Save" button
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form from being submitted

        // Collect form data
        const quizName = document.querySelector('input[name="quizname"]').value;
        const questions = [];

        // Get a list of all question elements in the form
        const questionContainers = document.querySelectorAll('.question-container');
        let formIsValid = true; // This variable will indicate whether the form is valid

        // Loop through the question elements
        questionContainers.forEach((questionContainer, index) => {
            const question = questionContainer.querySelector('input[name^="question"]').value;

            // Find the index of the correct answer
            const correctAnswerIndex = Array.from(questionContainer.querySelectorAll('input[name^="correct"]')).findIndex((radioInput) => radioInput.checked);

            const answers = [];
            questionContainer.querySelectorAll('input[name^="answer"]').forEach((answerInput, answerIndex) => {
                answers.push(answerInput.value);
            });

            if (quizName === "") {
                alert('Give your quiz a pretty name <3')
                formIsValid = false;
                return;
            }

            // Check if the question is empty
            if (question.trim() === "") {
                alert(`Question ${index + 1} is empty.`);
                formIsValid = false;
                return; // Exit the forEach loop if the question is empty
            }

            // Check if the correct answer is selected
            if (correctAnswerIndex === -1) {
                alert(`Select the correct answer for question ${index + 1}.`);
                formIsValid = false;
                return; // Exit the forEach loop if the correct answer is not selected
            }

            // Check if all answers are filled
            if (answers.some(answer => answer.trim() === "")) {
                alert(`Some answers are empty for question ${index + 1}.`);
                formIsValid = false;
                return; // Exit the forEach loop if some answers are empty
            }

            // Create an object representing a question
            const questionObject = {
                id: index,
                question: question,
                correct: correctAnswerIndex, // Use the index of the correct answer
                answers: answers
            };

            questions.push(questionObject);
        });

        if (formIsValid) {
            // The form is valid, you can process the data here
            const quizObject = {
                name: quizName,
                questions: questions
            };
            const quizDataJSON = JSON.stringify(quizObject);
            console.log(quizDataJSON); // Display the object in the console
        }
    });
});


// Launch the application
launchApp();
