console.log('CHEATERS NEVER PROSPER');

var banner = document.getElementById('banner');
var countryGame = document.getElementById('country-name-game');
var capitalGame = document.getElementById('capital-name-game');
var gameContainer = document.getElementById('game-container');
var postGameContainer = document.getElementById('post-game-container');
var guessDisplay = document.getElementById('guess-count');
var hintDisplay = document.getElementById('hint-count');
var winDisplay = document.getElementById('win-count');
var lossDisplay = document.getElementById('loss-count');
var gameStateDisplay = document.getElementById('game-state');
var hintsDisplay = document.getElementById('hint-area');
var hintRequest = document.getElementById('hint-button');
var hintList = document.getElementById('hint-list');
var gameTitle = document.getElementById('game-title');
var postGameTitle = document.getElementById('post-game-title');
var postGameWordDisplay = document.getElementById('post-game-word');
var playAgainButton = document.getElementById('play-again-button');
var flag = document.getElementById('flag');
var countryNameText = document.getElementById('country-name-text');
var capitalNameText = document.getElementById('capital-name-text');
var subregionText = document.getElementById('subregion-text');
var populationText = document.getElementById('population-text');

var guessCount = 8;
var gameType = '';
var word = '';
var wordSplit = [];
var wordLength = 0;
var country;
var countryName = '';
var gamesWon = 0;
var gamesLost = 0;
var hintCount = 0;
var currentGameState = [];
var lossTitle = "So close....."
var winTitle = "You got it!"

var alphaCodes = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM",
"BT","BO","BA","BW","BV","BR","VG","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","HK","MO","CX","CC", "CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ",
"FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN",
"HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS",
"LR","LY","LI","LT","LU","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA",
"MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH",
"PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG",
"SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT",
"TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VI","WF","EH","YE","ZM","ZW"];

var characterArray = ["a","b","c","d","e","f","g","h","i","j","k","l",
                      "m","n","o","p","q","r","s","t","u","v","w","x",
                      "y","z"];


countryGame.addEventListener("click", startCountryGame);
capitalGame.addEventListener("click", startCapitalGame);
hintRequest.addEventListener("click", getHint);
playAgainButton.addEventListener("click", playAgain);

function playAgain() {
    countrySelector(getRandomCountry());
    visibilitySwap("banner");
}

function getHint() {
    hintsDisplay.classList.remove("d-none");
    
}

function guess() {
    this.style.backgroundColor = "#A9A9A9";
    this.style.pointerEvents = "none";
    setGameBoard(this.textContent);
}

function startCountryGame() {
    word = country.name;
    gameType = 'Country';
    startGame();
}

function startCapitalGame() {
    word = country.capital;
    gameType = 'Capital';
    startGame();
}

function startGame() {
    currentGameState = [];
    visibilitySwap('game');
    setSelectors();
    guessCount = 8;
    wordSplit = word.split("");
    wordLength = wordSplit.length;
    setDashboard();
    setGameBoard();
      
}

function setDashboard() {
    guessDisplay.textContent = guessCount;
    hintDisplay.textContent = hintCount;
    winDisplay.textContent = gamesWon;
    lossDisplay.textContent = gamesLost;
}

function visibilitySwap(container) {
    if (container === "banner") {
        banner.classList.remove("d-none");
        gameContainer.classList.add("d-none");
        postGameContainer.classList.add("d-none");
    } else if (container === "game") {
        banner.classList.add("d-none");
        gameContainer.classList.remove("d-none");
        postGameContainer.classList.add("d-none");
    } else if (container === "post-game") {
        banner.classList.add("d-none");
        gameContainer.classList.add("d-none");
        postGameContainer.classList.remove("d-none");
    }
}


function setSelectors() {
    mySelectors = document.getElementById('selectors');
    while (mySelectors.firstChild) {
        mySelectors.removeChild(mySelectors.firstChild);
    }
    charList = document.createElement('ul');
    charList.id = 'charList';
    for (let i = 0; i < characterArray.length; i++) {
        char = document.createElement('li');
        char.classList.add('char');
        char.innerHTML = characterArray[i];
        char.addEventListener("click", guess);
        charList.appendChild(char);
    }
    mySelectors.appendChild(charList);
}

function setGameBoard(guess=null) {
    gameTitle.textContent = gameType;
    if (!guess) {  // && currentGameState.length === 0
        for (let i = 0; i < wordSplit.length; i++) {
            if (characterArray.includes(wordSplit[i].toLowerCase())) {
                currentGameState.push("_");
            } else {
                currentGameState.push(wordSplit[i]);
            }
        }
        gameStateDisplay.textContent = currentGameState.join('');
    } else {
        let correctGuess = false;
        for (let i = 0; i < currentGameState.length; i++) {
            if (guess === wordSplit[i].toLowerCase()) {
                currentGameState[i] = wordSplit[i];
                correctGuess = true;
            }
        }
        if (!correctGuess) {guessCount--;}
        gameStateDisplay.textContent = currentGameState.join('');
        setDashboard();
        if (guessCount > 0 && !currentGameState.includes("_")) {
            gameWon();
        } else if (guessCount == 0 && currentGameState.includes("_")) {
            gameLost();
        }
    }
}
 
function gameWon() {
    gamesWon++;
    postGameTitle.textContent = winTitle;
    gameOver(); 
}

function gameLost() {
    gamesLost++;
    postGameTitle.textContent = lossTitle;
    gameOver();
}

function gameOver() {
    flag.src = country.flag;
    countryNameText.textContent = country.name;
    capitalNameText.textContent = country.capital;
    subregionText.textContent = country.subregion;
    populationText.textContent = country.population;
    postGameWordDisplay.textContent = word;
    visibilitySwap("post-game");
}

function getRandomCountry() {
    var alphaCode = alphaCodes[Math.floor(Math.random() * alphaCodes.length)].toLowerCase();
    return alphaCode;
}

function countrySelector(alphaCode) {
    var urlString = "https://restcountries.eu/rest/v2/alpha/" + alphaCode;
    var request = new XMLHttpRequest();
    request.open('GET', urlString, true);
    request.onload = async function() {
        var res = JSON.parse(this.response);

        if (request.status === 200) {
            country = res;
            // countryName = country.name;
            var lat = parseFloat(country.latlng[0]);
            var lng = parseFloat(country.latlng[1]);
            var coords = {lat: lat, lng: lng};
            var map = new google.maps.Map(document.getElementById('map'), {
                center: coords,
                zoom: 5
            });
            var marker = new google.maps.Marker({position: coords, map: map});
        } else {
            console.log('error');
        }
    }
    request.send();

}

countrySelector(getRandomCountry())

