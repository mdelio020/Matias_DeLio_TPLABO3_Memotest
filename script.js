const images = [
    "ACMilan.jpg",
    "BayernMunich.jpg",
    "BenficaFC.jpg",
    "Chelsea.jpg",
    "InterMilan.jpg",
    "ManchesterCity.jpg",
    "Napoli.jpg",
    "RealMadridFC.jpg"
];

const cardGrid = document.getElementById("card-grid");
let cards = [];
let flippedCards = [];
let lockBoard = false;

function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(Imagenes/${image})`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);

    return card;
}

function generateCards() {
    cards = [];
    const selectedImages = getRandomImages(8);
    for (let i = 0; i < selectedImages.length; i++) {
        cards.push(createCard(selectedImages[i]));
        cards.push(createCard(selectedImages[i]));
    }
    cards = shuffle(cards);
}

function getRandomImages(numImages) {
    const shuffledImages = shuffle(images);
    return shuffledImages.slice(0, numImages);
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flipCard(event) {
    if (lockBoard) return;
    const card = event.target.parentElement;
    card.classList.add("flipped");
    card.removeEventListener("click", flipCard);
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.querySelector(".back").style.backgroundImage === card2.querySelector(".back").style.backgroundImage) {
        cardMatch(card1, card2);
    } else {
        cardMismatch(card1, card2);
    }
}

function cardMatch(card1, card2) {
    card1.style.border = "2px solid green";
    card2.style.border = "2px solid green";
    setTimeout(() => {
        card1.style.border = "";
        card2.style.border = "";
    }, 1000);
    flippedCards = [];
    lockBoard = false;
}

function cardMismatch(card1, card2) {
    card1.style.border = "2px solid red";
    card2.style.border = "2px solid red";
    setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.addEventListener("click", flipCard);
        card2.addEventListener("click", flipCard);
        card1.style.border = "";
        card2.style.border = "";
    }, 1000);
    flippedCards = [];
    lockBoard = false;
}

function revealAllImages() {
    cards.forEach((card) => {
        card.classList.add("flipped");
        card.removeEventListener("click", flipCard);
    });
}

function hideAllImages() {
    cards.forEach((card) => {
        card.classList.remove("flipped");
        card.addEventListener("click", flipCard);
    });
}

function newGame() {
    lockBoard = false;
    flippedCards = [];
    generateCards();
    renderCards();
    revealAllImages();
    setTimeout(hideAllImages, 4000);
}

function renderCards() {
    cardGrid.innerHTML = "";
    cards.forEach((card) => {
        cardGrid.appendChild(card);
    });
}

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", newGame);

newGame();
