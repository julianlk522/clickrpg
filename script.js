//  game variables
let count = 0
let secondsPerRound = 5

// dom selectors
const buttonElement = document.getElementById('button')
const currentCountElement = document.getElementById('currentCount')
const mainTitleElement = document.querySelector('h1')
const subTitleElement = document.getElementById('subtitle')
const timerElement = document.getElementById('timer')
const hrElement = document.querySelector('hr')
const gameOverElement = document.getElementById('gameOver')
const replayButtonElement = document.getElementById('replay')

//  calc time in mins/secs and update html
const newTimeCalcs = (gameTime) => {
	//  minutes and seconds calcs
	let minutes = Math.floor(gameTime / 60)
	let seconds = gameTime % 60
	seconds = seconds < 10 ? '0' + seconds : seconds
	
	//  update html during game
	timerElement.innerHTML = `${minutes} : ${seconds}`
}

// parse time left and return formatted start message
const buildStartTimeMessage = () => {
	//  starting minutes and seconds calcs
	let startingMinutes = Math.floor(secondsPerRound / 60)
	let startingSeconds = secondsPerRound % 60

	const startTimeMessage = !startingMinutes
		? startingSeconds === 1
			? '1 second until time is up!'
			: `${startingSeconds} seconds until time is up!`
		: startingMinutes === 1
			? !startingSeconds
				? '1 minute until time is up!'
				: startingSeconds === 1
					? '1 minute 1 second until time is up!'
					: `1 minute ${startingSeconds} seconds until time is up!`
			: !startingSeconds
				? `${startingMinutes} minutes until time is up!`
				: `${startingMinutes} minutes ${startingSeconds} seconds until time is up!`

	timerElement.innerHTML = startTimeMessage
}

//  load starting time
window.onload = () => {
	buildStartTimeMessage()
}

//	game over
const gameOver = () => {
	gameOverElement.innerHTML = `Your score was ${count}`
	gameOverElement.style.display = 'block'
	replayButtonElement.style.display = 'block'
	buttonElement.style.display = 'none'
	timerElement.innerHTML = '0 : 00'
	mainTitleElement.innerHTML = 'Game over!'
}

//  handle timer
function handleTimer() {
	let gameTimeLeft = secondsPerRound
	newTimeCalcs(gameTimeLeft)
	subTitleElement.style.display = 'none'
	hrElement.style.display = 'none'
	mainTitleElement.innerHTML = 'Keep clicking!'
	
	const timerInterval = setInterval(() => {
		//  decrement totalSecondsLeft
		gameTimeLeft--

		//  game over if no time left
		if (gameTimeLeft <= 0) {
			gameTimeLeft = 0
			gameOver()
			return clearInterval(timerInterval)
		}
		
		newTimeCalcs(gameTimeLeft)
	}, 1000)
}

//	replay
const replay = () => {
	count = 1
	currentCountElement.innerHTML = `Clicks: ${count}`
	gameOverElement.style.display = 'none'
	buttonElement.style.display = 'block'
	replayButtonElement.style.display = 'none'
	handleTimer()
}

//  button click handler
buttonElement.addEventListener('click', () => {
	if (count === 0) {
		handleTimer()
	}

	count += 1

	currentCountElement.innerHTML = `Clicks: ${count}`
	// if ((currentCountElement.innerHTML = 'Click me to start playing!')) {
		
	// }
})

//  button hover effects
buttonElement.addEventListener('mousedown', () => {
	buttonElement.style.transform = 'scale(0.9)'
})

buttonElement.addEventListener('mouseup', () => {
	buttonElement.style.transform = 'scale(1)'
})

replayButtonElement.addEventListener('click', replay)