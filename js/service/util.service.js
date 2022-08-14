'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

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
    let id = ''
    for (var i = 0; i < 6; i++) {
        id += letters[Math.floor(Math.random() * 37)]
    }
    return id
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function drawRec(posX, posY, width, height) {
    gCtx.beginPath()
    gCtx.lineWidth = "4"
    gCtx.strokeStyle = "white"
    gCtx.rect(posX - 10, posY - 5, width + 20, height + 10)
    gCtx.stroke()
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]        
        pos = {

            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop

        }
    }
    return pos
}

