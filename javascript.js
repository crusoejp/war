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
  { value: 2, name: "2 of Hearts" },
  { value: 3, name: "3 of Hearts" },
  { value: 4, name: "4 of Hearts" },
  { value: 5, name: "5 of Hearts" },
  { value: 6, name: "6 of Hearts" },
  { value: 7, name: "7 of Hearts" },
  { value: 8, name: "8 of Hearts" },
  { value: 9, name: "9 of Hearts" },
  { value: 10, name: "10 of Hearts" },
  { value: 11, name: "Jack of Hearts" },
  { value: 12, name: "Queen of Hearts" },
  { value: 13, name: "King of Hearts" },
  { value: 14, name: "Ace of Hearts" },
  { value: 2, name: "2 of Diamonds" },
  { value: 3, name: "3 of Diamonds" },
  { value: 4, name: "4 of Diamonds" },
  { value: 5, name: "5 of Diamonds" },
  { value: 6, name: "6 of Diamonds" },
  { value: 7, name: "7 of Diamonds" },
  { value: 8, name: "8 of Diamonds" },
  { value: 9, name: "9 of Diamonds" },
  { value: 10, name: "10 of Diamonds" },
  { value: 11, name: "Jack of Diamonds" },
  { value: 12, name: "Queen of Diamonds" },
  { value: 13, name: "King of Diamonds" },
  { value: 14, name: "Ace of Diamonds" },
  { value: 2, name: "2 of Clubs" },
  { value: 3, name: "3 of Clubs" },
  { value: 4, name: "4 of Clubs" },
  { value: 5, name: "5 of Clubs" },
  { value: 6, name: "6 of Clubs" },
  { value: 7, name: "7 of Clubs" },
  { value: 8, name: "8 of Clubs" },
  { value: 9, name: "9 of Clubs" },
  { value: 10, name: "10 of Clubs" },
  { value: 11, name: "Jack of Clubs" },
  { value: 12, name: "Queen of Clubs" },
  { value: 13, name: "King of Clubs" },
  { value: 14, name: "Ace of Clubs" },
  { value: 2, name: "2 of Spades" },
  { value: 3, name: "3 of Spades" },
  { value: 4, name: "4 of Spades" },
  { value: 5, name: "5 of Spades" },
  { value: 6, name: "6 of Spades" },
  { value: 7, name: "7 of Spades" },
  { value: 8, name: "8 of Spades" },
  { value: 9, name: "9 of Spades" },
  { value: 10, name: "10 of Spades" },
  { value: 11, name: "Jack of Spades" },
  { value: 12, name: "Queen of Spades" },
  { value: 13, name: "King of Spades" },
  { value: 14, name: "Ace of Spades" },
];

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

  // shuffle the hand
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
        this.player1.hand.unshift(...this.warCards);
        this.warCards = [];
        console.log(
          "Player 1 wins the round. Score: P1:",
          this.player1.hand.length,
          "P2:",
          this.player2.hand.length
        );
      } else if (card1.value < card2.value) {
        this.player2.hand.unshift(...this.warCards);
        this.warCards = [];
        console.log(
          "Player 2 wins the round. Score: P1:",
          this.player1.hand.length,
          "P2:",
          this.player2.hand.length
        );
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
