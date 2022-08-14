'use strict'

//Random Color change for random number as well
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getRandomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('number:', number)
    
    return number
}

function getRandomId() {
    var letters = '0123456789abcdefghijklmnopqrstuvwxyz'
    let id =''
    for (var i = 0; i < 6; i++) {
       id += letters[Math.floor(Math.random() * 37)]
    }
    return id
}