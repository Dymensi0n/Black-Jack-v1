// DOM Elements
const dealerHand = document.querySelector('.dealer-hand');
const dealerScoreSpan = document.querySelector('.dealer-score');

const playerHand = document.querySelector('.player-hand');
const playerWin = document.querySelector('.player-final-score');
const playerScoreSpan = document.querySelector('.player-score');

const cardIcon = document.querySelectorAll('.icon');
const shuffleBtn = document.querySelector('.btn-shuffle');
const hitBtn = document.querySelector('.btn-hit');
const btnStand = document.querySelector('.btn-stand');

const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suitsSvg = ['svg/Suits_Vectors_Diamond.svg',
                    'svg/Suits_Vectors_Club.svg',
                    'svg/Suits_Vectors_Heart.svg',
                    'svg/Suits_Vectors_Spade.svg'];

const suits = ['Diamond', 'Club', 'Heart', 'Spade'];

let playerTotalValue = [];
let playerCardValue = 0;

let dealerTotalValue = [];
let dealerCardValue = 0;

const deck = [];

let playerMove = 0; // 0 = default, 1 = Hit, 2 = Stand

// Shuffle Button
shuffleBtn.addEventListener('click', function () {
    location.reload();
    let ph = document.querySelector('.player-hand');
    let dh = document.querySelector('.dealer-hand');
    playerMove = 0;
    ph.innerHTML = '';
    dh.innerHTML = '';
    startGame();

});

// Hit Button
hitBtn.addEventListener('click', function () {
    
    if (playerMove === 0) {
        let hit = document.querySelector('.player-hand');
        shuffle(deck);
        dealCard(1, playerHand);
    };
});

btnStand.addEventListener('click', function () {
    playerMove = 2;
    btnStand.classList.add('btn-active');
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
    dealCard(2, dealerHand);
    shuffle(deck);
    dealCard(2, playerHand);
    dealerScore();
    playerScore();

};

// Deal 2 cards
function dealCard (lastCard, user) {

    console.log(user);
    // If there are 2 cards left then create a new deck
    if (deck.length <= 2) {
        console.log('Generating a new deck');
        generateDeck();
    };
    // Player Cards
    
        for (let i = 0; i < lastCard; i++) {

            if (user === playerHand) {
            const divElement = document.createElement('div');
            //const html = divElement.innerHTML = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50">${deck[i].value}</div>`;
            const html = divElement.innerHTML = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            divElement.classList.add('rotate-l');
            user.appendChild(divElement);
    
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                //console.log("Found a face card! ->>>", deck[i].value);
                playerCardValue += 10;
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                //console.log("Found an ACE! ->>>", deck[i].value);
                playerCardValue += 11;
                checkAce(user, playerCardValue);
                deck.pop();
            }else {
                playerTotalValue.push(deck[i].value);
                playerCardValue += deck[i].value;
                //console.log("Toal value is: ", playerCardValue);
                deck.pop();
            };

            // Dealer Cards
        }else if (user === dealerHand) {

            const divElement = document.createElement('div');
            const html = divElement.innerHTML = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            divElement.classList.add('rotate-l');
            user.appendChild(divElement);
    
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                dealerCardValue += 10;
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                dealerCardValue += 11;
                deck.pop();
            }else {
                dealerTotalValue.push(deck[i].value);
                dealerCardValue += deck[i].value;
                deck.pop();
            };        
        };
    };

    playerScore();
};

function playerStatus () {
    if (playerMove === 0) {

    }
};

// Player score function for total value of hand
function playerScore () {

    if (playerCardValue < 21) {
        playerScoreSpan.textContent = playerCardValue;
        console.log('Player total value Less than 1: ', playerCardValue);
        playerWin.classList.add('show');
        playerWin.textContent = 'Hit?';
    
    }else if (playerCardValue >= 22) {
        //playerCardValue = 0;
        playerScoreSpan.textContent = playerCardValue;
        console.log('Player total value Greater than 21: ', playerCardValue);
        playerWin.classList.add('show');
        playerWin.textContent = 'BUST';
        playerMove = 2;

    }else if (playerCardValue === 21) {
        playerScoreSpan.textContent = playerCardValue;
        playerWin.classList.add('show');
        playerWin.textContent = 'BLACK JACK';
        playerMove = 2;
    };
};
// Player score function for total value of hand
function dealerScore () {

    if (dealerCardValue < 21) {
        dealerScoreSpan.textContent = dealerCardValue;
    
    }else if (dealerCardValue >= 22) {
        dealerCardValue = 0;
        dealerScoreSpan.textContent = dealerCardValue;

    }else if (dealerCardValue === 21) {
        dealerScoreSpan.textContent = dealerCardValue;
    };
};

// Checks if player receives Ace, and score is higher than 21 it will remove 10, making the value of Ace a 1
function checkAce (user, checkValue) {

    if (checkValue > 21) {
        checkValue -= 10;
        console.log("Current Value: ", checkValue);
    };
};

startGame();
