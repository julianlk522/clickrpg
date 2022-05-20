//  game variables
let count = 0
let gameTimeSeconds = 5

// dom selectors
const buttonElement = document.getElementById('button')
const currentCountElement = document.getElementById('currentCount')
const subTitleElement = document.getElementById('subtitle')
const timerElement = document.getElementById('timer')
const hrElement = document.querySelector('hr')
const gameOverElement = document.getElementById('gameOver')

//  calc time in mins/secs and update html
const newTimeCalcs = () => {
	//  minutes and seconds calcs
	let minutes = Math.floor(gameTimeSeconds / 60)
	let seconds = gameTimeSeconds % 60
	seconds = seconds < 10 ? '0' + seconds : seconds
	
	//  update html during game
	timerElement.innerHTML = `${minutes} : ${seconds}`
}

// parse time left and return formatted start message
const buildStartTimeMessage = () => {
	//  starting minutes and seconds calcs
	let startingMinutes = Math.floor(gameTimeSeconds / 60)
	let startingSeconds = gameTimeSeconds % 60

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
	gameOverElement.innerHTML = `Game over!  Your score was ${count}!`
	gameOverElement.style.display = 'block'
}

//  handle timer
function handleTimer() {
	newTimeCalcs()
	subTitleElement.style.display = 'none'
	hrElement.style.display = 'none'
	
	const timerInterval = setInterval(() => {
		//  decrement totalSecondsLeft
		gameTimeSeconds--

		//  game over if no time left
		if (gameTimeSeconds <= 0) {
			gameTimeSeconds = 0
			timerElement.innerHTML = '0 : 00'
			console.log('Game over!')
			gameOver()
			return clearInterval(timerInterval)
		}
		
		newTimeCalcs()
	}, 1000)
}

//  button click handler
buttonElement.addEventListener('click', () => {
	if (count === 0) {
		handleTimer()
	}

	count += 1

	if ((currentCountElement.innerHTML = 'Click me to start playing!')) {
		currentCountElement.innerHTML = `Clicks: ${count}`
	}
})

//  button hover effects
buttonElement.addEventListener('mousedown', () => {
	buttonElement.style.transform = 'scale(0.9)'
})

buttonElement.addEventListener('mouseup', () => {
	buttonElement.style.transform = 'scale(1)'
})
