//  game variables
let count = 0
let secondsPerRound = 20



// dom selectors
const gameAreaElement = document.getElementById('gameArea')
const buttonElement = document.getElementById('button')
const currentCountElement = document.getElementById('currentCount')
const mainTitleElement = document.querySelector('h1')
const subTitleElement = document.getElementById('subtitle')
const timerElement = document.getElementById('timer')
const hrElement = document.querySelector('hr')
const gameOverElement = document.getElementById('gameOver')
const replayButtonElement = document.getElementById('replay')



//  starting message on load
window.onload = () => {
	buildStartTimeMessage()
}



// parse secondsPerRound and return formatted start message
const buildStartTimeMessage = () => {
	//  starting minutes and seconds calcs
	let startingMinutes = Math.floor(secondsPerRound / 60)
	let startingSeconds = secondsPerRound % 60

	//	calculate starting message
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



//  calc time in mins/secs and update html
const newTimeCalcs = (gameTime) => {
	
	//  minutes and seconds calcs
	let minutes = Math.floor(gameTime / 60)
	let seconds = gameTime % 60
	seconds = seconds < 10 ? '0' + seconds : seconds
	
	//  update html during game
	timerElement.innerHTML = `${minutes} : ${seconds}`
}



//	randomly place click button
const randomlyPlaceButton = () => {
	
	//	no-go zone (middle 33%)
	const noGoLow = 50 - (33 / 2)
	const noGoHigh = 50 + (33 / 2)
	
	//	func to calc a value that is between 10%-90% and not in the no-go zone
	const randomTopOrLeftFunc = () => {
		
		//	random 10%-90%
		let randomCalcedTopOrLeft = Math.floor((Math.random() * 80)) + 10
		
		//	return results outside the no-go zone
		if (randomCalcedTopOrLeft < noGoLow || randomCalcedTopOrLeft > noGoHigh) {
			console.log(randomCalcedTopOrLeft, 'success')
			return randomCalcedTopOrLeft

		//	call the calc function again if results are within the no-go zone	
		} else {
			console.log(randomCalcedTopOrLeft, `within no go zone (${noGoLow} to ${noGoHigh})`)
			return randomTopOrLeftFunc()
		}
	}

	//	use func to generate top and left
	let randomTop = randomTopOrLeftFunc()
	let randomLeft = randomTopOrLeftFunc()
	console.log('random top:', randomTop)
	console.log('random left:', randomLeft)

	//	change to pos: absolute and assign calced position
	if (buttonElement.style.position !== 'absolute') {
		buttonElement.style.position = 'absolute'
	}
	buttonElement.style.top = `${randomTop}%`
	buttonElement.style.left = `${randomLeft}%`
}



//	game over
const gameOver = () => {

	//	display score
	gameOverElement.innerHTML = `Your score was ${count}`

	//	set dom elements to game over screen
	gameOverElement.style.display = 'block'
	replayButtonElement.style.display = 'block'
	buttonElement.style.display = 'none'
	timerElement.innerHTML = '0 : 00'
	mainTitleElement.innerHTML = 'Game over!'
}



//  game start
function newGame() {

	//	game time reference
	let gameTimeLeft = secondsPerRound
	newTimeCalcs(gameTimeLeft)

	//	remove unneeded dom elements for game and adjust title
	subTitleElement.style.display = 'none'
	hrElement.style.display = 'none'
	mainTitleElement.innerHTML = 'Keep clicking!'

	//	reset button element position to center first button
	buttonElement.style.position = 'static'
	
	//	timer loop
	const timerInterval = setInterval(() => {
		
		//  decrement totalSecondsLeft
		gameTimeLeft--

		//  game over if no time left
		if (gameTimeLeft <= 0) {
			gameOver()
			return clearInterval(timerInterval)
		}
		
		newTimeCalcs(gameTimeLeft)
	}, 1000)
}



//	replay
const replay = () => {
	
	//	reset count
	count = 1

	//	reset dom elements
	currentCountElement.innerHTML = `Clicks: ${count}`
	gameOverElement.style.display = 'none'
	buttonElement.style.display = 'block'
	replayButtonElement.style.display = 'none'

	newGame()
}



//  button click handlers
buttonElement.addEventListener('click', () => {
	if (count === 0) {
		newGame()
	} else randomlyPlaceButton()

	count += 1

	currentCountElement.innerHTML = `Clicks: ${count}`
})

replayButtonElement.addEventListener('click', replay)



//  button click resize effects
buttonElement.addEventListener('mousedown', () => {
	buttonElement.style.transform = 'scale(0.9)'
})

buttonElement.addEventListener('mouseup', () => {
	buttonElement.style.transform = 'scale(1)'
})

replayButtonElement.addEventListener('mousedown', () => {
	replayButtonElement.style.transform = 'scale(0.9)'
})

replayButtonElement.addEventListener('mouseup', () => {
	replayButtonElement.style.transform = 'scale(1)'
})