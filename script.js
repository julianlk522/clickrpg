//  game variables
let count = 1
let totalSecondsLeft = 60

// dom selectors
const button = document.getElementById('button')
const currentCount = document.getElementById('currentCount')
const startTitle = document.getElementById('startTitle')
const timerElement = document.getElementById('timer')

//  calc time in mins/secs and update html
const newTimeCalcs = () => {
	//  minutes and seconds calcs
	let minutes = Math.floor(totalSecondsLeft / 60)
	let seconds = totalSecondsLeft % 60
	seconds = seconds < 10 ? '0' + seconds : seconds

	//  update html during game
	timerElement.innerHTML = `${minutes} : ${seconds}`
}

// parse time left and return formatted start message
const buildStartTimeMessage = () => {
	//  starting minutes and seconds calcs
	let startingMinutes = Math.floor(totalSecondsLeft / 60)
	let startingSeconds = totalSecondsLeft % 60

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
	console.log(startingSeconds)
}

//  load starting time
window.onload = () => {
	buildStartTimeMessage()
}

//  handle timer
function handleTimer() {
	const timerInterval = setInterval(() => {
		//  game over if no time left
		if (totalSecondsLeft <= 0) {
			totalSecondsLeft = 0
			timerElement.innerHTML = '0 : 00'
			console.log('Game over!')
			return clearInterval(timerInterval)
		}

		newTimeCalcs()

		//  decrement totalSecondsLeft
		totalSecondsLeft--
	}, 1000)
}

//  button click handler
button.addEventListener('click', () => {
	if ((currentCount.innerHTML = 'Click me to start playing!')) {
		currentCount.innerHTML = `Clicks: ${count}`
	}
	if (count < 2) {
		handleTimer()
	}
	count += 1
})

//  button hover effects
button.addEventListener('mousedown', () => {
	button.style.transform = 'scale(0.9)'
})

button.addEventListener('mouseup', () => {
	button.style.transform = 'scale(1)'
})
