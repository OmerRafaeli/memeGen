'use strict'

let gIsMemeRatioSet = false

function onSaveMemes() {
    var savedMeme = gSavedMemes.find(meme => gCurrMeme.id === meme.id)
    if (!savedMeme) {
        var savedMeme = { id: getRandomId(), currMeme: gCurrMeme, gMeme }
        gSavedMemes.push(savedMeme)
    } else {
        savedMeme = { id: getRandomId(), currMeme: gCurrMeme, gMeme }
    }
    _saveMemesToStorage()
}

function onEditTxt(input) {
    setLineTxtForEdit(input)
    let gMemeTxt = getSelectedLine()
    let memeId = gMeme.selectionId
    const txtInput = document.querySelector('.meme-txt-input')
    gMemeTxt.txt = txtInput.value
    renderMeme(memeId)
}

function onChangeTextSize(elBtn) {
    document.querySelector('.bigger-font-btn')
    document.querySelector('.smaller-font-btn')
    let memeId = gMeme.selectionId
    if (elBtn === 'bigger') {
        changeFontSize(2)
    } else {
        changeFontSize(-2)
    }
    renderMeme(memeId)
}

function renderMeme(id) {
    getMeme(id)
    drawImg()
}


function drawImg() {
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)    
    const img = new Image()
    img.src = `img/${gMeme.selectionId}.jpg`
    if (!gIsMemeRatioSet) setCanvasSize(gElCanvas, img)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height)
        gMeme.lines.forEach(function (line, idx) {
            onSwitchLine()
            if (line.posX === 0) {
                const txtWidth = gCtx.measureText(line.txt) / 2
                const txtHeight = line.size + 10
                const txtPosX = img.width / 2
                const txtPosY = setTextHeight(idx, img.height)
                updateTextInfo(txtWidth, txtHeight, txtPosX, txtPosY)
                drawText(line.txt, txtPosX, txtPosY, line)
            } else {
                drawText(line.txt, line.posX, line.posY, line)
            }
        })
    }
}

function onCreateTxtLine() {
    createNewTextLine()
    document.querySelector('.meme-txt-input').value = 'Enter Text Here'
    renderMeme()
}

function onSetColor(elBtn, color) {
    if (elBtn.name === "txt") {
        setFontColor(color)
    } else {
        setStrokeColor(color)
    }
    renderMeme()
}

function onSwitchLine() {
    gMeme.memeLineIdx++
    if (gMeme.memeLineIdx > gMeme.lines.length - 1) gMeme.memeLineIdx = 0
    document.querySelector('.meme-txt-input').value = getSelectedLine().txt
    document.querySelector('.stroke-color-btn').value = getSelectedLine().stroke
    document.querySelector('.txt-color-btn').value = getSelectedLine().color
}

function onRemoveLine() {
    removeCurrTextLine()
    renderMeme()
}

function onChangeTxtDirection(elBtnName) {
    const centerTxt = document.querySelector('.center-txt-btn')
    const ltrTxt = document.querySelector('.ltr-btn')
    const rtlTxt = document.querySelector('.rtl-btn')

    switch (elBtnName) {
        case 'ltr':
            centerTxt.classList.remove('pressed-btn')
            ltrTxt.classList.add('pressed-btn')
            rtlTxt.classList.remove('pressed-btn')
            changeTextDirection('left')
            break
        case 'rtl':
            centerTxt.classList.remove('pressed-btn')
            ltrTxt.classList.remove('pressed-btn')
            rtlTxt.classList.add('pressed-btn')
            changeTextDirection('right')
            break
        case 'c':
            centerTxt.classList.add('pressed-btn')
            ltrTxt.classList.remove('pressed-btn')
            rtlTxt.classList.remove('pressed-btn')
            changeTextDirection('center')
            break
    }
}

function onMoveLine(dir) {
    if (dir === 'moveUp') {
        changeTextPos(-5)
    } else {
        changeTextPos(5)
    }
    renderMeme(gCurrMeme.id)
}


