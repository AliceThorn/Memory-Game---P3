/* Create a list that holds all of your cards */
let allCards = document.querySelectorAll('.card');
var cardArray = [].slice.call(allCards);

let openCards = [];
let matchedCards = [];
let unmatchedCards = [];


// Moves Counter -- Increment Number Function As seen at https://stackoverflow.com/questions/15280851/javascript-increment-value-inside-html
function movesCounter() {
    var counter = document.getElementById("counter");
    var moves = counter.innerHTML;
    moves++;
    counter.innerHTML = moves;
}
/*Star Rating
function starRating() {
  if (counter.innerHTML >= 3 && counter.innerHTML < 8){
    var starone = document.getElementById('star-one');
        starone.remove();
}
if (counter.innerHTML >= 8){
    var startwo = document.getElementById('star-two');
        startwo.remove();

}else{
console.log("doing well!")
}
}
*/

let cardDeck = document.querySelectorAll('.deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.getElementById("reset").addEventListener("click", resetGame);


$( document ).ready(function() {
  resetGame();
})

function resetGame() {
  //console.log( "ready!" );
  openCards = [];
  matchedCards = [];
  unmatchedCards = [];

  cardArray = shuffle(cardArray);
  //console.log( "shuffle" );

  cardArray.forEach(function(card) {
    let li = document.createElement('li');
    li.innerHTML = card;
    card.classList.remove("open", "show", "match", "unmatch");

    // add event listener for once card clicked
    card.addEventListener("click", clickedCard);

    //start time on click of first card
    setTime();

    function clickedCard() {
      console.log("open... " + openCards);
      console.log(openCards.includes(card));
      console.log(matchedCards.includes(card));
      if(openCards.includes(card) || matchedCards.includes(card)) {
        console.log("already there");
        return;
      } else {
        //display the cards symbol once clicked
        card.classList.add("open", "show");
        //add the card to a array of "open" cards
        openCards.push(card);

        if(openCards.length === 2) {
          //starRating();
          movesCounter();
          if(openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]) {
            match();
          } else {
            unmatch();
          }
        } else {
          //console.log("already has 2 cards!");
        }
      }
    }
  })
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function match() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  openCards[0].classList.remove("open", "show");
  openCards[1].classList.remove("open", "show");

  matchedCards.push(openCards[0]);
  matchedCards.push(openCards[1]);
  //console.log("true!")
  openCards = [];
  //css animation shake here
}

function unmatch() {
  openCards[0].classList.add("unmatch");
  openCards[1].classList.add("unmatch");
  openCards[0].classList.remove("open", "show");
  openCards[1].classList.remove("open", "show");

  unmatchedCards.push(openCards[0]);
  unmatchedCards.push(openCards[1]);
  unmatchedCards.forEach(function(card) {
    console.log("clear "+ card);
    setTimeout(function() {
      console.log("clearing" + card);
      card.classList.remove("open", "show", "unmatch");
    }
    , 1000);
  });
  openCards = [];
  unmatchedCards = [];
  //css animation-shake here

/* Modal HTML by https://www.w3schools.com/howto/howto_css_modals.asp */
// Get the modal
var modal = document.getElementById('memoryModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user matched all 16 cards, open the modal

if (matchedCards === 16){ function modal () {
    modal.style.display = "block";
    console.log("modal!");
}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}}

//Timer Function As seen on https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
