# Black Jack

## A javascript game by Joseph Vasquez


### Made using:
HTML
CSS
Javascript
Bootstrap
#

## Shuffling the deck of cards
### Uses the Fisher-Yates algorithm from:
http://stackoverflow.com/a/2450976

## Creating the Deck
### generateDeck() is a function that adds a suit from the suitsSvg[] array, then adds a value from the cardValue[] array, which creates an object for each index of the deck[] array with key pairs, i.e.:
```
deck[
    {
        value: value,
        suit: "svg/Suits_Vectors_Spade.svg"
    }
];
