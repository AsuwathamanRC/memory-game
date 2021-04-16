const cards = document.querySelectorAll(".card");
const images = document.querySelectorAll(".front")
const scoreField = document.querySelector(".container h3")
    //console.log(cards);

const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var isFlipped = false;
var firstCard;
var secondCard;
var l = [];
var score = 0;

//cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
    this.classList.add("flip");
    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        l.push(this)
        firstCard.removeEventListener("click", flip); //Added here to prevent js from taking second click on image as a input
    } else {
        secondCard = this;
        l.push(this)

        if (l.length === order.length) {
            success(); // added outside timeout to update the score quickly
            setTimeout(() => {
                fullReset();
            }, 1000);
        } else {
            checkIt();
        }

    }
}

function checkIt() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        success();
    } else {
        fail();
    }
}

function success() {
    //firstCard.removeEventListener("click", flip);  //commented to prevent the same image from clicking twice
    secondCard.removeEventListener("click", flip);

    score += 1;

    scoreField.innerHTML = `Score = ${score}`;

    reset();
}

function fail() {
    console.log(l);
    firstCard.addEventListener("click", flip);

    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        l.splice(-2, 2)
        reset();
    }, 1000);

}

function reset() {
    isFlipped = false;
    firstCard = null;
    secondCard = null;
}

function fullReset() {
    l.forEach((card) => {
        card.classList.remove("flip")
    });
    l = []
    reset();
    reloadImages();
    sh();
}

function reloadImages() {
    images.forEach((image) => {
        image.src += `&v=${new Date().getTime()}`
    })
}


var sh;
(function shuffle() {

    cards.forEach((card) => card.addEventListener("click", flip));

    order.sort(() => Math.random() - 0.5);

    cards.forEach((card, i) => {
        card.style.order = order[i]
    });

    sh = shuffle;

})();