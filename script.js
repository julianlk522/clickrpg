//  game variables
let count = 1
let totalSecondsLeft = 300

// dom selectors
const button = document.getElementById('button')
const currentCount = document.getElementById('currentCount')
const startTitle = document.getElementById('startTitle')
const secondsLeftElement = document.getElementById('secondsLeft')
const timeLeftElement = document.getElementById('timeLeft')

//  handle timer
function handleTimer() {
    setInterval(() => {
        //  game over if no time left
        if (totalSecondsLeft - 1 < 0) {
            totalSecondsLeft = 0
            console.log('Game over!')
            clearInterval(secondClock)
        }

        //  update seconds left html
        totalSecondsLeft--
        secondsLeftElement.innerHTML = totalSecondsLeft

        //  minutes and seconds calcs
        let minutes = Math.floor(totalSecondsLeft / 60)
        let seconds = (totalSecondsLeft - minutes * 60) % 60
        timeLeftElement.innerHTML = `${minutes} : ${seconds}`
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
