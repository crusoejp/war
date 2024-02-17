// create a game of war
// create a deck of cards
// shuffle the deck
// split the deck in half
// each player draws a card
// compare the cards
// winner takes the cards
// if there is a tie, go to war
// if a player runs out of cards, the other player wins
// if both players run out of cards, it's a tie

// create an array of objects, each object is a card
// creating them programmatically, was presenting several bugs
const fullDeck = [
  { suit: "Hearts", value: 2, name: "2 of Hearts" },
  { suit: "Hearts", value: 3, name: "3 of Hearts" },
  { suit: "Hearts", value: 4, name: "4 of Hearts" },
  { suit: "Hearts", value: 5, name: "5 of Hearts" },
  { suit: "Hearts", value: 6, name: "6 of Hearts" },
  { suit: "Hearts", value: 7, name: "7 of Hearts" },
  { suit: "Hearts", value: 8, name: "8 of Hearts" },
  { suit: "Hearts", value: 9, name: "9 of Hearts" },
  { suit: "Hearts", value: 10, name: "10 of Hearts" },
  { suit: "Hearts", value: 11, name: "Jack of Hearts" },
  { suit: "Hearts", value: 12, name: "Queen of Hearts" },
  { suit: "Hearts", value: 13, name: "King of Hearts" },
  { suit: "Hearts", value: 14, name: "Ace of Hearts" },
  { suit: "Diamonds", value: 2, name: "2 of Diamonds" },
  { suit: "Diamonds", value: 3, name: "3 of Diamonds" },
  { suit: "Diamonds", value: 4, name: "4 of Diamonds" },
  { suit: "Diamonds", value: 5, name: "5 of Diamonds" },
  { suit: "Diamonds", value: 6, name: "6 of Diamonds" },
  { suit: "Diamonds", value: 7, name: "7 of Diamonds" },
  { suit: "Diamonds", value: 8, name: "8 of Diamonds" },
  { suit: "Diamonds", value: 9, name: "9 of Diamonds" },
  { suit: "Diamonds", value: 10, name: "10 of Diamonds" },
  { suit: "Diamonds", value: 11, name: "Jack of Diamonds" },
  { suit: "Diamonds", value: 12, name: "Queen of Diamonds" },
  { suit: "Diamonds", value: 13, name: "King of Diamonds" },
  { suit: "Diamonds", value: 14, name: "Ace of Diamonds" },
  { suit: "Clubs", value: 2, name: "2 of Clubs" },
  { suit: "Clubs", value: 3, name: "3 of Clubs" },
  { suit: "Clubs", value: 4, name: "4 of Clubs" },
  { suit: "Clubs", value: 5, name: "5 of Clubs" },
  { suit: "Clubs", value: 6, name: "6 of Clubs" },
  { suit: "Clubs", value: 7, name: "7 of Clubs" },
  { suit: "Clubs", value: 8, name: "8 of Clubs" },
  { suit: "Clubs", value: 9, name: "9 of Clubs" },
  { suit: "Clubs", value: 10, name: "10 of Clubs" },
  { suit: "Clubs", value: 11, name: "Jack of Clubs" },
  { suit: "Clubs", value: 12, name: "Queen of Clubs" },
  { suit: "Clubs", value: 13, name: "King of Clubs" },
  { suit: "Clubs", value: 14, name: "Ace of Clubs" },
  { suit: "Spades", value: 2, name: "2 of Spades" },
  { suit: "Spades", value: 3, name: "3 of Spades" },
  { suit: "Spades", value: 4, name: "4 of Spades" },
  { suit: "Spades", value: 5, name: "5 of Spades" },
  { suit: "Spades", value: 6, name: "6 of Spades" },
  { suit: "Spades", value: 7, name: "7 of Spades" },
  { suit: "Spades", value: 8, name: "8 of Spades" },
  { suit: "Spades", value: 9, name: "9 of Spades" },
  { suit: "Spades", value: 10, name: "10 of Spades" },
  { suit: "Spades", value: 11, name: "Jack of Spades" },
  { suit: "Spades", value: 12, name: "Queen of Spades" },
  { suit: "Spades", value: 13, name: "King of Spades" },
  { suit: "Spades", value: 14, name: "Ace of Spades" },
];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.name = `${value} of ${suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = fullDeck;
  }

  // shuffle the deck use Math.random
  shuffleDeck() {
    for (let i = 0; i < this.cards.length; i++) {
      // picks the random number between 0 and length of the deck
      let shuffle = Math.floor(Math.random() * this.cards.length);

      //swap the current with a random position
      [this.cards[i], this.cards[shuffle]] = [
        this.cards[shuffle],
        this.cards[i],
      ];
    }
  }
}

class Player {
  constructor(num) {
    this.number = num;
    this.hand = [];
  }

  // draw a card from the deck
  drawHand(deck) {
    if (this.number === 1) {
      this.hand = deck.cards.slice(0, 26);
    } else {
      this.hand = deck.cards.slice(26, 52);
    }
  }

  // play a card, by removing it from the hand
  playCard() {
    return this.hand.pop();
  }

  // add a card to the hand
  addCard(card) {
    this.hand.unshift(card);
  }

  shuffleCards() {
    for (let i = this.hand.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.hand[i], this.hand[j]] = [this.hand[j], this.hand[i]];
    }
  }
}

class Game {
  constructor() {
    this.deck = new Deck();
    this.deck.shuffleDeck();
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    this.warCards = [];
    this.shuffleCounter = 0;
  }

  // split the deck in half
  startGame() {
    this.player1.drawHand(this.deck);
    this.player2.drawHand(this.deck);
    if (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.playFullGame();
    }
  }

  playFullGame() {
    while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.play();
    }
  }

  play() {
    // both players play a card
    if (this.player1.hand.length === 0) {
      console.log("Player 2 wins!");
    } else if (this.player2.hand.length === 0) {
      console.log("Player 1 wins!");
    } else {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();
      // compare the cards
      console.log(`Player 1: ${card1.name} vs Player 2: ${card2.name}`);
      this.warCards.push(card1, card2);
      if (card1.value > card2.value) {
        console.log(
          "Player 1 wins the round. Score: ",
          this.player1.hand.length
        );
        this.player1.hand.unshift(...this.warCards);
        this.warCards = [];
      } else if (card1.value < card2.value) {
        console.log(
          "Player 2 wins the round. Score: ",
          this.player2.hand.length
        );
        this.player2.hand.unshift(...this.warCards);
        this.warCards = [];
      } else {
        // players tie, remove cards from play
        console.log("Tie!");
        this.warCards = [];
      }
      this.shuffleCounter++;
      if (this.shuffleCounter === 10) {
        this.breakTheLoop();
      }
      this.play();
    }
  }

  breakTheLoop() {
    // games occasionally end up stuck in a loop
    // where players win and lose the same cards on repeat
    // this function helps break the loop
    // by shuffling both hands every 10 (arbitrary number) rounds
    this.player1.shuffleCards();
    this.player2.shuffleCards();
    this.shuffleCounter = 0;
  }
}

const game = new Game();
game.startGame();
