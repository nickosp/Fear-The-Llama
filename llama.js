//// answers to questions
let answerWords = [
	'spike',
	'iroh',
	'skeeter',
	'ruckus',
	'angelica',
	'bojack',
	'popeye',
	'towelie',
	'tweety',
	'daria',
	'hermes',
	'cosmo',
	'homer',
	'krusty',
	'hollyhock',
	'butters',
	'boomhauer',
];

const alphaButtons = document.querySelectorAll('button');
let lettersUsed = [];

let livesLeft = 5;

///maximum amount of guesses before llama is complete////
const maxGuess = 5;
//// set current words to our answer words////
let currentWord = setCurrentWord(answerWords);
///develop input keyboard for player////

let dashedWord = setDashedWord(currentWord);
let newDashedWord = '';

document.getElementById('dashedWord').innerHTML = dashedWord;
document.getElementById('guessesLeft').innerHTML = livesLeft;

/// intialize the start of the game///
startGame();

function startGame() {
	/// select all the buttons/////
	//// add an event listener to each button/////
	////listen for click/////
	//// console log the letter that has been clicked//

	alphaButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const letter = event.target.innerText;
			///disable button after a letter is selected/////
			lettersUsed.push(letter);
			button.disabled = true;
			checkLetters(letter, currentWord);
		});
	});
}
////  reset the game back to it's original settings////
function resetGame() {
	currentWord = setCurrentWord(answerWords);
	dashedWord = setDashedWord(currentWord);
	livesLeft = 5;
	lettersUsed = [];
	document.getElementById('dashedWord').innerHTML = dashedWord;
	document.getElementById('guessesLeft').innerHTML = livesLeft;
	document.getElementById('alreadyGuessed').innerHTML = lettersUsed;
	alphaButtons.forEach((button) => {
		button.disabled = false;
	});

	/// select all the buttons/////
	//// add an event listener to each button/////
	////listen for click/////
	//// console log the letter that has been clicked//
}

function alphaLetter(letter) {
	document.getElementById('name').innerHTML =
		document.getElementById('name').innerHTML + letter;
}
/// put the dashes under the current word/////
function setDashedWord(currentWord) {
	let dashedWord = '';
	for (let i = 0; i < currentWord.length; i++) {
		let letter = currentWord[i];
		if (letter !== ' ') {
			dashedWord += '_';
		} else {
			dashedWord += '   ';
		}
	}
	return dashedWord;
}
////// make the words ranom/////
function getRandomIndex(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

/ set the current word////
function setCurrentWord(wordList) {
	const index = getRandomIndex(wordList.length);
	const currentWord = wordList[index];
	// 
	return currentWord;
}

/// check if letter is in the word that is being used///
function checkLetters(letter, currentWord) {
	document.getElementById('alreadyGuessed').innerHTML = lettersUsed;

	let doesExist = false;
	

	for (let letterIndex = 0; letterIndex < currentWord.length; letterIndex++) {
		let currentLetter = currentWord[letterIndex];
		currentLetter = currentLetter.toLowerCase();
		letter = letter.toLowerCase();
		lastIndex = currentWord.length - 1;

		if (letter === currentLetter) {
			doesExist = true;
			/* build the new word */
			dashedWord =
				dashedWord.substring(0, letterIndex) +
				currentLetter +
				dashedWord.substring(letterIndex + 1);

			// render new word///
			
			//// message indicating that you won the game
			document.getElementById('dashedWord').innerHTML = dashedWord;
			if (dashedWord === currentWord) {
				alert(
					"LLAMA CUDDLES FOR YOU! YOU WON, SEE 2020 ISN'T SO BAD. TRYING TO GET SOME FRO-YO? NO CALORIES BRO"
				);
				resetGame();
			}
		}

		if (letter !== currentLetter && lastIndex < letterIndex) {
			doesExist = false;
		}
	}

	// / if the letter doesn't exist decrease our lives//
	//// message indicating that you lost the game////

	if (!doesExist) {
		livesLeft--;
		if (livesLeft <= 0) {
			alert('LLAMA SPITS FIRE ON YOU! I DON\'T HAVE FINGERS AND I CAN BEAT THIS GAME, BUT YOU LOST. NOT SURE HOW TO FEEL ABOUT THAT. LET ME HOLD $20 THOUGH')
			resetGame();
		}
		document.getElementById('guessesLeft').innerHTML = livesLeft;
	}
}
