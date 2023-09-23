const quizData = [
    {
        id: 0,
        name: 'Culture générale !'
    }, {
        id: 1,
        question: 'Quelle est la capitale de l\'Allemagne ?',
        a: 'Madrid',
        b: 'Berlin',
        c: 'Strasbourg',
        d: 'Paris',
        e: 'Prout',
        f: 'Stéphanie de Monaco',
        correct: 'c'
    }, {
        id: 2,
        question: 'Qui a chanté Alors on danse ?',
        a: 'Sean Paul',
        b: 'Stromae',
        c: 'Johnny Halliday',
        d: 'Orelsan',
        correct: 'b'
    }, {
        id: 3,
        question: 'Qu\'est-ce qu\'un Paris-Brest ?',
        a: 'Une épreuve du tour de France',
        b: 'Une ville d\Ille-et-Vilaine',
        c: 'Une intempérie venue de Bretagne',
        d: 'Un dessert',
        correct: 'd',
        explication: 'Il s\'agit bien d\'un dessert'
    }, {
        id: 4,
        img: './images/quizzvigo.jpg',
        question: 'Qui est cette célébrité ?',
        a: 'Bruce Hanks',
        b: 'Leonardo Di Cruse',
        c: 'Vigo Mikkelsen',
        d: 'Timothée Depp',
        correct: 'd',
        explication: 'La photo était un machup entre lse visages de Mads Mikkelsen et Vigo Mortensen, la bonne réponese était donc Vigo Mikkelsen.'
    }
]

const quizContainer = document.getElementById('quiz-container');

// Place le nom du quiz en haut de page
const quizName = document.getElementById('quizname');
quizName.innerHTML = `<h1>${quizData[0].name}</h1>`

const quizQuestions = quizData.slice(1);

function buildQuiz() {
    // Boucle à travers les questions du tableau
    quizQuestions.forEach((questionData, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Créez un élément <p> pour afficher la question
        const questionElement = document.createElement('p');
        questionElement.innerHTML = `Question ${index + 1} : ${questionData.question}`;
        questionDiv.appendChild(questionElement);

        if (questionData.img != null) {
            const image = document.createElement("img");
            image.src = questionData.img;
            questionDiv.appendChild(image);
        }

        // Boucle à travers les réponses possibles (a, b, c, d)
        // Il est actuellement possible de mettre un nombre "illimité" de réponses.
        for (const option in questionData) {
            if (option !== 'id' && option !== 'question' && option !== 'correct' && option !== 'img' && option !== 'explication') {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${questionData.id}`;
                input.value = option;
                label.appendChild(input);
                label.textContent = questionData[option];

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
        }

        quizContainer.appendChild(questionDiv);
    });
}

function sendAnswers() {

}

buildQuiz();

const button = document.getElementById("sendButton")
button.onclick = sendAnswers;

