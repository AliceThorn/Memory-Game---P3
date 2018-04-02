/* Create a list that holds all of your cards */
let allCards = document.querySelectorAll('.card');
let cardArray = [].slice.call(allCards);
let cardDeck = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
let unmatchedCards = [];
//Timer Function
let timerStarted = false;
let moves = 0;
let secondsPlayed = 0;
let timer;

// Modal HTML by https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('memoryModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// Moves Counter -- Increment Number Function As seen at https://stackoverflow.com/questions/15280851/javascript-increment-value-inside-html
function movesCounter() {
    moves++;
    let counter = document.getElementById("counter");
    counter.innerHTML = moves;
}

function resetMovesCounter() {
    moves = 0;
    let counter = document.getElementById("counter");
    counter.innerHTML = moves;
}

//Star Rating
function starRating() {
    const starOne = document.getElementById("star-one");
    const starTwo = document.getElementById("star-two");
    const starThree = document.getElementById("star-three");

    if (counter.innerHTML > 30) {
        starOne.classList.add("fa-star-o")
        starTwo.classList.add("fa-star-o")
        starOne.classList.remove("fa-star")
        starTwo.classList.remove("fa-star")
    }
    if (counter.innerHTML > 16) {
        starOne.classList.add("fa-star-o")
        starOne.classList.remove("fa-star")
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function resetGame() {
    openCards = [];
    matchedCards = [];
    unmatchedCards = [];
    moves = 0;
    resetMovesCounter();
    stopTimer();
    secondsPlayed = 0;
    shuffleCards();
}

function shuffleCards() {
    // shuffle function


    var shuffleArray = shuffle(cardArray);
    shuffleArray = cardArray.forEach(function(card) {
        let li = document.createElement('li');
        li.innerHTML = card;
        cardDeck.appendChild(card);
        card.classList.remove("open", "show", "match", "unmatch");
    })
}

//function for what happens when cards are clicked in
function clickedCard(event) {
    card = event.target;
    if (!timerStarted) {
        startTimer();
    }
    if (openCards.includes(card) || matchedCards.includes(card)) {
        return;
    } else {
        //display the cards symbol once clicked
        card.classList.add("open", "show");
        //add the card to a array of "open" cards
        openCards.push(card);

        if (openCards.length === 2) {
            movesCounter();
            starRating();
            if (openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]) {
                match();
            } else {
                unmatch();
            }
        } else {
            //console.log("already has 2 cards!");
        }

    }
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

    if (matchedCards.length === 16) {
        gameWon();
    }
}

function unmatch() {
    openCards[0].classList.add("unmatch");
    openCards[1].classList.add("unmatch");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");

    unmatchedCards.push(openCards[0]);
    unmatchedCards.push(openCards[1]);
    unmatchedCards.forEach(function(card) {
        setTimeout(function() {
            card.classList.remove("open", "show", "unmatch");
        }, 1000);
    });
    openCards = [];
    unmatchedCards = [];
    //css animation-shake here
}


function startTimer() {
    secondsPlayed = 0;
    timerStarted = true;
    timer = setInterval(tickTimer, 1000);
    console.log("timer: " + timer);
}

function tickTimer() {
    secondsPlayed++;
    showTimer(secondsPlayed);
}

function stopTimer() {
    console.log("stop the clock!");
    timerStarted = false;
    clearInterval(timer);
    showTimer(secondsPlayed);
}

function showTimer(i) {
    let minutes = Math.floor(i / 60);
    let seconds = Math.floor(i % 60);
    let m = document.getElementById("minutes");
    let s = document.getElementById("seconds");
    m.innerHTML = checkTime(minutes);
    s.innerHTML = checkTime(seconds);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function showModal() {
    modal.style.display = "block";
}

function gameWon() {
    stopTimer();
    showModal();
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
}

document.getElementById("reset").addEventListener("click", resetGame);
$(document).ready(function() {
    cardArray.forEach(function(card) {
        // add event listener for once card clicked
        card.addEventListener("click", clickedCard);
    })
    resetGame();
})
