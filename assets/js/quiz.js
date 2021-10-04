const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Question Array
let questions = [
    {
        question: 'What are the 3 main ingreadients of a Vodka Martini?',
        choice1: 'Vodka, lime, soda',
        choice2: 'Vodka, Vermouth, ice',
        choice3: 'Vodka, orange juice, lemonade',
        answer: 2,
    },
    {
        question: 'What is the main spirit in an Old Fashioned',
        choice1: 'Gin',
        choice2: 'Red Wine',
        choice3: 'Whiskey',
        answer: 3,
    },
    {
        question: 'What makes the cocktail Whiskey Sour a "sour" cocktail',
        choice1: 'The lime',
        choice2: 'The egg',
        choice3: 'The type of whiskey',
        answer: 2,
    },
    {
        question: 'What is a Cuba Libre? ',
        choice1: 'Rum and Coke',
        choice2: 'Gin and Coke',
        choice3: 'Gin and Orange Juice',
        answer: 1,
    },
    {
        question: 'What is the main ingredient of a Sangria?',
        choice1: 'Coke',
        choice2: 'Whte Wine',
        choice3: 'red Wine',
        answer: 3,
    },
    {
        question: 'What goes in a B52 shot?',
        choice1: 'Vodka and Baileys',
        choice2: 'Just Water and Lime',
        choice3: 'Coffe Liqueure, Double Cream, Orange Liqueure',
        answer: 3,
    }
];

const score_points = 100;
const max_questions = 6;

//Game Function
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

//Keeping Track of the score
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score);

        //Will send user to the results page once the quiz has been completed.
        return window.location.assign('/end.html');
    }

    //Question Counter
    questionCounter++;
    progressText.innerText =`Question ${questionCounter} of ${max_questions}`;

    //Calculates the current question number the user is and adds the % in the loading bar
    progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        //Determines the colour of the box if the answer is correct or incorrect
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        //Increases the total score by 100 points if correct
        if(classToApply === 'correct') {
            incrementScore(score_points);
        };
        //Increase the score if true
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    })
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();