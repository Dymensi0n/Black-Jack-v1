// DOM Elements
const dealerHand = document.querySelector('.dealer-hand');
const playerHand = document.querySelector('.player-hand');
const playerWin = document.querySelector('.player-final-score');
const playerScoreSpan = document.querySelector('.player-score');
const cardIcon = document.querySelectorAll('.icon');
const shuffleBtn = document.querySelector('.btn-primary');
const hitBtn = document.querySelector('.btn-hit');

const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suitsSvg = ['svg/Suits_Vectors_Diamond.svg',
                    'svg/Suits_Vectors_Club.svg',
                    'svg/Suits_Vectors_Heart.svg',
                    'svg/Suits_Vectors_Spade.svg'];

const suits = ['Diamond', 'Club', 'Heart', 'Spade'];

let playerTotalValue = [];

let totalValue = 0;

const deck = [];

let playerMove = 0;

// Shuffle Button
shuffleBtn.addEventListener('click', function () {
    location.reload();
    let ul = document.querySelector('.player-hand');
    playerMove = 0;
    ul.innerHTML = '';
    startGame();

});

// Hit Button
hitBtn.addEventListener('click', function () {
    playerMove = 1;
    let hit = document.querySelector('.player-hand');
    shuffle(deck);
    dealCard(1);

});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    // Randomizes the array values that are input into the shuffle function
    return array;
};

// Add cards to the deck
const generateDeck = function () {

    suitsSvg.forEach(function (suit) {

        cardValue.forEach(function (value) {
    
            const card = {value: value, suit: suit};
            deck.push(card);
        });
    });
};



// Start the game
function startGame () {
    playerWin.classList.remove('show');
    generateDeck();
    shuffle(deck);
    dealCard(2);
    playerScore();

};

// Deal 2 cards
function dealCard (lastCard) {

    // If there are 2 cards left then create a new deck
    if (deck.length <= 2) {
        console.log('Generating a new deck');
        generateDeck();
    };

    for (let i = 0; i < lastCard; i++) {

        const divElement = document.createElement('div');
        //const html = divElement.innerHTML = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50">${deck[i].value}</div>`;
        const html = divElement.innerHTML = `<div class="card col-2"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
        divElement.classList.add('rotate-l');
        playerHand.appendChild(divElement);

        if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
            console.log("Found a face card! ->>>", deck[i].value);
            totalValue += 10;
            deck.pop();
        }else if (deck[i].value === 'Ace'){
            console.log("Found an ACE! ->>>", deck[i].value);
            totalValue += 11;
        }else {
            playerTotalValue.push(deck[i].value);
            totalValue += deck[i].value;
            console.log("Toal value is: ", totalValue);
            deck.pop();
        };        
    };

    playerScore();
};

// Player score function for total value of hand
function playerScore () {

    if (totalValue < 21) {
        playerScoreSpan.textContent = totalValue;
        console.log('Player total value Less than 1: ', totalValue);
        playerWin.classList.add('show');
        playerWin.textContent = 'Hit?';
    
    }else if (totalValue >= 22) {
        totalValue = 0;
        playerScoreSpan.textContent = totalValue;
        console.log('Player total value Greater than 21: ', totalValue);
        playerWin.classList.add('show');
        playerWin.textContent = 'BUST';

    }else if (totalValue === 21) {
        playerScoreSpan.textContent = totalValue;
        playerWin.classList.add('show');
        playerWin.textContent = 'BLACK JACK';
    };
};

startGame();
