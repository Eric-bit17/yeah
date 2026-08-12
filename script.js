/* =========================================
   SASHA MD DATE WEBSITE
   JAVASCRIPT
   ========================================= */


/* =========================================
   GET HTML ELEMENTS
   ========================================= */

const loadingScreen = document.getElementById("loading-screen");
const introScreen = document.getElementById("intro-screen");
const storyScreen = document.getElementById("story-screen");
const questionScreen = document.getElementById("question-screen");
const successScreen = document.getElementById("success-screen");
const poemScreen = document.getElementById("poem-screen");
const finalScreen = document.getElementById("final-screen");

const beginButton = document.getElementById("begin-button");
const storyNext = document.getElementById("story-next");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const noMessage = document.getElementById("no-message");

const poemButton = document.getElementById("poem-button");
const finalButton = document.getElementById("final-button");

const musicButton = document.getElementById("music-button");
const backgroundMusic = document.getElementById("background-music");

const poemContainer = document.getElementById("poem-container");

const heartsContainer = document.querySelector(".hearts");
const confettiContainer = document.getElementById("confetti-container");


/* =========================================
   SCREEN SWITCHING FUNCTION
   ========================================= */

function showScreen(screen) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(currentScreen) {

        currentScreen.classList.remove("active");

    });

    screen.classList.add("active");
}


/* =========================================
   LOADING SCREEN
   ========================================= */

window.addEventListener("load", function() {

    /*
       Give the loading screen a few seconds
       before showing the introduction.
    */

    setTimeout(function() {

        showScreen(introScreen);

        startIntro();

    }, 3500);

});


/* =========================================
   INTRO TYPEWRITER
   ========================================= */

const introTitle = document.getElementById("intro-title");
const introMessage = document.getElementById("intro-message");


const introTitleText = "Hey, Sasha ❤️";

const introMessageText =
    "I made something just for you...";


function typeText(element, text, speed, callback) {

    let index = 0;

    element.textContent = "";

    const interval = setInterval(function() {

        element.textContent += text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(interval);

            if (callback) {

                callback();

            }

        }

    }, speed);

}


function startIntro() {

    typeText(
        introTitle,
        introTitleText,
        100,
        function() {

            setTimeout(function() {

                typeText(
                    introMessage,
                    introMessageText,
                    55
                );

            }, 500);

        }
    );

}


/* =========================================
   BEGIN BUTTON
   ========================================= */

beginButton.addEventListener("click", function() {

    startMusic();

    showScreen(storyScreen);

    startStory();

});


/* =========================================
   STORY
   ========================================= */

const storyTitle = document.getElementById("story-title");
const storyText = document.getElementById("story-text");


const storyTitleText =
    "There's something I want you to know...";


const storyTextText =
    "You make me laugh. You make me happy. " +
    "You make me feel like I can completely be myself. " +
    "And somehow, even your imperfections are perfect to me.";


function startStory() {

    storyTitle.textContent = "";

    storyText.textContent = "";

    typeText(
        storyTitle,
        storyTitleText,
        60,
        function() {

            setTimeout(function() {

                typeText(
                    storyText,
                    storyTextText,
                    30
                );

            }, 600);

        }
    );

}


storyNext.addEventListener("click", function() {

    showScreen(questionScreen);

});


/* =========================================
   NO BUTTON
   ========================================= */

let noAttempts = 0;


/*
   Messages that appear as she keeps
   trying to press NO.
*/

const noMessages = [

    "Nice try 😂",

    "Nope... try again.",

    "You really thought I'd let you? 😭",

    "The button has other plans.",

    "You're making this difficult 😂",

    "Okay Sasha... seriously? 😭",

    "I admire the determination.",

    "The answer is getting smaller...",

    "You can't escape destiny ❤️",

    "Fine. Keep trying. 😂"

];


/* =========================================
   NO BUTTON MOVEMENT
   ========================================= */

function moveNoButton() {

    noAttempts++;

    /*
       Get the size of the screen.
    */

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    /*
       Get the button dimensions.
    */

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;


    /*
       Keep the button inside the visible
       screen.
    */

    const padding = 30;


    const maxX =
        screenWidth -
        buttonWidth -
        padding;


    const maxY =
        screenHeight -
        buttonHeight -
        padding;


    /*
       Generate a random position.
    */

    const randomX =
        Math.random() *
        Math.max(maxX, padding);


    const randomY =
        Math.random() *
        Math.max(maxY, padding);


    /*
       Move the button.
    */

    noButton.style.position = "fixed";

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";


    /*
       Give it a random rotation.
    */

    const rotation =
        Math.random() * 30 - 15;


    noButton.style.transform =
        "rotate(" + rotation + "deg)";


    /*
       Shrink the button every time.
    */

    const shrinkAmount =
        Math.max(
            0.25,
            1 - (noAttempts * 0.08)
        );


    noButton.style.transform +=
        " scale(" + shrinkAmount + ")";


    /*
       Make YES gradually bigger.
    */

    const yesScale =
        Math.min(
            1.45,
            1 + (noAttempts * 0.04)
        );


    yesButton.style.transform =
        "scale(" + yesScale + ")";


    /*
       Show funny message.
    */

    const messageIndex =
        Math.min(
            noAttempts - 1,
            noMessages.length - 1
        );


    noMessage.textContent =
        noMessages[messageIndex];


    /*
       Special message when the button
       becomes very small.
    */

    if (noAttempts >= 10) {

        noMessage.textContent =
            "Okay okay... I think we both know the answer now. ❤️";

    }

}


/* =========================================
   NO BUTTON EVENTS
   ========================================= */


/*
   Desktop:
   Move when the mouse gets close.
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
   Mobile:
   Move when she touches it.
*/

noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);


/*
   If she somehow manages to click it,
   move it anyway.
*/

noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);


/* =========================================
   YES BUTTON
   ========================================= */

yesButton.addEventListener("click", function() {

    celebrateYes();

});


/* =========================================
   YES — CINEMATIC CELEBRATION
   ========================================= */

function celebrateYes() {

    /*
       Hide the NO button.
    */

    noButton.style.display = "none";


    /*
       Make sure the question screen
       disappears smoothly.
    */

    showScreen(successScreen);


    /*
       Start the celebration.
    */

    createConfetti();

    createHeartExplosion();


    /*
       Give the music a little boost.
    */

    if (!backgroundMusic.paused) {

        backgroundMusic.volume = 0.5;

    }


    /*
       Start the cinematic sequence.
    */

    startYesReveal();

}


/* =========================================
   YES REVEAL SEQUENCE
   ========================================= */

function startYesReveal() {

    const successTitle =
        document.querySelector(
            ".success-card h1"
        );

    const successLoading =
        document.querySelector(
            ".success-loading"
        );

    const successDate =
        document.querySelector(
            ".success-date"
        );


    /*
       Hide everything initially.
    */

    successTitle.style.opacity = "0";

    successTitle.style.transform =
        "scale(0.7) translateY(20px)";


    successLoading.style.opacity = "0";

    successDate.style.opacity = "0";

    successDate.style.transform =
        "translateY(20px) scale(0.9)";


    /*
       FIRST:
       "I KNEW IT"
    */

    setTimeout(function() {

        successTitle.style.transition =
            "all 1s cubic-bezier(.2,.8,.2,1)";

        successTitle.style.opacity = "1";

        successTitle.style.transform =
            "scale(1) translateY(0)";


    }, 500);


    /*
       SECOND:
       Little message.
    */

    setTimeout(function() {

        successLoading.style.transition =
            "opacity 1s ease";

        successLoading.style.opacity = "0.7";

        successLoading.textContent =
            "I was really hoping you'd say that... ❤️";


    }, 1800);


    /*
       THIRD:
       DATE REVEAL.
    */

    setTimeout(function() {

        successDate.style.transition =
            "all 1.2s cubic-bezier(.2,.8,.2,1)";

        successDate.style.opacity = "1";

        successDate.style.transform =
            "translateY(0) scale(1)";


        /*
           Extra little heart burst.
        */

        createHeartExplosion();


    }, 3500);


    /*
       FOURTH:
       Change the button text after
       the date has appeared.
    */

    setTimeout(function() {

        const continueButton =
            document.querySelector(
                "#poem-button"
            );

        if (continueButton) {

            continueButton.textContent =
                "Read something I wrote for you ❤️";

        }

    }, 5000);

}


/* =========================================
   CONFETTI
   ========================================= */

function createConfetti() {

    confettiContainer.innerHTML = "";


    const confettiCount = 120;


    for (
        let i = 0;
        i < confettiCount;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.classList.add("confetti");


        /*
           Random horizontal position.
        */

        piece.style.left =
            Math.random() * 100 + "%";


        /*
           Random animation duration.
        */

        piece.style.animationDuration =
            (Math.random() * 3 + 2) + "s";


        /*
           Random delay.
        */

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        /*
           Random size.
        */

        piece.style.width =
            (Math.random() * 8 + 5) + "px";


        piece.style.height =
            (Math.random() * 10 + 6) + "px";


        /*
           Random color.
        */

        const colors = [

            "#ff7eb6",
            "#ffb3d1",
            "#c9a7ff",
            "#ffffff",
            "#ffd6e8"

        ];


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        confettiContainer.appendChild(piece);

    }

}


/* =========================================
   HEART EXPLOSION
   ========================================= */

function createHeartExplosion() {

    const hearts = [
        "❤️",
        "💗",
        "💖",
        "💕",
        "💓"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            "50%";


        heart.style.top =
            "50%";


        heart.style.fontSize =
            (Math.random() * 15 + 15) + "px";


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "300";


        document.body.appendChild(heart);


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            400 + 150;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [

                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 1

                },

                {

                    transform:
                        "translate(" +
                        x +
                        "px, " +
                        y +
                        "px) scale(1.3)",

                    opacity: 0

                }

            ],

            {

                duration:
                    Math.random() *
                    1200 +
                    1000,

                easing:
                    "cubic-bezier(.2,.8,.3,1)",

                fill:
                    "forwards"

            }

        );


        setTimeout(function() {

            heart.remove();

        }, 2500);

    }

}


/* =========================================
   POEM
   ========================================= */

poemButton.addEventListener("click", function() {

    showScreen(poemScreen);

    startPoem();

});


const poem = [

    "Sasha,",

    "If I had to explain what makes you special,",

    "I don't think I could choose just one thing.",

    "You make me laugh when I don't even feel like smiling.",

    "You make ordinary moments feel like memories worth keeping.",

    "And somehow, when I'm with you,",

    "I feel completely like myself.",

    "You're not perfect.",

    "Neither am I.",

    "But that's what makes this beautiful.",

    "Because your imperfections don't make you any less amazing to me.",

    "They are pieces of the person I've grown to love.",

    "So when I asked myself",

    "who I wanted beside me on September 23rd...",

    "there was never really another answer.",

    "It was you.",

    "It's always been you.",

    "And I can't wait to make one more unforgettable memory with you.",

    "My favourite thing about you",

    "is simply...",

    "you."

];


function startPoem() {

    poemContainer.innerHTML = "";


    let delay = 0;


    poem.forEach(function(line, index) {

        setTimeout(function() {

            const paragraph =
                document.createElement("p");


            paragraph.classList.add(
                "poem-line"
            );


            paragraph.textContent =
                line;


            poemContainer.appendChild(
                paragraph
            );


        }, delay);


        delay += 900;

    });


    /*
       Show signature after poem.
    */

    setTimeout(function() {

        const signature =
            document.querySelector(
                ".poem-signature"
            );


        signature.classList.add(
            "visible"
        );


    }, delay + 500);

}


/* =========================================
   FINAL SCREEN
   ========================================= */

finalButton.addEventListener("click", function() {

    showScreen(finalScreen);

    createHeartRain();

});


/* =========================================
   HEART RAIN
   ========================================= */

function createHeartRain() {

    const hearts = [
        "❤️",
        "💗",
        "💖",
        "💕"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(function() {

            createFloatingHeart(
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ]
            );

        }, i * 250);

    }

}


/* =========================================
   FLOATING HEARTS
   ========================================= */

function createFloatingHeart(symbol = "♥") {

    const heart =
        document.createElement("div");


    heart.classList.add(
        "floating-heart"
    );


    heart.textContent =
        symbol;


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.animationDuration =
        (Math.random() * 5 + 5) + "s";


    heart.style.fontSize =
        (Math.random() * 15 + 10) + "px";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(function() {

        heart.remove();

    }, 10000);

}


/*
   Constantly create small floating hearts.
*/

setInterval(function() {

    createFloatingHeart();

}, 2500);


/* =========================================
   MUSIC
   ========================================= */

let musicStarted = false;


function startMusic() {

    if (musicStarted) {

        return;

    }


    musicStarted = true;


    backgroundMusic.volume = 0.25;


    backgroundMusic.play()
        .then(function() {

            musicButton.classList.add(
                "visible"
            );

            musicButton.textContent =
                "🔊";

        })
        .catch(function() {

            /*
               Some browsers may block
               autoplay.

               The user can manually start
               the music using the button.
            */

            musicButton.classList.add(
                "visible"
            );

            musicButton.textContent =
                "🎵";

        });

}


/* =========================================
   MUSIC BUTTON
   ========================================= */

musicButton.addEventListener(
    "click",
    function() {

        if (backgroundMusic.paused) {

            backgroundMusic.play();

            musicButton.textContent =
                "🔊";

        }

        else {

            backgroundMusic.pause();

            musicButton.textContent =
                "🔇";

        }

    }
);


/* =========================================
   MOUSE SPARKLE EFFECT
   ========================================= */

document.addEventListener(
    "mousemove",
    function(event) {

        /*
           Only occasionally create
           sparkles so we don't overload
           the browser.
        */

        if (
            Math.random() > 0.18
        ) {

            return;

        }


        const sparkle =
            document.createElement("div");


        sparkle.textContent =
            "✦";


        sparkle.style.position =
            "fixed";


        sparkle.style.left =
            event.clientX + "px";


        sparkle.style.top =
            event.clientY + "px";


        sparkle.style.color =
            "rgba(255,190,220,0.7)";


        sparkle.style.fontSize =
            "8px";


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.zIndex =
            "500";


        document.body.appendChild(
            sparkle
        );


        sparkle.animate(

            [

                {
                    opacity: 0.8,

                    transform:
                        "translate(-50%, -50%) scale(1)"

                },

                {

                    opacity: 0,

                    transform:
                        "translate(-50%, -100%) scale(0)"

                }

            ],

            {

                duration: 700,

                easing: "ease-out"

            }

        );


        setTimeout(function() {

            sparkle.remove();

        }, 700);

    }
);


/* =========================================
   PREVENT ACCIDENTAL PAGE SCROLL
   ========================================= */

document.body.addEventListener(
    "touchmove",
    function(event) {

        /*
           Allow scrolling inside the poem
           card only.
        */

        const poemCard =
            document.querySelector(
                ".poem-card"
            );


        if (
            poemScreen.classList.contains(
                "active"
            ) &&
            poemCard.contains(
                event.target
            )
        ) {

            return;

        }

    },
    { passive: true }
);


/* =========================================
   CONSOLE MESSAGE
   ========================================= */

console.log(
    "❤️ Sasha-MD website loaded successfully."
);

console.log(
    "Made with love by Eric."
);