var playerScore = 0;
document.getElementById("playerScore").innerHTML = playerScore;

var cards = [
{
  rank: "queen",
  suit: "hearts",
  cardImage: "images/queen-of-hearts.png"
},
{
  rank: "queen",
  suit: "diamonds",
  cardImage: "images/queen-of-diamonds.png"
},
{
  rank: "king",
  suit: "hearts",
  cardImage: "images/king-of-hearts.png"
},
{
  rank: "king",
  suit: "diamonds",
  cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];

var updateScore = function(difference){
  playerScore += difference;
  document.getElementById("playerScore").innerHTML = playerScore;
}

var checkForMatch = function(){
  if (cardsInPlay[0] === cardsInPlay[1]){
    updateScore(1);
    setTimeout(shuffle, 1000);
  } else {
    setTimeout(turnCardsOver, 1000);
  }
}

var flipCard = function(){
  var cardId = this.getAttribute('data-id');
  // console.log("User flipped " + cards[cardId].rank);
  cardsInPlay.push(cards[cardId].rank);
  this.setAttribute('src',cards[cardId].cardImage);
  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
}

var createBoard = function(){
  for (var i = 0; i < cards.length; i++){
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src',"images/back.png");
    cardElement.setAttribute('data-id',i);
    cardElement.addEventListener('click',flipCard);
    document.getElementById("game-board").appendChild(cardElement);
  }
}

var turnCardsOver = function(){
  cardsInPlay = [];
  var cardElements = document.getElementById("game-board").childNodes;
  for (var i = 0; i < cards.length; i++){
    cardElements[i].setAttribute('src',"images/back.png");
  }
}

var reset = function() {
  shuffle();
  updateScore((-1) * playerScore);
}

var shuffle = function() {
  // shuffle code taken from example on StackOverflow
  // Randomize the card order
  var j, x, i;
    for (i = cards.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = cards[i - 1];
        cards[i - 1] = cards[j];
        cards[j] = x;
    }
    var cardElements = document.getElementById("game-board").childNodes;
    for (var i = 0; i < cards.length; i++){
      cardElements[i].setAttribute('data-id',i);
    }
    turnCardsOver();
    // no cards actively selected
    cardsInPlay = [];
}

createBoard();
document.getElementById("reset").addEventListener('click',reset);
document.getElementById("shuffle").addEventListener('click',shuffle);
