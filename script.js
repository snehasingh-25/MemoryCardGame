
const cards = document.querySelectorAll(".card")
let cardOne=null,cardTwo=null;
let disableDeck = false;
let matchedcards=0;
function flipCard(e){
    if (disableDeck) return;
    let clickedCard = e.currentTarget;
    if (clickedCard === cardOne) return; 
    clickedCard.classList.add("flip");
    if (!cardOne) {
        cardOne = clickedCard;
        return;
    }
    cardTwo = clickedCard;
    disableDeck=true;
    let cardOneImg=cardOne.querySelector(".back-view img").src;
    let cardTwoImg=cardTwo.querySelector(".back-view img").src;
    console.log(cardOneImg,cardTwoImg)
    matchCards(cardOneImg,cardTwoImg)
    
}
function matchCards(cardOneImg,cardTwoImg){
    if(cardOneImg===cardTwoImg){
        matchedcards++;
        if(matchedcards==8){
            setTimeout(() => showResetPage(), 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne=cardTwo=null;
        return disableDeck=false;;
    }
    else{
        setTimeout(()=>{
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        },300)
        setTimeout(()=>{
            cardOne.classList.remove("shake","flip");
            cardTwo.classList.remove("shake","flip");
            cardOne=cardTwo=null;
            disableDeck=false;
        },800)
       
    }
}
function shuffleCards() {
    matchedCards = 0;
    cardOne = cardTwo = null;
    disableDeck = false;
    let shuffledIndexes = [...cards].map((_, i) => i).sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.classList.remove("flip", "shake");
        card.style.order = shuffledIndexes[index];
        card.addEventListener("click", flipCard);
    });
}
function showResetPage() {
    document.getElementById("game-page").classList.add("hidden");
    document.getElementById("reset-page").classList.remove("hidden");
}

function resetGame() {
    document.getElementById("reset-page").classList.add("hidden");
    document.getElementById("game-page").classList.remove("hidden");
    shuffleCards();
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

shuffleCards();
cards.forEach(card=>{
    card.addEventListener("click",flipCard);
});
