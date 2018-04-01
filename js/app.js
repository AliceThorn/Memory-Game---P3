/* Create a list that holds all of your cards */
let allCards = document.querySelectorAll('.card');
var cardArray = [].slice.call(document.querySelectorAll('.card'));

let openCards = [];
let matchedCards = [];
let unmatchedCards = [];

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


$( document ).ready(function() {
  //console.log( "ready!" );
cardArray = shuffle(cardArray);
  //console.log( "shuffle" );

  cardArray.forEach(function(card) {
    let li = document.createElement('li');
    li.innerHTML = card;
    card.classList.remove("open", "show", "match", "unmatch");

  // add event listerner for once card clicked
    card.addEventListener("click", clickedCard);

    function clickedCard() {
      if(openCards.includes(card)) {
        console.log("already there");
        return;
      }
        //display the cards symbol once clicked
        card.classList.add("open", "show");
        //add the card to a array of "open" cards
        openCards.push(card);

  if(openCards.length === 2) {
        if(openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]){
                  match();
                    matchedCards.push(card);
                    matchedCards.push(card);
                  //console.log("true!")
                }else {
                  unmatch();
                  unmatchedCards.push(card);
                  unmatchedCards.push(card);
                }
      } else {
          console.log("already has 2 cards!");
          unflip ();
          cardArray.push(card);
          cardArray.push(card);
        return;
          }

}
})
});

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
     openCards = []
     //css animation shake here
   }

   function unmatch() {
     openCards[0].classList.add("unmatch");
     openCards[1].classList.add("unmatch");
     openCards[0].classList.remove("open", "show");
     openCards[1].classList.remove("open", "show");
     openCards = []
     //css animation-shake here
     }

function unflip() {
     if (unmatchedCards <= 2){
       setTimeout(function myFunction() {
           unmatchedCards[0].classList.remove("unmatch");
           unmatchedCards[1].classList.remove("unmatch");
         }
     , 1500);
     unmatchedCards = [];
}
};
