// DOM Elements
const dealerHand = document.querySelector('.dealer-hand');
const dealerWin = document.querySelector('.dealer-option')
const dealerScoreSpan = document.querySelector('.dealer-score');

const playerHand = document.querySelector('.player-hand');
const playerWin = document.querySelector('.player-option');
const playerScoreSpan = document.querySelector('.player-score');

const cardBackStyle = document.querySelector('.card-back');
const cardIcon = document.querySelectorAll('.icon');
const shuffleBtn = document.querySelector('.btn-shuffle');
const hitBtn = document.querySelector('.btn-hit');
const btnStand = document.querySelector('.btn-stand');

const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

const cardBack = ['svg/CardBack.svg'];
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

    init();

});

// Hit Button
hitBtn.addEventListener('click', function () {
    
    console.log(playerTotalValue);
    

    if (playerMove === 0) {
        let hit = document.querySelector('.player-hand');
        shuffle(deck);
        dealCard(1, playerHand);
    };
});

// Stand Button
btnStand.addEventListener('click', function () {
    playerMove = 2;
    btnStand.classList.add('btn-active');
    compareScore();
});

// Initialize the game
function init () {

    location.reload();
    
    playerWin.innerHTML = '';
    let ph = document.querySelector('.player-hand');
    let dh = document.querySelector('.dealer-hand');
    playerMove = 0;
    ph.innerHTML = '';
    dh.innerHTML = '';
    startGame();

}

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
    console.log(playerTotalValue);
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

    
    // If there are 2 cards left then create a new deck
    if (deck.length <= 2) {
        console.log('Generating a new deck');
        generateDeck();
    };

    // Player Cards
    
        for (let i = 0; i < lastCard; i++) {

            if (user === playerHand) {

            const divElement = document.createElement('div');
            const html = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            const cardBackHtml = `<div class="${cardBackStyle}">
                                    <img class="svg-icon-back" src="${deck[i].suit = cardBack}" width="120" height="180"><p>
                                    </p>
                                    </div>`;
            
            divElement.innerHTML = cardBackHtml;
            divElement.classList.add('rotate-l');
            user.appendChild(divElement);

            coverCards(deck[i]);
            
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                playerCardValue += 10;
                playerTotalValue.push(playerCardValue);
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                playerCardValue += 11;

                if (playerCardValue > 21) {
                    playerCardValue -= 10;
                    playerTotalValue.push(playerCardValue);
                    playerScoreSpan.textContent = playerCardValue + "Ace (1)";
                    //console.log("Current Value: ", playerCardValue);
                    deck.pop();
                }else {
                    playerScoreSpan.textContent = playerCardValue + "Ace (11)";
                    playerTotalValue.push(playerCardValue);
                    //console.log("playerCardValue is: ", playerCardValue);
                    deck.pop();
                };
                
            }else {
                playerTotalValue.push(playerCardValue);
                playerCardValue += deck[i].value;
                deck.pop();
            };

            // Reveals Dealer Cards
            function coverCards (cardIndex, index, face) {
                this.cardIndex = cardIndex;

                if (playerTotalValue.length <= 1) {
                    divElement.innerHTML = cardBackHtml;
                    divElement.classList.add('rotate-l');
                    user.appendChild(divElement);
                    console.log(`Index of cards is: ${cardIndex.suit}`);    
                }else {
                    divElement.innerHTML = html;
                    divElement.classList.add('rotate-l');
                    user.appendChild(divElement);
                }

            };

            // Dealer Cards
        }else if (user === dealerHand) {

            const divElement = document.createElement('div');
            const html = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            const cardBackHtml = `<div class="${cardBackStyle}">
                                    <img class="svg-icon-back" src="${deck[i].suit = cardBack}" width="120" height="180"><p>
                                    </p>
                                    </div>`;
            
            divElement.innerHTML = cardBackHtml;
            divElement.classList.add('rotate-l');
            user.appendChild(divElement);
    
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                dealerCardValue += 10;
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                dealerCardValue += 11;

                if (dealerCardValue > 21) {
                    dealerCardValue -= 10;
                    dealerScoreSpan.textContent = dealerCardValue + "Ace (1)";
                    //console.log("Current Value: ", dealerCardValue);
                    deck.pop();
                }else {
                    dealerScoreSpan.textContent = dealerCardValue + "Ace (11)";
                    //console.log("dealerCardValue is: ", dealerCardValue);
                    deck.pop();
                };

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
        playerWin.classList.add('show');
        playerWin.textContent = 'Hit?';
    
    }else if (playerCardValue >= 22) {
        playerScoreSpan.textContent = playerCardValue;
        playerWin.classList.add('show');
        playerWin.classList.add('bust');
        playerWin.textContent = 'BUST';

        playerMove = 2;

    }else if (playerCardValue === 21) {
        playerScoreSpan.textContent = playerCardValue;
        playerWin.classList.add('show');
        playerWin.classList.add('blackjack');
        playerWin.textContent = 'BLACK JACK';
        playerMove = 2;
    };
    return playerCardValue;
};
// Player score function for total value of hand
function dealerScore () {

    if (dealerCardValue < 21) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerWin.classList.add('show');
        dealerWin.textContent = '...';
    
    }else if (dealerCardValue >= 22) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerWin.classList.add('show');
        dealerWin.classList.add('blackjack');
        dealerWin.textContent = 'BLACK JACK';

    }else if (dealerCardValue === 21) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerWin.classList.add('show');
        dealerWin.classList.add('blackjack');
        dealerWin.textContent = 'BLACK JACK';
    };
    return dealerCardValue;
};

function compareScore () {
    
    if(dealerCardValue > playerCardValue) {
        console.log("Dealer Wins!");
    }else if (playerCardValue > dealerCardValue){
        console.log("Player Wins!");
    }else {
        console.log("Draw");
    };
};


startGame();
