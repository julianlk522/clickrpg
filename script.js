let count = 0;
const button = document.getElementById('button')
const currentCount = document.getElementById('currentCount')

button.addEventListener('click', () => {
    count +=1
    currentCount.innerHTML = count
})