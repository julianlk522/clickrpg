//  game variables
let count = 0
let secondsPerRound = 10

// dom selectors
const gameAreaElement = document.getElementById('gameArea')
const buttonElement = document.getElementById('button')
const currentCountElement = document.getElementById('currentCount')
const mainTitleElement = document.querySelector('h1')
const subTitleElement = document.getElementById('subtitle')
const timerElement = document.getElementById('timer')
const hrElement = document.querySelector('hr')
const gameOverElement = document.getElementById('gameOver')
const nameInputElement = document.getElementById('nameInput')
const formElement = document.getElementById('submissionInputForm')
const replayButtonElement = document.getElementById('replay')
const scoreAreaElement = document.getElementById('scoreArea')
const scoreElement = document.getElementById('score')
const submitScoreElement = document.getElementById('submitScore')

//  starting message on load
window.onload = () => {
	timerElement.innerHTML = buildFormattedTimeString() + ' until time is up!'
	scoreAreaElement.style.display = 'none'

	//  button event handlers
	buttonElement.addEventListener('click', () => {
		if (count === 0) {
			newGame()
		} else randomlyPlaceButton()
		count += 1
		currentCountElement.innerHTML = `Clicks: ${count}`
	})

	buttonElement.addEventListener('mousedown', () => {
		buttonElement.style.transform = 'scale(0.9)'
	})

	buttonElement.addEventListener('mouseup', () => {
		buttonElement.style.transform = 'scale(1)'
	})

	replayButtonElement.addEventListener('click', replay)

	replayButtonElement.addEventListener('mousedown', () => {
		replayButtonElement.style.transform = 'scale(0.9)'
	})

	replayButtonElement.addEventListener('mouseup', () => {
		replayButtonElement.style.transform = 'scale(1)'
	})

	//	high score submit form
	formElement.addEventListener('submit', updateScores)
}

// parse secondsPerRound and return formatted string
const buildFormattedTimeString = () => {
	let startingMinutes = Math.floor(secondsPerRound / 60)
	let startingSeconds = secondsPerRound % 60

	const timeString = !startingMinutes
		? startingSeconds === 1
			? '1 second'
			: `${startingSeconds} seconds`
		: startingMinutes === 1
		? !startingSeconds
			? '1 minute'
			: startingSeconds === 1
			? '1 minute and 1 second'
			: `1 minute and ${startingSeconds} seconds`
		: !startingSeconds
		? `${startingMinutes} minutes`
		: startingSeconds === 1
		? `${startingMinutes} minutes and 1 second`
		: `${startingMinutes} minutes and ${startingSeconds} seconds`

	return timeString
}

//  calc time in mins/secs and update html
const newTimeCalcs = (gameTime) => {
	let minutes = Math.floor(gameTime / 60)
	let seconds = gameTime % 60
	seconds = seconds < 10 ? '0' + seconds : seconds

	timerElement.innerHTML = `${minutes} : ${seconds}`
}

//	randomly place click button
const randomlyPlaceButton = () => {
	//	no-go zone (middle 33%)
	const noGoLow = 50 - 33 / 2
	const noGoHigh = 50 + 33 / 2

	//	calc a value that is between 10%-90% and not in the no-go zone
	const randomTopOrLeftFunc = () => {
		//	random position within 10%-90%
		let randomCalcedTopOrLeft = Math.floor(Math.random() * 80) + 10

		//	return results outside the no-go zone
		if (
			randomCalcedTopOrLeft < noGoLow ||
			randomCalcedTopOrLeft > noGoHigh
		) {
			return randomCalcedTopOrLeft
		} else {
			return randomTopOrLeftFunc()
		}
	}

	//	use func to generate top and left
	let randomTop = randomTopOrLeftFunc()
	let randomLeft = randomTopOrLeftFunc()

	//	change to pos: absolute and assign calced position
	if (buttonElement.style.position !== 'absolute') {
		buttonElement.style.position = 'absolute'
	}
	buttonElement.style.top = `${randomTop}%`
	buttonElement.style.left = `${randomLeft}%`
}

//	game over
const gameOver = () => {
	gameOverElement.innerHTML = `Your score was ${count}`

	//	set dom elements to game over screen
	scoreAreaElement.style.display = 'block'
	gameOverElement.style.display = 'block'
	replayButtonElement.style.display = 'block'
	buttonElement.style.display = 'none'
	timerElement.innerHTML = '0 : 00'
	mainTitleElement.innerHTML = 'Game over!'

	//	show name input field and button to submit to localstorage
	formElement.style.display = 'block'
}

//  game start
function newGame() {
	let gameTimeLeft = secondsPerRound
	newTimeCalcs(gameTimeLeft)

	//	remove unneeded dom elements and adjust title
	subTitleElement.style.display = 'none'
	hrElement.style.display = 'none'
	mainTitleElement.innerHTML = 'Keep clicking!'

	//	reset button element position to center first button
	buttonElement.style.position = 'static'

	//	timer loop
	const timerInterval = setInterval(() => {
		gameTimeLeft--

		//  game over if no time left
		if (gameTimeLeft <= 0) {
			gameOver()
			return clearInterval(timerInterval)
		}

		newTimeCalcs(gameTimeLeft)
	}, 1000)
}

//	update scores in localStorage
const updateScores = (e) => {
	e.preventDefault()
	const username = nameInputElement.value

	localStorage.setItem(`${username}`, count)
	scoreElement.innerHTML = `${username}: ${count} (${buildFormattedTimeString()})`
}

//	replay
const replay = () => {
	count = 1

	//	reset dom elements
	currentCountElement.innerHTML = `Clicks: ${count}`
	gameOverElement.style.display = 'none'
	buttonElement.style.display = 'block'
	replayButtonElement.style.display = 'none'
	formElement.style.display = 'none'
	formElement.removeEventListener('submit', updateScores)
	scoreAreaElement.style.display = 'none'

	newGame()
}
