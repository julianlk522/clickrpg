let count = 0;
const button = document.getElementById('button')
const currentCount = document.getElementById('currentCount')
const startTitle = document.getElementById('startTitle')
const tenTitle = document.getElementById('tenTitle')


button.addEventListener('click', () => {
    count +=1
    if (currentCount.innerHTML = "Click me to start playing!") currentCount.innerHTML = `Clicks: ${count}`

    if (count === 10) {
        startTitle.style.display = 'none';
        tenTitle.style.display = 'flex';
        currentCount.innerHTML = 'I want to know! (10)'
    }

    if (count === 11) {
        tenTitle.style.display = 'none';
        currentCount.innerHTML = `Clicks: ${count}`
    }
})

button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.9)'
})

button.addEventListener('mouseup', () => {
    button.style.transform = 'scale(1)'
})